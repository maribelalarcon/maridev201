export async function sendContactEmail(payload, env = process.env) {
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL;
  const toEmail = env.CONTACT_TO_EMAIL;

  if (!resendApiKey) {
    return { status: 500, body: { error: "Falta configurar RESEND_API_KEY." } };
  }

  if (!fromEmail) {
    return { status: 500, body: { error: "Falta configurar CONTACT_FROM_EMAIL." } };
  }

  if (!toEmail) {
    return { status: 500, body: { error: "Falta configurar CONTACT_TO_EMAIL." } };
  }

  const { name, email, subject, message, company } = payload ?? {};
  const cleanName = String(name ?? "").trim();
  const cleanEmail = String(email ?? "").trim().toLowerCase();
  const cleanSubject = String(subject ?? "").trim();
  const cleanMessage = String(message ?? "").trim();

  if (company) {
    return { status: 200, body: { ok: true } };
  }

  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
    return { status: 400, body: { error: "Completa todos los campos obligatorios." } };
  }

  if (!isValidEmail(cleanEmail)) {
    return { status: 400, body: { error: "Introduce un email válido." } };
  }

  const plainText = [
    `Nombre: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Asunto: ${cleanSubject}`,
    "",
    cleanMessage,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>Nuevo mensaje desde maridev201</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(cleanSubject)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br />")}</p>
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
        to: [toEmail],
        reply_to: `${formatDisplayName(cleanName)} <${cleanEmail}>`,
        subject: `[Portfolio] ${cleanSubject}`,
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatDisplayName(value) {
  return String(value).replace(/[<>"]/g, "").trim() || "Contacto web";
}
