import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            saludar, ¡estaré encantada de conectar contigo!
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
            <span>correo@ejemplo.com</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Tu Ciudad, País</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="mailto:correo@ejemplo.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors text-lg"
          >
            <Send className="w-5 h-5" />
            Enviar Mensaje
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
