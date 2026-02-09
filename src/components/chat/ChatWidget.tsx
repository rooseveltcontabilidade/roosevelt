import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Send, Bot, Minimize2, Maximize2, Loader2, Sparkles, Plus, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use manual input state as recent SDK versions might not provide it in useChat helpers
  const [input, setInput] = useState('');
  
  // Remove api property as it's not in the type (defaults to /api/chat)
  // Use regenerate instead of reload
  const { messages, status, error, regenerate, stop } = useChat({
    onError: (err) => {
        console.error("Chat API Error:", err);
    }
  });

  // Derive isLoading from status if not provided directly
  const isLoading = status === 'submitted' || status === 'streaming';
  
  // Custom append/sendMessage function if needed (SDK usually provides sendMessage)
  // Casting to any to avoid potential type mismatches if SDK definitions are in flux
  const { sendMessage } = useChat() as any; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setInput(''); // Clear input immediately
    
    try {
      if (sendMessage) {
        await sendMessage(userMessage);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleChat = () => {
      setIsChatOpen(!isChatOpen);
      // Optional: Close menu when opening chat if desired, or keep it open.
      // setIsMenuOpen(false); 
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 font-sans">
      {/* Chat Window */}
      {isChatOpen && (
        <Card className={cn(
          "w-[300px] sm:w-[350px] md:w-[380px] shadow-2xl border-trust/20 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden mb-0 origin-bottom-right absolute bottom-0 right-20",
          isMinimized ? "h-auto" : "h-[450px]"
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
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={(e) => { e.stopPropagation(); setIsChatOpen(false); }}>
                <X size={18} />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="flex-1 p-0 overflow-hidden bg-muted/30 relative">
                <ScrollArea className="h-full p-4">
                  <div className="flex flex-col gap-4 min-h-full pb-2">
                    {messages.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground mt-8 p-6 bg-background/50 rounded-xl border border-border/50 mx-2 shadow-sm">
                        <div className="w-12 h-12 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Bot size={24} className="text-trust" />
                        </div>
                        <p className="font-medium text-foreground mb-1">Olá! Bem-vindo à Roosevelt.</p>
                        <p className="text-xs leading-relaxed">
                          Sou sua assistente virtual. Posso ajudar com serviços contábeis, abertura de empresas e dúvidas sobre nossos planos. Como posso ajudar hoje?
                        </p>
                      </div>
                    )}
                    
                    {messages.map((m: any) => (
                      <div
                        key={m.id}
                        className={cn(
                          "flex w-max max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                          m.role === 'user' 
                            ? "ml-auto bg-trust text-trust-foreground rounded-br-none" 
                            : "bg-background border border-border text-foreground rounded-bl-none"
                        )}
                      >
                        {m.content}
                      </div>
                    ))}
                    
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
                        Estamos offline no momento. Por favor, tente pelo WhatsApp.
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-3 bg-background border-t border-border shrink-0">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                  <Input 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="Digite sua dúvida..." 
                    className="flex-1 focus-visible:ring-trust bg-muted/50 border-muted-foreground/20"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()} 
                    className="bg-trust hover:bg-electric text-trust-foreground shadow-sm shrink-0 transition-all"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}

      {/* Speed Dial Menu Items */}
      {/* Speed Dial Menu Items */}
      <div className={cn("flex flex-col gap-2 transition-all duration-300 items-center", isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none")}>
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
          isMenuOpen ? "bg-navy text-white hover:bg-navy/90 rotate-45" : "bg-trust hover:bg-electric text-trust-foreground hover:scale-105 hover:-translate-y-1"
        )}
      >
          <Plus size={28} />
      </Button>
    </div>
  );
}
