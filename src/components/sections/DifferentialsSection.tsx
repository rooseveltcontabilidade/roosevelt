
import { DIFFERENTIALS } from "@/content/differentials";
import { Card, CardContent } from "@/components/ui/card";

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-20 bg-slate-50">
      <div className="container-editorial">
        <div className="text-center mb-16 space-y-4">
          <span className="text-trust font-bold tracking-wider uppercase text-sm">
            Por que a Roosevelt?
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy max-w-3xl mx-auto">
            Mais que contabilidade, parceriapara o seu sucesso
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DIFFERENTIALS.map((item) => (
            <Card 
              key={item.id} 
              className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <CardContent className="p-8 flex flex-col items-start gap-4 h-full">
                <div className="p-3 rounded-2xl bg-navy/5 text-trust mb-2">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-navy">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
