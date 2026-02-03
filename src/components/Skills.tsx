import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "GraphQL", category: "API" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "Figma", category: "Design" },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tecnologias" className="py-24 px-6 lg:px-8 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">02.</span>
            Tecnologías
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Herramientas y tecnologías con las que trabajo para crear soluciones 
            completas y modernas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group relative p-6 bg-card rounded-lg border border-border card-hover"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <p className="font-mono text-xs text-primary mb-2">
                  {skill.category}
                </p>
                <p className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
