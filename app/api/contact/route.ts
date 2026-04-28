import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── 1. Validate ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, videoLink } = result.data;

    // ── 2. Insert into Supabase ──
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase env vars not configured");
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await sb
      .from("contact_submissions")
      .insert({
        name,
        email,
        project_type: projectType,
        message,
        video_link: videoLink || null,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission. Please try again." },
        { status: 500 }
      );
    }

    // ── 3. WhatsApp notification via CallMeBot ──
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
        console.error("CallMeBot webhook error:", webhookErr);
      }
    }

    // ── 4. Email notification via Resend ──
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
        // Non-blocking: log and continue
        console.error("Resend email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
