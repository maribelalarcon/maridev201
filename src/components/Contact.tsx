import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const data = responseText ? (JSON.parse(responseText) as { error?: string }) : {};

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "No se pudo enviar el mensaje.");
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 lg:px-8 bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-4">04. ¿Qué sigue?</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            ¡Hablemos!
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Actualmente estoy buscando nuevas oportunidades. Ya sea que tengas
            una pregunta, una propuesta de proyecto o simplemente quieras
            saludar, estaré encantada de conectar contigo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <span>maribelsoledadalarcon@gmail.com</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Madrid, España</span>
          </div>
        </motion.div>

        <motion.form
          id="contacto-formulario"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl border border-border bg-card p-6 text-left shadow-lg"
        >
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-sm text-foreground">Nombre</span>
              <input
                type="text"
                name="name"
                required
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Tu nombre"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-sm text-foreground">Email</span>
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="tu@email.com"
              />
            </label>
          </div>

          <label className="mt-6 flex flex-col gap-2">
            <span className="font-mono text-sm text-foreground">Asunto</span>
            <input
              type="text"
              name="subject"
              required
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
              placeholder="Asunto del mensaje"
            />
          </label>

          <label className="mt-6 flex flex-col gap-2">
            <span className="font-mono text-sm text-foreground">Mensaje</span>
            <textarea
              name="message"
              required
              rows={6}
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
              placeholder="Cuéntame sobre tu proyecto o tu propuesta"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="w-5 h-5" />
            {status === "sending" ? "Enviando..." : "Enviar formulario"}
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            Los mensajes se enviarán a <span className="text-foreground">maribelsoledadalarcon@gmail.com</span>.
          </p>

          {status === "success" && (
            <p className="mt-3 text-sm text-green-600">
              Mensaje enviado correctamente.
            </p>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">
              {errorMessage}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
