import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import { CONTACT } from "@/lib/constants";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", empresa: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá, sou ${form.nome}${form.empresa ? ` da empresa ${form.empresa}` : ""}.\n\nE-mail: ${form.email}\nTelefone: ${form.telefone}\n\n${form.mensagem}`
    );
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <section id="contato" className="section-padding bg-background">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <FadeIn>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-trust">
              Contato
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mt-3 leading-tight">
              Vamos conversar sobre o futuro da sua empresa.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Preencha o formulário e envie diretamente pelo WhatsApp. Nossa equipe responde em até 24 horas úteis.
            </p>

            <div className="mt-8 space-y-3">
              <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-trust mb-4">
                O que acontece depois
              </h4>
              {[
                "Recebemos sua mensagem via WhatsApp",
                "Um especialista analisa sua demanda",
                "Agendamos uma conversa consultiva sem compromisso",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-trust flex-shrink-0" />
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              {[
                { icon: Phone, text: CONTACT.phone },
                { icon: Mail, text: CONTACT.email },
                { icon: MapPin, text: CONTACT.address },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-foreground">
                  <item.icon size={18} className="text-trust" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-5">
              {[
                { name: "nome" as const, label: "Nome *", type: "text", required: true },
                { name: "email" as const, label: "E-mail *", type: "email", required: true },
                { name: "telefone" as const, label: "Telefone *", type: "tel", required: true },
                { name: "empresa" as const, label: "Empresa (opcional)", type: "text", required: false },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-trust/50 focus:border-trust transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-trust/50 focus:border-trust transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-trust text-trust-foreground py-3.5 rounded-lg font-semibold text-base hover:bg-electric transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
