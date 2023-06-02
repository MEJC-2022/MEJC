# MEJC

## Skapare

- [Marcus Rosin Lindberg](https://github.com/stenbumling)
- [Emil Helgesson](https://github.com/Emil-Helge)
- [Jenny Pettersson](https://github.com/jesnagbg)
- [Carl Hasselblad](https://github.com/lysmac)

## Bakgrund till projektet

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln.
Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat
som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## Uppstart

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server-mappen genom att skriva `cd server` i terminalen och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Om något har lagts till i projektet sedan npm install kördes.
- `npm run dev` - Startar utvecklingsmiljön.
- `npm run build` - Bygger server-miljön

Efter detta kan du navigera tillbaka till root-mappen genom att skriva `cd ..` och sedan skriva `cd client` och använda följande kommandon:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run dev` - Startar utvecklingsmiljön med Vite.
- `npm run build` - Bygger klient-miljön

När du har gjort detta kan du sedan när du står i root-mappen använda följande kommandon så du slipper navigera in i mapparna vid utveckling:

- `npm test` - Startar testen utan att du behöver navigera in i server-mappen.
- `npm run frontend` - Startar frontend-miljön med Vite.
- `npm run backend` - Startar backend-miljön med Nodemon.

## Användarkonton för testning

**Administratörskonto:**

- `username: david@jensen.se`
- `password: davidlovescats`

## Kravspecifikationer

### G

- [x] Alla sidor skall vara responsiva (G)
  > Uppfyllt. Testat ner till 360px i bredd.
- [x] Arbetet ska implementeras med en React-frontend och en Express-backend (G)
  > Uppfyllt.
- [x] Express-backenden ska ha validering på samtliga endpoints (G)
  > Uppfyllt. Validering gjord med YUP.
- [x] Skapa ett ER-diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
  > Uppfyllt. Se bifogade filer i projektet.
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
  > Uppfyllt.
- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton m.m.) (G)
  > Uppfyllt. Använder en Atlas-databas hos MongoDB.
- [x] Man ska kunna logga in som administratör i systemet (G)
  > Uppfyllt. Se användarkonton ovan.
- [x] Inga lösenord får sparas i klartext i databasen (G)
  > Uppfyllt. Lösenord krypteras med argon2.
- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admindelen av sidan (G)
  > Uppfyllt.
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
  > Uppfyllt.
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
  > Uppfyllt. Se administratörsordersidan.
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
  > Uppfyllt. Alla produkter har kategorier som går att filtrera på.
- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
  > Uppfyllt. Se startsidan.
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i localStorage på klienten (G)
  > Uppfyllt. Fanns sedan tidigare projekt.
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
  > Uppfyllt. Om du inte är inloggad som kund så kommer du till inloggningssidan/registreringssidan i kassan.
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
  > Uppfyllt. Validering gjord med YUP.

### VG

- [x] Ett CI-flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
  > Uppfyllt. CI-flöde satt upp med Github Actions. Använder Vitest för login/logut-test, ESLint för linting, Prettier för formatering och testar att bygga projektet med TypeScript.
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställningar och om de är skickade eller inte (VG)
  > Uppfyllt. Se kundordersidan.
- [x] Administratörer ska kunna redigera en produkt inklusive vilka kategorier den tillhör (VG)
  > Uppfyllt. Se administratörssidan för produkter.
- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
  > Uppfyllt. Se administratörssidan för produkter.
- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
  > Uppfyllt. Använder en global errorhandler.
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
  > Uppfyllt. Se administratörssidan för användare.
- [x] Administratörer ska kunna markera beställningar som skickade (VG)
  > Uppfyllt. Se administratörssidan för ordrar.
