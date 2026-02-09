
export interface Testimonial {
  name: string;
  company?: string;
  text: string;
  category: "Atendimento" | "Agilidade" | "Segurança" | "Consultoria" | "Tradição";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adão Paulo Machado",
    company: "Consultoria em T.I.",
    text: "Tinhamos um passivo junto a receita e problemas no SIMPLES. A equipe Roosevelt resolveu tudo com agilidade. Hoje recebemos um Dashboard informando que nossa empresa está 100% em dia.",
    category: "Segurança",
  },
  {
    name: "Marcos Lucho",
    company: "Cliente de 2ª Geração",
    text: "Somos a 2ª geração da família cliente deles, equipe extremamente competente. Uma honra sermos atendidos por vocês.",
    category: "Tradição",
  },
  {
    name: "Carol Brambilla",
    company: "Escola de Educação",
    text: "Desde o primeiro contato fomos recebidos com respeito e profissionalismo. A equipe demonstra domínio técnico, organização e transparência em todos os processos.",
    category: "Atendimento",
  },
  {
    name: "Jeff Jaques",
    company: "Empresário",
    text: "Minha empresa já teve alguns contadores, mas nenhum chegou perto da competência da Roosevelt. Hoje vejo que perdi tempo e dinheiro trabalhando com outros.",
    category: "Consultoria",
  },
  {
    name: "Raul (Aerogare Principal)",
    company: "Cliente há 30 anos",
    text: "Equipe de primeira qualidade, excelentes profissionais e ótimas pessoas. Sou cliente há 30 anos e recomendo de olhos fechados.",
    category: "Tradição",
  },
  {
    name: "Renato Rodrigues",
    company: "Empresário",
    text: "Resolveram vários problemas que vinham se arrastando há anos. Uma empresa séria que transmite muita confiança e é muito eficiente e ágil.",
    category: "Agilidade",
  },
  {
    name: "Madalena Kuligovska",
    company: "Local Guide",
    text: "Empresa séria, que sana dúvidas e te deixa em dia com todas as obrigações, explicando minuciosamente cada passo dado e o porquê de cada decisão.",
    category: "Consultoria",
  },
  {
    name: "Karina Santos",
    company: "Cliente Satisfeita",
    text: "Um excelente atendimento com soluções rápidas! Parabéns a toda a equipe.",
    category: "Agilidade",
  },
  {
    name: "Felipe Schwanck",
    company: "Empresário",
    text: "Profissionais extremamente competentes e pró-ativos. Sempre atualizados em relação a legislação. Empresa sólida com anos de experiência, moral e ética.",
    category: "Atendimento",
  },
  {
    name: "Dr. Elvio Campagnolo",
    company: "Ortopedista",
    text: "Sempre muito bem atendido e responsabilidade nota 10.",
    category: "Atendimento",
  },
  {
    name: "Daniel Flores Saccol",
    company: "Local Guide",
    text: "Excelente escritório contábil, está entre os melhores da Grande Porto Alegre.",
    category: "Tradição",
  }
];
