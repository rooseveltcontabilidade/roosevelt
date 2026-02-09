
export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  link: string;
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 199/mês",
    description: "Ideal para MEIs e pequenas empresas prestadoras de serviços.",
    features: [
      "Abertura de empresa gratuita",
      "Contabilidade completa",
      "Impostos via WhatsApp",
      "Atendimento por e-mail e chat",
      "Emissão de notas fiscais (até 10/mês)",
    ],
    cta: "Assinar Agora",
    link: "https://wa.me/555132646306?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20plano%20Essencial.",
    highlight: false,
  },
  {
    id: "profissional",
    name: "Profissional",
    price: "R$ 349/mês",
    description: "Perfeito para empresas em crescimento com funcionários.",
    features: [
      "Tudo do plano Essencial",
      "Folha de pagamento (até 5 func.)",
      "Planejamento tributário básico",
      "Atendimento prioritário WhatsApp",
      "Emissão ilimitada de notas",
      "Certificado Digital (desconto)",
    ],
    cta: "Contratar Profissional",
    link: "https://wa.me/555132646306?text=Olá!%20Tenho%20interesse%20no%20plano%20Profissional.",
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 599/mês",
    description: "Para empresas que buscam gestão financeira e estratégica.",
    features: [
      "Tudo do plano Profissional",
      "BPO Financeiro (Consultar)",
      "Reuniões trimestrais de análise",
      "Consultoria empresarial dedicada",
      "Recuperação tributária",
      "Suporte exclusivo 24h (urgências)",
    ],
    cta: "Falar com Consultor",
    link: "https://wa.me/555132646306?text=Olá!%20Quero%20conhecer%20o%20plano%20Premium.",
    highlight: false,
  },
];
