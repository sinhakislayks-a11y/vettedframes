import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  // ── 0. Start marker ──
  console.log("[contact] === REQUEST START ===");
  console.log("[contact] env.NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[contact] env.NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "[SET]" : "[UNDEFINED]");

  try {
    const body = await request.json();
    console.log("[contact] body received:", JSON.stringify(body));

    // ── 1. Validate ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      console.error("[contact] validation FAILED:", JSON.stringify(result.error.issues));
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }
    console.log("[contact] validation PASSED");

    const { name, email, projectType, message, videoLink } = result.data;

    // ── 2. Check Supabase env vars ──
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("[contact] checking env vars:", {
      url: supabaseUrl || "[MISSING]",
      key: supabaseKey ? "[SET]" : "[MISSING]",
    });

    if (!supabaseUrl || !supabaseKey) {
      console.error("[contact] STOPPED — missing env vars");
      return NextResponse.json(
        {
          error: "MISSING_ENV_VARS",
          message: "Supabase environment variables are not configured on the server.",
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
          serverEnvUrl: supabaseUrl,
        },
        { status: 503 }
      );
    }

    // ── 3. Create Supabase client ──
    console.log("[contact] creating Supabase client with URL:", supabaseUrl);
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(supabaseUrl, supabaseKey);
    console.log("[contact] Supabase client created");

    // ── 4. Build insert payload ──
    const payload = {
      name,
      email,
      project_type: projectType,
      message,
      video_link: videoLink || null,
      created_at: new Date().toISOString(),
    };
    console.log("[contact] insert payload:", JSON.stringify(payload));

    // ── 5. Insert into Supabase ──
    console.log("[contact] attempting insert into contact_submissions...");
    const { data: insertData, error: dbError } = await sb
      .from("contact_submissions")
      .insert(payload)
      .select()
      .single();

    console.log("[contact] insert result — data:", JSON.stringify(insertData));
    console.log("[contact] insert result — error:", JSON.stringify(dbError));

    if (dbError) {
      console.error("[contact] SUPABASE ERROR:", dbError.message, "| code:", dbError.code, "| details:", dbError.details);
      return NextResponse.json(
        { error: "SUPABASE_INSERT_FAILED", message: dbError.message, code: dbError.code, details: dbError.details, hint: dbError.hint },
        { status: 500 }
      );
    }

    console.log("[contact] insert SUCCESS, id:", insertData?.id);

    // ── 6. WhatsApp notification via CallMeBot ──
    const callmebotKey = process.env.CALLMEBOT_API_KEY;
    const whatsappPhone = process.env.WHATSAPP_PHONE;
    if (callmebotKey && whatsappPhone) {
      const whatsappMessage = encodeURIComponent(
        `New inquiry from ${name} — ${projectType} — ${email}`
      );
      try {
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${whatsappMessage}&apikey=${callmebotKey}`,
          { method: "GET" }
        );
      } catch (webhookErr) {
        console.error("[contact] CallMeBot error:", webhookErr);
      }
    }

    // ── 7. Email notification via Resend ──
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "sinhakislayks@gmail.com",
          subject: `New inquiry — ${projectType} — ${name}`,
          text: [
            `New contact form submission`,
            ``,
            `Name: ${name}`,
            `Email: ${email}`,
            `Project Type: ${projectType}`,
            `Message: ${message}`,
            `Video Link: ${videoLink || "Not provided"}`,
            ``,
            `Submitted at: ${new Date().toISOString()}`,
          ].join("\n"),
        });
      } catch (emailErr) {
        console.error("[contact] Resend email error:", emailErr);
      }
    }

    console.log("[contact] === REQUEST COMPLETE ===");
    return NextResponse.json({ success: true, id: insertData?.id }, { status: 200 });

  } catch (err) {
    console.error("[contact] UNEXPECTED ERROR:", err);
    return NextResponse.json(
      { error: "UNEXPECTED_ERROR", message: String(err) },
      { status: 500 }
    );
  }
}
