import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";


const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-24 px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">01.</span>
            Sobre Mí
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-4"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Soy Maribel Alarcón, desarrolladora full stack especializada en
              crear soluciones web que combinan estrategia, diseño y ejecución
              técnica.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Desarrollo proyectos completos con React, TypeScript y Node.js,
              desde interfaces intuitivas hasta APIs robustas y bases de datos
              escalables. Me interesa especialmente construir productos
              digitales que ayuden a marcas, profesionales y negocios a tener
              presencia online más sólida y útil.
            </p>
          
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
              <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden border-2 border-primary/50">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                <img
                  src="/maribelAlarcon.jpg"
                  alt="Maribel Alarcón, desarrolladora full stack en Madrid"
                  className="w-full h-full object-cover object-[52%_18%] scale-125 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
