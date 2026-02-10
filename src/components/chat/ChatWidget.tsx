import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, X, Send, Bot, Minimize2, Maximize2, Loader2, Sparkles, Plus, Link as LinkIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    width="20" height="20"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

/**
 * Hook de Auto-Scroll Robusto
 * Gerencia a rolagem automática baseado em:
 * 1. Mudanças na lista de dependências (mensagens, loading)
 * 2. Mudanças no tamanho do conteúdo (ResizeObserver)
 * 3. Intenção do usuário (se rolou pra cima, desativa; se voltou pro fundo, reativa)
 */
function useAutoScroll(dependencies: any[]) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
    const el = viewportRef.current;
    if (el) {
      // Usamos scrollTop direto para garantir que vá para o final exato
      // behavior 'auto' é instantâneo, 'smooth' é animado
      // Para sticky, instantâneo é geralmente melhor para não "perder" a posição durante updates rápidos
      el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }); 
    }
  }, []);

  const handleScroll = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollHeight, scrollTop, clientHeight } = el;
    
    // Threshold de 50px para considerar que o usuário está "no fundo"
    // Se a distância do fundo for menor que 50px, ativamos o sticky
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isAtBottom = distanceFromBottom < 50;
    
    setIsSticky(isAtBottom);
  }, []);

  // 1. Quando dependências mudam e user está no fundo -> Scroll
  useLayoutEffect(() => {
    if (isSticky) {
      scrollToBottom();
      // Reforço para garantir após pintura
      requestAnimationFrame(() => scrollToBottom());
    }
  }, [dependencies, isSticky, scrollToBottom]);

  // 2. Quando o conteúdo muda de tamanho (ex: imagem carregou, texto quebrou linha) -> Scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (isSticky) {
        scrollToBottom();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [isSticky, scrollToBottom]);

  return { viewportRef, contentRef, handleScroll, isSticky };
}

// Componente de Lista de Mensagens Isolado
// Encapsula a lógica de scroll para garantir que a ref esteja sempre correta
const MessageList = ({ messages, isLoading, error }: { messages: Message[], isLoading: boolean, error: string | null }) => {
  const { viewportRef, contentRef, handleScroll } = useAutoScroll([messages, isLoading, error]);

  return (
    <div 
      ref={viewportRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto p-4 custom-scrollbar scroll-smooth"
    >
      <div ref={contentRef} className="flex flex-col gap-4 min-h-full pb-2">
        {messages.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-8 p-6 bg-background/50 rounded-xl border border-border/50 mx-2 shadow-sm">
            <div className="w-12 h-12 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot size={24} className="text-trust" />
            </div>
            <p className="font-medium text-foreground mb-1">Roosevelt IA</p>
            <p className="text-xs leading-relaxed">
              Como posso ajudar hoje?
            </p>
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex w-fit max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap break-words",
              m.role === 'user' 
                ? "ml-auto bg-trust text-trust-foreground rounded-br-none" 
                : "bg-background border border-border text-foreground rounded-bl-none"
            )}
          >
            {m.content}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl rounded-bl-none px-4 py-3 text-sm bg-background border border-border text-foreground shadow-sm">
            <div className="flex gap-1 items-center h-5">
              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-xs text-destructive text-center mt-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20 mx-4">
            {error}. Tente novamente.
          </div>
        )}
      </div>
    </div>
  );
};

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Custom Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue || !inputValue.trim() || isLoading) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: inputValue 
    };

    // Atualiza UI imediatamente
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const payloadMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Sem resposta.'
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      console.error("❌ Failed to send message:", err);
      setError(err.message || 'Erro ao enviar mensagem');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Dispatch custom event for chat state
    const event = new CustomEvent('chat-state-change', { 
      detail: { isOpen: isChatOpen, isMinimized } 
    });
    window.dispatchEvent(event);
  }, [isChatOpen, isMinimized]);

  useEffect(() => {
    const handleMobileMenuChange = (e: CustomEvent) => {
      const isMenuOpen = (e as any).detail?.isOpen;
      setIsHidden(!!isMenuOpen);
      if (isMenuOpen) {
        setIsChatOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('mobile-menu-change' as any, handleMobileMenuChange as any);
    return () => window.removeEventListener('mobile-menu-change' as any, handleMobileMenuChange as any);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  function renderInput() {
    return (
      <CardFooter className="p-3 bg-background border-t border-border shrink-0">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <Input 
            value={inputValue} 
            onChange={handleInputChange} 
            placeholder="Digite sua dúvida..." 
            className="flex-1 focus-visible:ring-trust bg-muted/50 border-muted-foreground/20"
            disabled={isLoading}
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !inputValue.trim()} 
            className="bg-trust hover:bg-electric text-trust-foreground shadow-sm shrink-0 transition-all"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </Button>
        </form>
      </CardFooter>
    );
  }

  // 1. Desktop Chat (Original Card)
  const DesktopChat = (
    <Card className={cn(
      "hidden md:flex flex-col shadow-2xl border-trust/20 animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden origin-bottom-right absolute right-20 transition-all",
      isMinimized ? "h-auto bottom-0 w-[300px]" : "h-[450px] bottom-0 w-[380px]"
    )}>
      <CardHeader 
        className="bg-navy text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0 shrink-0 cursor-pointer"
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-full">
            <Bot size={20} className="text-trust" />
          </div>
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              Roosevelt IA <Sparkles size={12} className="text-trust" />
            </CardTitle>
            <p className="text-xs text-white/70">Online agora</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}
          >
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <>
          <CardContent className="flex-1 min-h-0 p-0 overflow-hidden bg-muted/30 relative">
            <MessageList messages={messages} isLoading={isLoading} error={error} />
          </CardContent>
          {renderInput()}
        </>
      )}
    </Card>
  );

  // 2. Mobile Chat (Full Screen & FAB)
  const MobileChat = (
    <>
      {/* Mobile Full Screen Chat */}
      {isChatOpen && !isMinimized && (
        <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-navy text-primary-foreground shrink-0 pb-safe-top">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 -ml-2"
                onClick={() => setIsMinimized(true)}
              >
                <ChevronDown size={24} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-trust" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Roosevelt IA</h3>
                  <p className="text-xs text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online agora
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:bg-white/10 rounded-full"
              onClick={() => setIsChatOpen(false)}
            >
              <X size={22} />
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 min-h-0 overflow-hidden bg-muted/20 relative">
             <MessageList messages={messages} isLoading={isLoading} error={error} />
          </div>

          {/* Mobile Input */}
          <div className="p-3 bg-background border-t border-border shrink-0 pb-safe-bottom">
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
              <Input 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Digite sua dúvida..." 
                className="flex-1 h-12 rounded-full focus-visible:ring-trust bg-muted/50 border-muted-foreground/20 px-4 text-base"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !inputValue.trim()} 
                className="h-12 w-12 rounded-full bg-trust hover:bg-electric text-trust-foreground shadow-sm shrink-0 transition-all"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile FAB (Minimized) */}
      {isChatOpen && isMinimized && (
        <div 
          className="md:hidden fixed bottom-6 right-24 z-50 animate-in slide-in-from-bottom-10 zoom-in-50 duration-300"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-14 h-14 bg-navy text-primary-foreground rounded-full shadow-xl flex items-center justify-center cursor-pointer border-2 border-white hover:scale-105 transition-transform">
            <Bot size={28} className="text-trust" />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex-col items-center gap-2 font-sans transition-opacity duration-200",
      isHidden ? "hidden md:flex" : "flex"
    )}>
      {/* Desktop Chat */}
      {isChatOpen && DesktopChat}

      {/* Mobile Chat */}
      {MobileChat}

      {/* Speed Dial Menu Items */}
      <div className={cn(
        "flex flex-col gap-2 transition-all duration-300 items-center", 
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        (isChatOpen && !isMinimized) ? "md:opacity-100 md:translate-y-0 opacity-0 translate-y-10 pointer-events-none" : ""
      )}>
        {/* Chat Button */}
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-navy hover:bg-navy/80 text-white ring-2 ring-white transition-transform hover:scale-110"
          onClick={toggleChat}
          title="Chat IA"
        >
          <MessageSquare size={20} />
        </Button>

        {/* Linktree Button */}
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-[#43E660] hover:bg-[#39C953] text-white transition-transform hover:scale-110"
          onClick={() => window.open('https://linktr.ee/rooseveltcontabilidade', '_blank')}
          title="Linktree"
        >
          <LinkIcon size={20} />
        </Button>

        {/* WhatsApp Button */}
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20BD5A] text-white transition-transform hover:scale-110"
          onClick={() => window.open('https://wa.me/555132646306', '_blank')}
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={toggleMenu}
        className={cn(
          "rounded-full w-14 h-14 p-0 shadow-xl transition-all duration-300 relative z-50 flex items-center justify-center",
          isMenuOpen
            ? "bg-navy text-white hover:bg-navy/90 rotate-45"
            : "bg-trust hover:bg-electric text-trust-foreground hover:scale-105 hover:-translate-y-1",
          (isChatOpen && !isMinimized) && "opacity-0 pointer-events-none delay-100 md:opacity-100 md:pointer-events-auto md:delay-0"
        )}
      >
        <Plus size={28} />
      </Button>
    </div>
  );
}
