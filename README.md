# MEJC

## Bakgrund till projektet

Året är 1992, Waynes World och Charlie Moongår på biograferna. Janne Kemi är en finsk ultramiljonär som bestämt sig för att satsa på en ny e-handeln.
Han vill investera i nya hemsidor. Han har anlitat er för att ta fram dessa sidor.Han har vissa specifika krav från sin IT avdelning som han bifogat
som en kravspecifikation. Förutom det har ni fria händer att ta fram en grym idé och tjäna sjuka pengar (åt Janne).

## Uppstart

## Kravspecifikationer

### G
- [x] Alla sidor skall vara responsiva (G)
- [x] Arbetet ska implementeras med en React-frontend och en Express-backend (G)
- [ ] Express-backenden ska ha validering på samtliga endpoints (G) 
- [x] Skapa ett ER-diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G) 
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton m.m.) (G)
- [ ] Man ska kunna logga in som administratör i systemet (G)
- [ ] Inga lösenord får sparas i klartext i databasen (G)
- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admindelen av sidan (G)
- [ ] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [ ] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i localStorage på klienten (G)
- [ ] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

### VG
- [x] Ett CI-flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställningar och om de är skickade eller inte (VG)
- [ ] Administratörer ska kunna redigera en produkt inklusive vilka kategorier den tillhör (VG)
- [ ] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [ ] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [ ] En administratör ska kunna uppgradera en användare till administratör (VG)
- [ ] Administratörer ska kunna markera beställningar som skickade (VG)
