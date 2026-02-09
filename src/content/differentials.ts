
import { 
  HeartHandshake, 
  History, 
  Smartphone, 
  ShieldCheck, 
  Lightbulb, 
  Target 
} from "lucide-react";

export interface Differential {
  id: string;
  icon: any; // Using 'any' to accommodate Lucide components easily, or strictly ComponentType
  title: string;
  description: string;
}

export const DIFFERENTIALS: Differential[] = [
  {
    id: "atendimento-humano",
    icon: HeartHandshake,
    title: "Atendimento Humano",
    description: "Nada de robôs confusos. Fale com especialistas que entendem sua dor e resolvem seu problema rápido.",
  },
  {
    id: "experiencia",
    icon: History,
    title: "61 Anos de Mercado",
    description: "Tradição e solidez de quem já viu de tudo na contabilidade e sabe exatamente como proteger sua empresa.",
  },
  {
    id: "tecnologia",
    icon: Smartphone,
    title: "Tudo na Palma da Mão",
    description: "Acesse seus documentos, guias de impostos e fale conosco através de nossa Área VIP ou WhatsApp.",
  },
  {
    id: "conformidade",
    icon: ShieldCheck,
    title: "Segurança Fiscal",
    description: "Durma tranquilo sabendo que seus impostos estão corretos e sua empresa 100% regularizada.",
  },
  {
    id: "clareza",
    icon: Lightbulb,
    title: "Sem 'Contabilitês'",
    description: "Explicamos tudo de forma simples e direta, para que você entenda para onde está indo o seu dinheiro.",
  },
  {
    id: "foco",
    icon: Target,
    title: "Foco Empresarial",
    description: "Especialistas em negócios reais. Ajudamos sua empresa a crescer com inteligência financeira.",
  },
];
