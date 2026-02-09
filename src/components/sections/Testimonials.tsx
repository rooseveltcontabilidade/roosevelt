import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import { Star, Quote } from "lucide-react";

import { TESTIMONIALS } from "@/content/testimonials";

const CATEGORIES = ["Todos", "Atendimento", "Agilidade", "Segurança", "Consultoria", "Tradição"];

export default function Testimonials() {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? TESTIMONIALS : TESTIMONIALS.filter(t => t.category === filter);

  return (
    <section id="avaliacoes" className="section-padding bg-muted/50">
      <div className="container-editorial">
        <FadeIn>
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-trust">
            Avaliações
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 max-w-2xl leading-tight">
            Quem confia, recomenda.
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-muted-foreground text-sm">
              <strong className="text-foreground">4.9</strong> · 64 avaliações no Google
            </span>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? "bg-trust text-trust-foreground"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {filtered.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.05}>
              <div className="bg-card rounded-2xl border border-border p-6 hover-lift h-full flex flex-col">
                <Quote size={24} className="text-trust/30 mb-4" />
                <p className="text-foreground leading-relaxed flex-1 text-sm">
                  "{t.text}"
                </p>
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
