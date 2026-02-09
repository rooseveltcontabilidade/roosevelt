export interface ClientPortal {
  label: string;
  description: string;
  href: string;
}

export const CLIENT_PORTALS: ClientPortal[] = [
  {
    label: "Onvio",
    description: "Documentos e obrigações",
    href: "https://onvio.com.br/clientcenter/pt/home",
  },
  {
    label: "Acessórias",
    description: "Solicitações e atendimento (Área VIP)",
    href: "http://vip.acessorias.com/roosevelt",
  },
  {
    label: "Roosevelt BI",
    description: "Indicadores e relatórios",
    href: "http://web.roosevelt.com.br/",
  },
];
