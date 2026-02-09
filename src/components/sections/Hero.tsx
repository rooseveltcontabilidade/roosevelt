import { getYearsOfExperience } from "@/lib/constants";
import { AnimatedCounter, FadeIn } from "@/components/ui/Animations";
import { ArrowRight, Users, Award } from "lucide-react";


export default function Hero() {
  const years = getYearsOfExperience();

  return (
    <section id="inicio" className="relative min-h-screen bg-navy overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/Imagem_hero.png"
          alt="Escritório Roosevelt Contabilidade"
          className="w-full h-full object-cover opacity-15"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-light/90" />
      </div>

      <div className="relative container-editorial pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Monolith 61 + Copy */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn>
              <div className="flex items-end gap-6 md:gap-8">
                {/* Monólito */}
                <div className="flex-shrink-0">
                  <span className="font-display font-black text-[7rem] md:text-[10rem] lg:text-[12rem] leading-none text-trust/20">
                    <AnimatedCounter end={years} />
                  </span>
                </div>
                <div className="pb-4 md:pb-6">
                  <span className="text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-trust">
                    anos de experiência
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem] leading-[1.1] text-primary-foreground max-w-2xl">
                Contabilidade estratégica com solidez que atravessa gerações.
              </h1>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-base md:text-lg text-primary-foreground/60 max-w-xl leading-relaxed">
                Equipes especializadas, visão consultiva e processos modernos — para empresas que precisam de confiança e clareza.
              </p>
            </FadeIn>

            {/* Badges */}
            <FadeIn delay={0.35}>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Award, text: `${years} anos de experiência` },
                  { icon: Users, text: "Atendimento consultivo" },
                  { icon: Award, text: "Especialistas por área" },
                ].map((badge) => (
                  <span
                    key={badge.text}
                    className="flex items-center gap-2 bg-primary-foreground/5 border border-primary-foreground/10 rounded-full px-4 py-2 text-sm text-primary-foreground/70"
                  >
                    <badge.icon size={14} className="text-trust" />
                    {badge.text}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.45}>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 bg-trust text-trust-foreground px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-electric transition-colors duration-200 group"
                >
                  Solicitar consultoria
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#socios"
                  className="inline-flex items-center gap-2 border border-primary-foreground/20 text-primary-foreground/80 px-7 py-3.5 rounded-lg font-medium text-base hover:bg-primary-foreground/5 transition-colors duration-200"
                >
                  Conhecer as equipes
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: Image panel */}
          <FadeIn delay={0.3} direction="right" className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-primary-foreground/10">
                <img
                  src="/Imagem_hero.png"
                  alt="Ambiente profissional Roosevelt"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-5 shadow-2xl border border-border">
                <p className="text-3xl font-display font-extrabold text-navy">
                  <AnimatedCounter end={years} />+
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  anos de experiência
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave/gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
