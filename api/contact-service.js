const RECIPIENT_EMAIL = "maribelsoledadalarcon@gmail.com";

export async function sendContactEmail(payload, env = process.env) {
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL;

  if (!resendApiKey) {
    return { status: 500, body: { error: "Falta configurar RESEND_API_KEY." } };
  }

  if (!fromEmail) {
    return { status: 500, body: { error: "Falta configurar CONTACT_FROM_EMAIL." } };
  }

  const { name, email, subject, message, company } = payload ?? {};

  if (company) {
    return { status: 200, body: { ok: true } };
  }

  if (!name || !email || !subject || !message) {
    return { status: 400, body: { error: "Completa todos los campos obligatorios." } };
  }

  const plainText = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Asunto: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>Nuevo mensaje desde maridev201</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    </div>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [RECIPIENT_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: plainText,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return { status: 502, body: { error: `Resend rechazó el envío: ${errorText}` } };
    }

    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error("Email send failed", error);
    return { status: 500, body: { error: "No se pudo enviar el correo en este momento." } };
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
