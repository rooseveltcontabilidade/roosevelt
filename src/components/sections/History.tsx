import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import { getYearsOfExperience } from "@/lib/constants";
import { Zap, Building, Monitor, FileText, Users, TrendingUp } from "lucide-react";

const MILESTONES = [
  {
    year: "Fundação",
    title: "O início de uma tradição",
    description: "Roosevelt Contabilidade nasce com a missão de oferecer serviços contábeis de excelência para empresas em crescimento. Desde o primeiro dia, o compromisso com a ética e a precisão definiram nossa identidade.",
    icon: Building,
  },
  {
    year: "Expansão",
    title: "Crescimento com responsabilidade",
    description: "A carteira de clientes se expande significativamente, atendendo empresas de diferentes setores. Novas equipes especializadas são formadas para garantir atendimento consultivo de alto nível.",
    icon: Users,
  },
  {
    year: "Especialização",
    title: "Áreas de excelência",
    description: "Criação de departamentos especializados em Fiscal, Pessoal, Contábil e Societário — cada um liderado por profissionais com décadas de experiência prática.",
    icon: FileText,
  },
  {
    year: "Modernização",
    title: "Tecnologia sem perder a essência",
    description: "Adoção de plataformas digitais, automação de processos e implementação de sistemas integrados — mantendo o atendimento pessoal e a proximidade com cada cliente.",
    icon: Monitor,
  },
  {
    year: "Hoje",
    title: "Tradição e inovação em equilíbrio",
    description: `Com ${getYearsOfExperience()} anos de experiência, a Roosevelt opera com processos modernos, equipes especializadas e a mesma responsabilidade que sempre nos guiou. Cada decisão é tomada com a solidez de quem já viveu todos os cenários.`,
    icon: TrendingUp,
  },
];

export default function History() {
  const [active, setActive] = useState(0);

  return (
    <section id="historia" className="section-padding bg-background">
      <div className="container-editorial">
        <FadeIn>
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-trust">
            Nossa trajetória
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 max-w-3xl leading-tight">
            Uma história construída com responsabilidade — e atualizada com tecnologia.
          </h2>
        </FadeIn>

        <div className="mt-14 md:mt-20">
          {/* Timeline nav */}
          <FadeIn delay={0.1}>
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-6 scrollbar-hide">
              {MILESTONES.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    active === i
                      ? "bg-trust text-trust-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.2}>
            <div className="relative bg-card rounded-2xl border border-border p-8 md:p-12 mt-4 min-h-[240px]">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-xl bg-trust/10 text-trust flex-shrink-0">
                  {(() => {
                    const Icon = MILESTONES[active].icon;
                    return <Icon size={28} />;
                  })()}
                </div>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                    {MILESTONES[active].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl text-base md:text-lg">
                    {MILESTONES[active].description}
                  </p>
                  {active === MILESTONES.length - 1 && (
                    <div className="flex items-center gap-2 pt-2">
                      <Zap size={16} className="text-trust" />
                      <span className="text-sm font-semibold text-trust">
                        Processos digitais · Plataformas integradas · Rotinas automatizadas
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex gap-1.5 mt-8">
                {MILESTONES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "bg-trust w-10" : "bg-border w-6"
                    }`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
