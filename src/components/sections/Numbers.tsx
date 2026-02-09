import { getYearsOfExperience } from "@/lib/constants";
import { AnimatedCounter, FadeIn } from "@/components/ui/Animations";

const STATS = [
  { value: getYearsOfExperience(), suffix: "", label: "anos de experiência", dynamic: true },
  { value: 4, suffix: "", label: "equipes especializadas", dynamic: false },
  { value: 500, suffix: "+", label: "empresas atendidas", dynamic: false },
];

export default function Numbers() {
  return (
    <section className="bg-navy py-20 md:py-24">
      <div className="container-editorial">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 items-center">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <p className="font-display font-black text-5xl md:text-6xl text-primary-foreground">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-primary-foreground/50 text-sm font-medium mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.3}>
            <div className="text-center md:text-left">
              <p className="font-display font-black text-5xl md:text-6xl text-trust">
                100%
              </p>
              <p className="text-primary-foreground/50 text-sm font-medium mt-2 uppercase tracking-wider">
                atendimento consultivo
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
