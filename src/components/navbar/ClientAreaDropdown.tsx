import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CLIENT_PORTALS } from "@/content/clientPortals";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ClientAreaDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="group flex items-center gap-1.5 text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 data-[state=open]:text-primary-foreground data-[state=open]:bg-white/10 transition-all duration-200"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          Área do Cliente
          <ChevronDown 
            className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" 
          />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 p-2 bg-navy/95 backdrop-blur-md border-primary-foreground/10 text-primary-foreground shadow-xl rounded-xl">
        {CLIENT_PORTALS.map((portal) => (
          <DropdownMenuItem key={portal.href} asChild>
            <a
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-3 rounded-lg hover:bg-white/10 focus:bg-white/10 outline-none cursor-pointer group"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-sm group-hover:text-trust transition-colors">
                  {portal.label}
                </span>
                <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:text-trust transition-all" />
              </div>
              <span className="text-xs text-primary-foreground/60 leading-tight">
                {portal.description}
              </span>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
