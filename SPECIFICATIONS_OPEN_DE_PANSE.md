# Open de Panse - Specifications initiales

## 1. Vision du produit

Open de Panse est une application web mobile-first qui permet a 12 joueurs de golf de participer a une competition individuelle en Stableford net, avec saisie des scores sur le parcours, calcul automatique des points, classement en temps reel et notifications des moments marquants.

L'application doit permettre de selectionner un parcours de golf, idealement depuis des donnees publiques disponibles en ligne, afin de recuperer les informations necessaires au calcul des coups rendus : par trou par trou, index de difficulte, slope, course rating et caracteristiques du depart joue.

## 2. Objectifs principaux

- Creer une competition "Open de Panse" avec 12 participants.
- Rechercher et selectionner un parcours, notamment en Italie dans la region de Milan et des grands lacs.
- Recuperer ou saisir les donnees de carte de score du parcours : par, index de difficulte des trous, slope, course rating, depart joue.
- Enregistrer le handicap de chaque joueur.
- Recommander une couleur de depart pour chaque joueur en fonction de son handicap.
- Calculer les coups rendus de chaque joueur.
- Calculer les points Stableford nets trou par trou.
- Afficher le classement individuel en temps reel.
- Afficher les scores bruts en complement, sans en faire le classement principal.
- Envoyer une notification a tous les participants lorsqu'un joueur realise un score brut sous le par : birdie, eagle, albatros ou mieux.
- Mettre a jour le handicap interne Open de Panse de chaque joueur a l'issue du parcours.
- Conserver un historique des editions et parties de l'Open de Panse.

## 3. Public cible

- Organisateur de l'Open de Panse.
- Joueurs participants.
- Spectateurs ou accompagnants pouvant consulter le classement live.

## 4. Plateforme cible

### Choix recommande pour une premiere version

Application web responsive, optimisee mobile, pouvant devenir une Progressive Web App.

Raisons :

- Accessible depuis un lien, sans installation obligatoire.
- Compatible iPhone et Android.
- Plus rapide a developper qu'une application native.
- Compatible avec des notifications push si l'application est installee comme PWA ou si le navigateur le permet.

## 5. Perimetre MVP

Le MVP doit permettre de faire fonctionner une competition individuelle complete en Stableford net.

### Fonctionnalites indispensables

- Creation d'un evenement.
- Creation ou import des 12 joueurs.
- Configuration du nombre de tours : 3 ou 4 tours, avec 4 tours comme valeur par defaut.
- Selection d'un parcours different pour chaque tour.
- Saisie du handicap/index de chaque joueur.
- Recherche d'un parcours.
- Recommandation automatique de la couleur de depart selon le handicap du joueur.
- Selection du depart joue par joueur ou par groupe de joueurs.
- Import ou saisie manuelle des informations du parcours.
- Calcul des coups rendus par joueur.
- Saisie des scores bruts trou par trou.
- Calcul automatique des points Stableford nets.
- Classement individuel live par points Stableford nets.
- Affichage secondaire du score brut et du score relatif au par.
- Notification live en cas de birdie brut, eagle brut, albatros brut ou meilleur score brut sous le par.
- Calcul du nouveau handicap interne Open de Panse apres validation de la partie.
- Synchronisation en temps reel entre plusieurs telephones.
- Classement public accessible sans mot de passe.
- Gestion des parties de jeu, avec au moins un marqueur par partie.
- Mode consultation pour les personnes qui ne saisissent pas les scores.

### Fonctionnalites non indispensables pour le MVP

- Classement par equipe.
- Gestion multi-clubs.
- Paiement.
- Export PDF automatique.
- Statistiques historiques avancees.
- Application native iOS / Android.
- Gestion exhaustive de toutes les formules de jeu.

## 6. Regles de jeu

### Formule principale

La competition est individuelle et se joue en Stableford net.

Le classement principal est donc le total de points Stableford nets de chaque joueur.

### Donnees necessaires au calcul

Pour chaque parcours et chaque depart joue :

- Par total.
- Par de chaque trou.
- Index de difficulte de chaque trou, souvent appele stroke index ou handicap hole.
- Slope rating.
- Course rating.
- Eventuellement PCC / playing conditions calculation si l'on veut une version plus officielle plus tard.

Pour chaque joueur :

- Index ou handicap.
- Couleur de depart recommandee.
- Depart joue.
- Nombre de coups rendus calcule pour le parcours et le depart.

### Recommandation de depart

L'application recommande une couleur de depart en fonction du handicap du joueur et des caracteristiques du parcours, notamment le slope du depart.

La competition etant exclusivement masculine, la logique de recommandation se concentre sur les departs masculins disponibles sur le parcours, par exemple blancs et jaunes.

Objectif :

- Aider l'organisateur a choisir entre blancs, jaunes ou autres departs disponibles.
- Garder une competition equitable et agreable.
- Permettre a l'organisateur de modifier manuellement la recommandation.

Regles de recommandation a parametrer :

- Handicap faible : depart blanc recommande.
- Handicap intermediaire ou eleve : depart jaune recommande.
- Le slope du depart doit etre pris en compte, car un depart blanc avec slope eleve peut etre beaucoup plus exigeant qu'un depart blanc plus accessible.
- Les seuils exacts doivent etre configurables, car ils peuvent varier selon le parcours, le niveau des joueurs et les habitudes de l'Open de Panse.

Hypothese MVP provisoire pour le prototype :

- Handicap faible et slope raisonnable : blancs recommandes.
- Handicap plus eleve ou slope blanc tres exigeant : jaunes recommandes.
- L'organisateur peut toujours forcer un autre depart.

### Calcul des coups rendus

Le calcul des coups rendus applique la formule WHS.

Formule :

handicap de jeu = index joueur x slope / 113 + course rating - par

Regle d'arrondi :

- Decimale inferieure a 0,5 : arrondi a l'entier inferieur.
- Decimale egale ou superieure a 0,5 : arrondi a l'entier superieur.

Les coups rendus sont ensuite repartis trou par trou selon l'index de difficulte des trous.

Exemple :

- Un joueur avec 18 coups rendus recoit 1 coup sur chaque trou.
- Un joueur avec 24 coups rendus recoit 1 coup sur chaque trou, puis 1 coup supplementaire sur les trous d'index 1 a 6.
- Un joueur avec 7 coups rendus recoit 1 coup sur les trous d'index 1 a 7.

### Calcul Stableford net par trou

Score net du trou :

coups bruts - coups rendus sur le trou

Points Stableford nets :

- Albatros net ou mieux : 5 points ou plus selon l'ecart.
- Eagle net : 4 points.
- Birdie net : 3 points.
- Par net : 2 points.
- Bogey net : 1 point.
- Double bogey net ou plus : 0 point.

Formule generique :

points = max(0, 2 + par du trou - score net)

### Score brut

Le score brut est conserve et affiche, notamment pour :

- Identifier les birdies bruts.
- Suivre la performance golfique reelle.
- Afficher le score relatif au par.
- Departager eventuellement certains cas, si souhaite.

### Score brut sous le par

Un score brut sous le par est detecte quand :

coups bruts < par du trou

Les categories affichees sont :

- Birdie brut : coups bruts = par - 1.
- Eagle brut : coups bruts = par - 2.
- Albatros brut : coups bruts = par - 3.
- Performance exceptionnelle : coups bruts <= par - 4.

Quand un score brut sous le par est valide, l'application envoie une notification aux participants.

### Mise a jour du handicap Open de Panse

A l'issue de chaque parcours, l'application calcule un nouveau handicap interne Open de Panse pour chaque joueur.

Cette evolution suit une regle maison, distincte d'un calcul officiel WHS :

- Si le joueur fait mieux que son handicap en Stableford, son handicap baisse de 0,5 par point de performance.
- Si le joueur fait moins bien que son handicap en Stableford, son handicap remonte de 0,5 par point de contre-performance.
- Si le joueur joue exactement son handicap, le handicap ne change pas.

Reference Stableford :

- 36 points Stableford nets representent une partie jouee a son handicap.
- Difference de performance = points Stableford nets - 36.

Formule :

nouveau handicap = handicap actuel - ((points Stableford nets - 36) x 0,5)

Exemples :

- 39 points Stableford nets : 3 points au-dessus de 36, donc handicap baisse de 1,5.
- 33 points Stableford nets : 3 points sous 36, donc handicap remonte de 1,5.
- 36 points Stableford nets : handicap inchange.

Le nouveau handicap devient le handicap de reference pour la partie suivante.

## 7. Recherche et selection de parcours

### Parcours de la prochaine edition

Les parcours connus pour le MVP sont :

- Tour 1, mercredi 3 juin 2026 : Golf Club Castelconturbia, Yellow Course - Pini + Blue Course - Castagni, format championship par 72.
- Tour 2, jeudi 4 juin 2026 matin : Circolo Golf Bogogno, parcours Bonora.
- Tour 3, jeudi 4 juin 2026 apres-midi : Circolo Golf Bogogno, parcours Del Conte.
- Tour 4, vendredi 5 juin 2026 : Le Robinie Golf Club, parcours Le Robinie.

Ces parcours doivent etre precharges dans le prototype pour permettre de travailler avec des donnees proches de la competition reelle.

### Besoin utilisateur

L'organisateur doit pouvoir rechercher un parcours par nom, pays ou region, par exemple autour de Milan et des grands lacs en Italie.

L'application doit ensuite proposer une carte de score exploitable pour le calcul :

- Nom du club.
- Nom du parcours.
- Localisation.
- Trous.
- Pars.
- Stroke index / handicap hole.
- Departs disponibles.
- Slope par depart.
- Course rating par depart.

### Sources de donnees possibles

Les donnees de parcours peuvent venir de plusieurs sources :

- API ou base de donnees golf publique ou commerciale.
- Sites web publics de clubs, lorsque les informations sont accessibles.
- Import manuel par l'organisateur.
- Import depuis une photo ou un PDF de carte de score dans une version ulterieure.

### Hypothese MVP

Pour garantir que la competition fonctionne meme si l'import automatique n'est pas disponible :

- La recherche de parcours est prevue dans l'interface.
- L'organisateur peut creer ou corriger manuellement la carte de score.
- Les parcours deja utilises sont sauvegardes dans la base de l'application.

La connexion a une source publique de parcours sera traitee comme un module separe, car la disponibilite, la qualite et les droits d'utilisation des donnees doivent etre verifies.

## 8. Roles utilisateurs

### Organisateur

- Cree l'evenement.
- Ajoute les joueurs.
- Configure le nombre de tours.
- Selectionne ou configure les parcours de chaque tour.
- Configure les departs.
- Consulte et ajuste les recommandations de couleur de depart.
- Verifie les handicaps.
- Configure les parties de jeu et les marqueurs.
- Corrige les scores si necessaire.
- Suit la mise a jour automatique des handicaps apres chaque tour.
- Termine la competition.

### Joueur

- Peut saisir son propre score.
- Peut aussi voir les scores saisis par le marqueur de sa partie.
- Consulte son detail trou par trou.
- Consulte le classement live.
- Consulte sa couleur de depart recommandee.
- Recoit les notifications de score brut sous le par.

### Marqueur de partie

- Une personne par partie de jeu doit pouvoir saisir les scores du groupe.
- Le marqueur peut saisir les scores de tous les joueurs de sa partie.
- Chaque joueur conserve la possibilite de saisir son propre score si necessaire.

### Spectateur

- Consulte le classement public sans mot de passe.

## 9. Parcours utilisateur principal

1. L'organisateur cree l'evenement "Open de Panse".
2. Il choisit le nombre de tours : 3 ou 4, avec 4 par defaut.
3. Il ajoute les 12 joueurs et leurs handicaps.
4. Il recherche et selectionne le parcours de chaque tour.
5. L'application recommande une couleur de depart pour chaque joueur selon son handicap et le slope des departs disponibles.
6. L'organisateur valide ou ajuste le depart de chaque joueur pour chaque tour.
7. Il verifie les pars, stroke index, slope et course rating.
8. L'application calcule les coups rendus de chaque joueur pour le tour concerne.
9. L'organisateur configure les parties de jeu et designe au moins un marqueur par partie.
10. L'organisateur partage un lien avec les participants.
11. Pendant la partie, les scores bruts sont saisis trou par trou par le marqueur ou par les joueurs.
12. Les points Stableford nets et le classement live se mettent a jour automatiquement.
13. Lorsqu'un joueur realise un score brut sous le par, les participants recoivent une notification push si possible.
14. A la fin du tour, l'application calcule automatiquement le nouveau handicap Open de Panse de chaque joueur.
15. Le handicap mis a jour devient le handicap de reference du tour suivant.
16. A la fin du dernier tour, l'organisateur publie le resultat final.

## 10. Ecrans principaux

### Accueil evenement

- Nom de l'evenement.
- Date.
- Nombre de tours.
- Parcours selectionnes.
- Statut : preparation, en cours, termine.
- Acces rapide : classement, saisie des scores, joueurs, parcours.

### Recherche parcours

- Champ de recherche par nom, ville, pays ou region.
- Resultats avec nom du club, parcours et localisation.
- Departs disponibles.
- Apercu du par total, slope et course rating.
- Action pour selectionner le parcours.
- Action pour creer ou corriger manuellement le parcours.

### Configuration parcours

- Liste des trous du parcours, 9 ou 18 selon le parcours joue.
- Par de chaque trou.
- Stroke index de chaque trou.
- Departs disponibles.
- Slope et course rating par depart.
- Validation des donnees manquantes.

### Joueurs

- Liste des 12 joueurs.
- Handicap/index.
- Handicap Open de Panse courant.
- Couleur de depart recommandee.
- Depart joue.
- Coups rendus calcules.
- Handicap projete apres la partie, visible une fois le parcours termine.
- Progression dans la partie.

### Tours

- Liste des tours de la competition.
- Parcours associe a chaque tour.
- Date ou ordre du tour.
- Statut du tour : a venir, en cours, termine, valide.
- Handicap de depart utilise pour chaque joueur sur le tour.
- Handicap mis a jour apres validation du tour.

### Parties de jeu

- Groupes de joueurs pour un tour donne.
- Marqueur designe pour chaque partie.
- Possibilite pour chaque joueur de saisir son propre score.
- Suivi de la completion des scores par partie.

### Saisie des scores

- Selection joueur.
- Vue trou par trou.
- Par, index du trou, coups rendus sur le trou.
- Saisie du score brut.
- Validation du trou par le marqueur ou le joueur avant declenchement des notifications.
- Affichage immediat du score net et des points Stableford.
- Indication visuelle en cas de score brut sous le par.
- Sauvegarde automatique.

### Classement live

- Classement individuel par points Stableford nets.
- Classement par tour et classement cumule sur l'ensemble des tours.
- Total de points.
- Nombre de trous joues.
- Score brut total.
- Score relatif au par.
- Handicap projete apres la partie, lorsque tous les trous du tour sont saisis.
- Derniers faits marquants : birdies bruts, eagles bruts, albatros bruts, grosses remontees, meilleur score sur les derniers trous.

### Detail joueur

- Carte de score complete.
- Score brut par trou.
- Coups rendus par trou.
- Score net par trou.
- Points Stableford par trou.
- Total Stableford net.
- Total brut.
- Score relatif au par.
- Handicap avant la partie.
- Evolution du handicap selon la regle Open de Panse.
- Handicap apres la partie.

### Notifications

- Historique des notifications.
- Scores bruts sous le par detectes.
- Etat lu/non lu optionnel.

### Administration

- Gestion evenement.
- Gestion joueurs.
- Gestion parcours.
- Correction des scores.
- Validation des nouveaux handicaps.
- Publication du resultat final.

## 11. Donnees principales

### Evenement

- id
- nom
- date
- statut
- nombreTours
- modeClassement : stablefordNet
- notificationsActivees
- classementPublicSansMotDePasse

### Tour

- id
- evenementId
- numero
- parcoursId
- date optionnelle
- statut

### Joueur

- id
- prenom
- nom
- surnom optionnel
- indexHandicap
- handicapOpenDePanse
- couleurDepartRecommandee

### JoueurTour

- joueurId
- tourId
- handicapAvantTour
- couleurDepartRecommandee
- departId
- coupsRendus
- handicapApresTour

### PartieDeJeu

- id
- tourId
- nom
- marqueurJoueurId
- joueurs

### Parcours

- id
- nomClub
- nomParcours
- pays
- region
- ville
- trous
- departs
- sourceDonnees optionnelle

### Depart

- id
- nom
- couleur
- genre optionnel
- parTotal
- slope
- courseRating

### Trou

- numero
- par
- strokeIndex

### Score

- joueurId
- tourId
- partieDeJeuId
- trouNumero
- coupsBruts
- coupsRendusTrou
- scoreNetTrou
- pointsStablefordNet
- estBirdieBrut
- typeScoreSousParBrut optionnel : birdie, eagle, albatros, exceptionnel
- saisiPar
- dateModification

### Notification

- id
- evenementId
- type : scoreSousParBrut
- joueurId
- trouNumero
- message
- dateCreation

### Historique handicap

- id
- joueurId
- evenementId
- handicapAvant
- pointsStablefordNet
- ecartVsReference36
- variationHandicap
- handicapApres
- dateValidation

## 12. Calculs

### Coups rendus joueur

Les coups rendus sont calcules avec la formule WHS a partir de l'index du joueur, du slope, du course rating et du par du depart joue.

Le calcul doit etre isole dans un module testable, car il est central.

L'arrondi suit la regle standard : sous 0,5 a l'entier inferieur, a partir de 0,5 a l'entier superieur.

### Repartition des coups rendus par trou

Les coups rendus sont distribues selon le stroke index des trous.

### Score net trou

scoreNetTrou = coupsBruts - coupsRendusTrou

### Points Stableford net trou

points = max(0, 2 + par - scoreNetTrou)

### Total Stableford net joueur

somme des points Stableford nets des trous joues

### Progression joueur

nombre de trous avec un score saisi

### Score brut sous le par

estBirdieBrut = coupsBruts == par - 1

typeScoreSousParBrut :

- birdie si coupsBruts == par - 1
- eagle si coupsBruts == par - 2
- albatros si coupsBruts == par - 3
- exceptionnel si coupsBruts <= par - 4

Une notification est creee uniquement la premiere fois que le score brut sous le par est valide, afin d'eviter les doublons si un score est modifie puis resauvegarde.

### Mise a jour du handicap

ecartVsReference36 = totalStablefordNet - 36

variationHandicap = ecartVsReference36 x -0,5

handicapApres = handicapAvant + variationHandicap

Exemple :

- totalStablefordNet = 39
- ecartVsReference36 = 3
- variationHandicap = -1,5
- handicapApres = handicapAvant - 1,5

La mise a jour est automatique apres validation du tour. Le handicap apres tour devient le handicap avant tour du tour suivant.

## 13. Notifications

### Notification score brut sous le par

Declencheur :

- Un score brut est saisi.
- Le score est strictement inferieur au par du trou.
- Le trou a ete valide par le marqueur ou le joueur.
- Aucun evenement de score brut sous le par n'a deja ete envoye pour ce joueur et ce trou.

Messages exemples :

"Birdie brut pour Thomas au trou 7."

"Eagle brut pour Camille au trou 12."

Canaux possibles :

- Push mobile via PWA dans la mesure du possible.
- Notification dans l'application comme fallback obligatoire.
- Email ou SMS dans une version ulterieure.

### Contraintes

- Les participants doivent accepter les notifications push si elles sont utilisees.
- Sur iPhone, les notifications web sont possibles uniquement dans certains contextes, notamment si l'application est installee sur l'ecran d'accueil.
- Un fallback dans l'application est necessaire pour afficher les notifications meme sans push systeme.

## 14. Experience mobile

- Interface lisible en plein soleil.
- Gros boutons de saisie.
- Navigation simple a une main.
- Peu de texte pendant la saisie.
- Sauvegarde automatique.
- Indicateur clair quand un score est enregistre.
- Classement consultable rapidement.
- Les donnees essentielles du trou doivent etre visibles : par, stroke index, coups rendus, score brut, points nets.

## 15. Design visuel

Direction proposee :

- Sobre, sportif, premium.
- Fond clair, contrastes nets.
- Typographie tres lisible.
- Scores et points Stableford en grand.
- Couleurs reservees aux etats importants : leader, birdie, eagle, albatros, score manquant, score valide.
- Pas d'effet decoratif inutile pendant la saisie.

## 16. Stack technique recommandee

### Frontend

- React avec Vite.
- TypeScript.
- Interface responsive mobile-first.
- PWA pour installation sur mobile et support partiel des notifications push.

### Backend et donnees

Option recommandee :

- Supabase pour base de donnees, authentification legere et temps reel.

Pourquoi :

- Synchronisation live adaptee au classement.
- Base relationnelle pratique pour joueurs, parcours, trous, scores et notifications.
- Fonctions serveur possibles pour securiser les calculs et eviter les doublons de notification.

Alternative :

- Firebase, tres adapte au temps reel et aux notifications, mais moins relationnel pour les donnees de parcours.

### Recherche de parcours

La recherche de parcours doit etre concue comme un module interchangeable :

- Source API si une base fiable est disponible.
- Import manuel si aucune source n'est fiable.
- Cache local des parcours deja selectionnes.

## 17. Priorites de developpement

### Phase 1 - Prototype cliquable

- Donnees fictives des 12 joueurs.
- Les 4 parcours reels de la competition precharges.
- Saisie des handicaps.
- Recommandation simple blanc/jaune selon handicap.
- Calcul des coups rendus.
- Saisie des scores bruts.
- Calcul Stableford net.
- Classement individuel live en local.
- Detection et affichage des scores bruts sous le par dans l'application.
- Calcul du handicap Open de Panse mis a jour a la fin de la partie.

### Phase 2 - Version utilisable en competition

- Sauvegarde en base.
- Synchronisation temps reel.
- Liens de partage.
- Roles simples.
- Corrections de score.
- Notifications de score brut sous le par dans l'application.
- Gestion de plusieurs departs.
- Creation manuelle d'un parcours complet.
- Historique des handicaps Open de Panse.

### Phase 3 - Recherche parcours et notifications avancees

- Connexion a une source externe de parcours.
- Recherche par region, pays, ville et nom.
- Import automatique des cartes de score.
- Notifications push PWA.
- Historique des competitions.
- Export CSV ou PDF.

### Phase 4 - Ameliorations

- Import depuis PDF ou image de carte de score.
- Statistiques avancees.
- Departage automatique.
- Multi-tours.
- Mode hors connexion avec resynchronisation.

## 18. Questions a trancher

### Decisions actees

- Le calcul des coups rendus applique la formule WHS.
- L'arrondi du handicap de jeu se fait a l'entier inferieur sous 0,5 et a l'entier superieur a partir de 0,5.
- La competition est exclusivement masculine.
- La couleur des departs est recommandee selon le handicap du joueur et le slope du depart du parcours.
- Chaque partie de jeu doit avoir au moins un marqueur, mais chaque joueur peut aussi saisir son propre score.
- Le classement public est accessible sans mot de passe.
- La competition se joue sur 3 ou 4 tours, avec 4 tours comme format habituel.
- Chaque tour peut avoir un parcours different.
- Les notifications push mobile sont visees dans la mesure du possible, avec notification dans l'application en secours.
- La mise a jour du handicap Open de Panse est automatique apres chaque tour.

### Points encore ouverts

1. Quels seuils exacts veux-tu utiliser pour recommander blancs ou jaunes selon handicap et slope ?
2. Quelle est la combinaison exacte de boucles jouee a Castelconturbia ?
3. Souhaites-tu un classement cumule uniquement en Stableford net, ou aussi un classement brut cumule secondaire ?

## 19. Definition de succes du MVP

Le MVP est reussi si, pendant une partie reelle de l'Open de Panse :

- Les 12 joueurs sont visibles.
- Les 3 ou 4 tours sont configurables.
- Chaque tour peut avoir son propre parcours.
- Les parcours et les departs sont correctement configures.
- Les coups rendus sont calcules automatiquement.
- Les scores bruts peuvent etre saisis rapidement sur mobile.
- Chaque partie de jeu dispose d'un marqueur.
- Les points Stableford nets sont calcules sans intervention manuelle.
- Le classement individuel live par tour et cumule est clair.
- Les scores bruts sous le par declenchent une notification visible par les participants.
- Les departs recommandes sont visibles et modifiables.
- Les nouveaux handicaps Open de Panse sont calcules automatiquement apres chaque tour.
- L'organisateur peut corriger une erreur.
- Le resultat final est clair et partageable.
