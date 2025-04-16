
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { GlobeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-marina hover:text-marina-accent">
          <GlobeIcon className="h-5 w-5" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={language === 'en' ? 'bg-marina-muted/20' : ''}
        >
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('de')} 
          className={language === 'de' ? 'bg-marina-muted/20' : ''}
        >
          🇩🇪 Deutsch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
