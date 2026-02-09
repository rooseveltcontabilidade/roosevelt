import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ClientAreaDropdown from "../navbar/ClientAreaDropdown";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "História", href: "#historia" },
  { label: "Sócios", href: "#socios" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="container-editorial flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-4 group">
          <img 
            src="/Logo_navbar.png" 
            alt="Roosevelt Logo" 
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12 md:h-16"}`} 
          />
          <div className={`font-display font-extrabold tracking-tight transition-all duration-500 flex flex-col ${
            scrolled ? "text-lg" : "text-xl md:text-2xl"
          } text-primary-foreground`}>
            <span className="text-trust leading-none">Roosevelt</span>
            <span className="block text-[0.6em] font-medium tracking-[0.2em] uppercase opacity-80 leading-tight">
              Contabilidade
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <ClientAreaDropdown />
          <a
            href="#contato"
            className="bg-trust text-trust-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-electric transition-colors duration-200"
          >
            Falar com um Especialista
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-primary-foreground p-2"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy border-t border-primary-foreground/10"
          >
            <nav className="container-editorial py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground text-base font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex justify-start px-0">
                <ClientAreaDropdown />
              </div>
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="bg-trust text-trust-foreground px-5 py-3 rounded-lg text-center font-semibold mt-2"
              >
                Falar com um Especialista
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
