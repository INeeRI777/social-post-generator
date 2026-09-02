# PostCraft AI
 
Aplikacja do generowania postów w mediach społecznościowych dla firm. Wpisujesz branżę, cel i ton — dostajesz gotowy post z dobranymi zdjęciami.
 
## Stack
 
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Claude Haiku (Anthropic API) — generowanie treści
- Unsplash API — darmowe zdjęcia dopasowane do postu
## Co robi
 
- Generuje tekst postu pod LinkedIn, Instagram lub Facebook
- Automatycznie dobiera hashtagi i słowa kluczowe
- Pobiera pasujące zdjęcia z Unsplash (bez kosztów)
- Podgląd postu w mockupie platformy
- Edycja tekstu przed skopiowaniem
## Uruchomienie lokalne
 
```bash
npm install
```
 
Utwórz plik `.env.local`:
 
```
ANTHROPIC_API_KEY=twój_klucz
UNSPLASH_ACCESS_KEY=twój_klucz
```
 
```bash
npm run dev
```
 
Klucz Anthropic: [console.anthropic.com](https://console.anthropic.com)  
Klucz Unsplash: [unsplash.com/developers](https://unsplash.com/developers) (darmowe)
 
## Status
 
W trakcie rozwoju — generowanie i wybór zdjęć jeszcze nie działają bez kluczy API.
