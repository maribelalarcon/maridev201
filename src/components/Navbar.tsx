import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Sobre Mí", href: "#sobre-mi" },
  { name: "Tecnologías", href: "#tecnologias" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-lg" : ""
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#" className="font-display text-2xl font-bold text-primary">
            {"<Dev />"}
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
                >
                  <span className="text-primary">0{index + 1}. </span>
                  {item.name}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-colors"
              >
                Currículum
              </a>
            </motion.li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-card p-8 pt-24 shadow-xl">
              <ul className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg text-foreground hover:text-primary transition-colors font-mono block"
                    >
                      <span className="text-primary text-sm">0{index + 1}. </span>
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 border border-primary text-primary font-mono rounded hover:bg-primary/10 transition-colors"
                  >
                    Currículum
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
