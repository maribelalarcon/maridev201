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
              ¡Hola! Soy una desarrolladora full stack apasionada por crear 
              soluciones digitales que marquen la diferencia. Mi viaje en el 
              desarrollo web comenzó hace varios años, y desde entonces no he 
              dejado de aprender y crecer.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Me especializo en construir aplicaciones web completas, desde el 
              diseño de interfaces intuitivas hasta la implementación de APIs 
              robustas y bases de datos escalables. Disfruto especialmente 
              trabajando en proyectos que combinan creatividad con soluciones 
              técnicas elegantes.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Actualmente estoy enfocada en proyectos que utilizan las últimas 
              tecnologías del ecosistema JavaScript/TypeScript, siempre buscando 
              las mejores prácticas y patrones de diseño.
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
                  src="/images/yo.png"
                  alt="Foto de perfil"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
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
