# MEJC

## Bakgrund till projektet

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln.
Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat
som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## Uppstart

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).
Servern har två miljöer konfigurerade, en för utveckling och en för testning.

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.
- `npm test` - Startar testmiljön så du kan jobba med kravlistan.
- `npm run build` - Bygger server-miljön

Efter detta kan du navigera tillbaka till root-mappen genom att skriva `cd ..` och sedan skriva `cd client` och använda följande kommandon:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run dev` - Startar utvecklingsmiljön med Vite.
-  `npm run build` - Bygger klient-miljön


När du har gjort detta kan du sedan när du står i root-mappen använda följande kommandon så du slipper navigera in i mapparna:

- `npm test` - Startar testen utan att du behöver navigera in i server-mappen.
- `npm run frontend` - Startar frontend-miljön med Vite.
- `npm run backend` - Startar backend-miljön med Nodemon.

## Kravspecifikationer

### G

- [x] Alla sidor skall vara responsiva (G)
- [x] Arbetet ska implementeras med en React-frontend och en Express-backend (G)
- [x] Express-backenden ska ha validering på samtliga endpoints (G)
- [x] Skapa ett ER-diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton m.m.) (G)
- [x] Man ska kunna logga in som administratör i systemet (G)
- [x] Inga lösenord får sparas i klartext i databasen (G)
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admindelen av sidan (G)
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i localStorage på klienten (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

### VG

- [x] Ett CI-flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställningar och om de är skickade eller inte (VG)
- [x] Administratörer ska kunna redigera en produkt inklusive vilka kategorier den tillhör (VG)
- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
- [x] Administratörer ska kunna markera beställningar som skickade (VG)
