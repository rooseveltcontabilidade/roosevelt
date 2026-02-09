
import { Check } from "lucide-react";
import { PLANS } from "@/content/plans";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function PlansSection() {
  return (
    <section id="planos" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.03] -z-10" />
      
      <div className="container-editorial">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha a opção ideal para o momento da sua empresa. Transparência total, sem surpresas no final do mês.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`flex flex-col h-full transition-all duration-300 hover:shadow-xl relative ${
                plan.highlight 
                  ? "border-trust shadow-lg scale-105 z-10" 
                  : "border-border/50 hover:border-trust/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-trust text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Mais Escolhido
                </div>
              )}

              <CardHeader className="p-6 md:p-8 space-y-2">
                <h3 className="text-2xl font-bold text-navy">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-navy">
                    {plan.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="p-6 md:p-8 pt-0 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 p-0.5 bg-trust/10 rounded-full shrink-0">
                        <Check size={14} className="text-trust" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 md:p-8 pt-0">
                <Button 
                  asChild 
                  className={`w-full h-12 text-base font-semibold transition-all ${
                    plan.highlight 
                      ? "bg-trust hover:bg-electric text-white shadow-lg shadow-trust/20" 
                      : "bg-navy hover:bg-navy/90 text-white"
                  }`}
                >
                  <a 
                    href={plan.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {plan.cta}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Dúvidas sobre qual plano escolher?{" "}
            <a 
              href="https://wa.me/555132646306" 
              className="text-trust font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com um consultor gratuito.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
