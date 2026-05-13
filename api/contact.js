import { sendContactEmail } from "./contact-service.js";

function json(res, statusCode, body) {
  res.status(statusCode).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed." });
  }

  const result = await sendContactEmail(req.body, process.env);
  return json(res, result.status, result.body);
}
