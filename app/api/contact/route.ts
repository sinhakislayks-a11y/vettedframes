import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── 1. Validate ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      console.error("[contact] validation failed:", result.error.issues);
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, videoLink } = result.data;

    // ── 2. Check Supabase env vars ──
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[contact] missing env vars:", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        rawUrl: supabaseUrl,
        rawKey: supabaseKey ? "[REDACTED]" : undefined,
      });
      return NextResponse.json(
        {
          error: "Database not configured. Please contact the administrator.",
          detail: "Supabase environment variables are missing or misconfigured.",
        },
        { status: 503 }
      );
    }

    // ── 3. Insert into Supabase ──
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(supabaseUrl, supabaseKey);

    const { data: insertData, error: dbError } = await sb
      .from("contact_submissions")
      .insert({
        name,
        email,
        project_type: projectType,
        message,
        video_link: videoLink || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error("[contact] Supabase insert error:", {
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint,
      });
      return NextResponse.json(
        { error: "Failed to save submission.", detail: dbError.message },
        { status: 500 }
      );
    }

    console.log("[contact] insert success:", { id: insertData?.id });

    // ── 4. WhatsApp notification via CallMeBot ──
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

    // ── 5. Email notification via Resend ──
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

    return NextResponse.json({ success: true, id: insertData?.id }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
