# Healthtracker-v2.0

Healthtracker-v2.0 är en webbaserad applikation designad för att hjälpa användare att spåra och övervaka olika hälsoaspekter. Projektet utnyttjar moderna webbutvecklingsverktyg såsom Vite och Tailwind CSS för att erbjuda en snabb, responsiv och modulär utvecklingsmiljö.

## Funktioner

- **Hälsospårning:** Logga och övervaka vikt, samt se vilket kalloribehov man har för sin aktivitetsnivå.
- **Responsiv design:** Använder Tailwind CSS för att säkerställa en mobilvänlig och responsiv layout.
- **Modern utvecklingsmiljö:** Bygger på Vite för snabba omstarter och en förbättrad utvecklingsupplevelse.
- **Modulär arkitektur:** Enkel att utöka och underhålla tack vare en tydlig mappstruktur.

## Senaste uppdateringar

- **Makroberäkningar:** Alternativ har lagts till i makronutrientberäkningarna för mer flexibilitet. 
- **Globala funktioner:** Funktionen `calculateTDEE` har gjorts global för att förbättra tillgängligheten i hela applikationen. 
- **Presentationsförberedelser:** Huvudversionen har förberetts för presentation, med bättre responsivitet genom att använda tailwind. 
- **WCAG:** Säkerställt att det går att navigera med tangentbordet och skapat en skiplink
- **Mörkt läge:** Stöd för mörkt läge har implementerats för att förbättra användarupplevelsen i olika ljusförhållanden. 
- **Måltidsplanerare:** Utveckling av en måltidsplanerare har påbörjats för att hjälpa användare att planera sina måltider effektivt. 

## Installation

Följ dessa steg för att komma igång med projektet lokalt:

1. **Klona repot:**
   ```bash
   git clone https://github.com/ToeCrow/Healttracker-v2.0
   cd Healthtracker-v2.0
   ```

2. **Installera beroenden:**
   ```bash
   npm install
   ```

3. **Starta utvecklingsservern:**
   ```bash
   npm run dev
   ```
   Applikationen kommer att köras lokalt (ofta på [http://localhost:5173](http://localhost:5173) eller annan specificerad port).

## Vanliga fel

Vid eventuella postCSS-fel, prova följande lösning:

1. Installera nödvändigt postCSS-tillägg:
   ```bash
   npm install -D @tailwindcss/postcss
   ```
2. Starta om utvecklingsservern:
   ```bash
   npm run dev
   ```

## Bygg för produktion

För att skapa en produktionsklar version av applikationen, kör:
```bash
npm run build
```
Detta kommando genererar en optimerad version i mappen `dist`.

## Bidra

Alla bidrag är välkomna! Om du vill bidra, följ dessa steg:

1. **Forka** repot.
2. Skapa en **ny gren** för din feature eller buggfix.
3. Skicka in en **pull request** med en detaljerad beskrivning av dina ändringar.

## Licens

Observera att ingen licens har specificerats i detta repository. Vänligen kontakta repository-ägaren för mer information om licensiering.

## Support

Har du frågor eller behöver hjälp med projektet? Öppna gärna en issue i repot så hjälper vi dig.


