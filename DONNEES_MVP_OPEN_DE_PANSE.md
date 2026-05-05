# Open de Panse - Donnees MVP

## Calendrier des parcours

La prochaine edition de l'Open de Panse se joue sur 4 tours et 4 parcours, du mercredi 3 juin au vendredi 5 juin 2026.

| Tour | Date | Club | Parcours | Notes |
| --- | --- | --- | --- | --- |
| 1 | Mercredi 3 juin 2026 | Golf Club Castelconturbia | Yellow Course - Pini + Blue Course - Castagni | Format championship, par 72, environ 5885 m des jaunes. |
| 2 | Jeudi 4 juin 2026 | Circolo Golf Bogogno | Bonora | Premier parcours de la journee. |
| 3 | Jeudi 4 juin 2026 | Circolo Golf Bogogno | Del Conte | Deuxieme parcours de la journee. |
| 4 | Vendredi 5 juin 2026 | Le Robinie Golf Club | Le Robinie | Dernier tour. |

## Donnees parcours disponibles pour le prototype

### Tour 1 - Golf Club Castelconturbia, Yellow Course - Pini + Blue Course - Castagni

Informations a utiliser dans le MVP :

- Club : Golf Club Castelconturbia.
- Localisation : Agrate Conturbia, Piemonte, Italie.
- Date : mercredi 3 juin 2026.
- Parcours : Yellow Course - Pini + Blue Course - Castagni.
- Format : 18 trous.
- Par : 72.
- Distance depart jaune : 5885 m.
- Course rating depart jaune : 71,5.
- Slope depart jaune : 142.
- Distance depart blanc : 6230 m.
- Course rating depart blanc : 73,2.
- Slope depart blanc : 145.

Ordre de jeu :

- Trous 1 a 9 : Yellow Course - Pini.
- Trous 10 a 18 : Blue Course - Castagni.

### Tour 2 - Circolo Golf Bogogno, Bonora

Informations a utiliser dans le MVP :

- Club : Circolo Golf Bogogno.
- Parcours : Bonora.
- Localisation : Bogogno, Piemonte, Italie.
- Date : jeudi 4 juin 2026.
- Ordre : premier parcours de la journee.
- Par : 72.
- Departs masculins principaux identifies :
  - Blanc / Blanco : course rating 74,4, slope 140, distance 6284 m.
  - Jaune / Giallo : course rating 72,5, slope 136, distance 5880 m.

### Tour 3 - Circolo Golf Bogogno, Del Conte

Informations a utiliser dans le MVP :

- Club : Circolo Golf Bogogno.
- Parcours : Del Conte.
- Localisation : Bogogno, Piemonte, Italie.
- Date : jeudi 4 juin 2026.
- Ordre : deuxieme parcours de la journee.
- Par : 72.
- Departs masculins principaux identifies :
  - Blanc / Blanco : course rating 73,1, slope 131, distance 6206 m.
  - Jaune / Giallo : course rating 71,0, slope 127, distance 5755 m.

### Tour 4 - Le Robinie Golf Club

Informations a utiliser dans le MVP :

- Club : Le Robinie Golf Club.
- Parcours : Le Robinie.
- Localisation : Solbiate Olona, Lombardia, Italie.
- Date : vendredi 5 juin 2026.
- Par : 72.
- Departs principaux identifies :
  - Championship : course rating 73,7, slope 130, distance 6520 m.
  - Regular : course rating 71,7, slope 125, distance 6168 m.

## Strategie de saisie MVP

Pour le premier prototype, ces 4 parcours doivent etre precharges dans l'application comme donnees reelles de depart.

Le prototype doit permettre :

- De modifier les donnees de parcours si une carte de score plus fiable est fournie.
- De modifier les departs, slopes et course ratings.
- De corriger les pars et stroke indexes trou par trou.
- De remplacer le parcours de Castelconturbia une fois la combinaison exacte connue.

## Donnees encore necessaires

Pour que les calculs soient definitifs, il faudra disposer pour chaque parcours :

- Des pars de tous les trous joues.
- Des stroke indexes de tous les trous joues.
- Des departs joues par les participants.
- Du slope et course rating des departs blancs et jaunes.
- Pour Castelconturbia, de la combinaison exacte de boucles jouees.
