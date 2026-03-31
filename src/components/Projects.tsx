import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "Web de Medicina Estética & Regenerativa",
    description:
      "Sitio web corporativo para clínica de medicina estética en Madrid. Incluye catálogo detallado de tratamientos (facial, corporal y capilar), blog especializado (Magazine), integración de sistema de reservas y diseño orientado a la conversión y confianza del paciente. ",
    tech: [ "TypeScript", "React.vite","Astro"],
    live: "https://www.dragiulianabissutti.com/",
    featured: true,
    image: "/web-medicina.png",
    imageClassName: "object-top",
  },
  // {
  //   title: "Dashboard Analytics",
  //   description:
  //     "Panel de control interactivo con visualización de datos en tiempo real, gráficos dinámicos y exportación de reportes.",
  //   tech: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
  //   github: "https://github.com",
  //   live: "https://example.com",
  //   featured: true,
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  // },
  {
    title: "madrid-plan-finder",
    description:
      "Aplicación para descubrir planes en Madrid con una experiencia enfocada en la exploración de actividades y ocio.",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/maribelalarcon/madrid-plan-finder",
    live: "https://madrid-plan-finder.vercel.app/",
    featured: false,
  },
  {
    title: "tripMate",
    description:
      "Aplicación web para organizar viajes y consultar información útil para planificar escapadas de forma más cómoda.",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/maribelalarcon/tripMate",
    live: "https://trip-mate-two-pink.vercel.app/",
    featured: false,
  },
  {
    title: "peephole-frontend",
    description:
      "Frontend de una aplicación con enfoque en una experiencia visual clara, navegación fluida y presentación estructurada del contenido.",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/maribelalarcon/peephole-frontend",
    live: "https://peephole-frontend.vercel.app/",
    featured: false,
  },
];

const FeaturedProject = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`relative grid lg:grid-cols-12 gap-4 items-center ${isEven ? "" : "lg:text-right"}`}
    >
      {/* Image */}
      <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="block group">
          <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
            <img
              src={project.image}
              alt={project.title}
              className={`w-full aspect-video object-cover transition-all duration-500 group-hover:scale-[1.02] ${project.imageClassName ?? ""}`}
            />
          </div>
        </a>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 ${isEven ? "lg:order-2 lg:-ml-16" : "lg:order-1 lg:-mr-16"} relative z-10`}>
        <p className="font-mono text-primary text-sm mb-2">Proyecto Destacado</p>
        <h3 className="font-display text-2xl font-bold text-foreground mb-4">
          {project.title}
        </h3>
        <div className="bg-card p-6 rounded-lg shadow-lg mb-4">
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <ul className={`flex flex-wrap gap-3 text-sm font-mono text-muted-foreground mb-4 ${isEven ? "" : "lg:justify-end"}`}>
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className={`flex gap-4 ${isEven ? "" : "lg:justify-end"}`}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const OtherProject = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card p-6 rounded-lg border border-border card-hover flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <Folder className="w-10 h-10 text-primary" />
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm flex-1 mb-4">{project.description}</p>
      <ul className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" className="py-24 px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">03.</span>
            Proyectos
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="mt-12 space-y-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-12">
            Otros Proyectos Destacados
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <OtherProject key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
