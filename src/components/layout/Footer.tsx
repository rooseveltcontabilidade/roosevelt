import { getYearsOfExperience } from "@/lib/constants";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy py-14">
      <div className="container-editorial">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Logo */}
          <div>
            <a href="#inicio" className="flex items-center gap-3 mb-0 group w-fit">
              <img 
                src="/Logo_navbar.png" 
                alt="Roosevelt Logo" 
                className="w-auto h-10 md:h-12 transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="font-display font-extrabold text-xl text-primary-foreground flex flex-col justify-center">
                <span className="text-trust leading-none">Roosevelt</span>
                <span className="block text-[0.6em] font-medium tracking-[0.2em] uppercase opacity-80 leading-tight">
                  Contabilidade
                </span>
              </div>
            </a>
            <p className="text-primary-foreground/40 text-sm mt-4 max-w-xs leading-relaxed">
              {getYearsOfExperience()} anos de experiência em contabilidade estratégica, com a responsabilidade e a modernidade que sua empresa precisa.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-primary-foreground/60 mb-4">
              Contato
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/50">
              <p>{CONTACT.phone}</p>
              <p>{CONTACT.email}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-primary-foreground/60 mb-4">
              Endereço
            </h4>
            <p className="text-sm text-primary-foreground/50">
              {CONTACT.address}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Roosevelt Contabilidade. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
