# Open de Panse - Plan de lancement MVP

## Objectif du MVP

Construire une premiere version utilisable pour tester le fonctionnement complet d'une competition Open de Panse :

- 12 joueurs.
- 4 tours precharges pour la prochaine edition.
- 1 parcours reel par tour.
- Stableford net.
- Calcul des coups rendus WHS.
- Classement live individuel.
- Saisie mobile des scores par joueur ou marqueur.
- Notifications dans l'application pour les scores bruts sous le par.
- Mise a jour automatique du handicap Open de Panse apres chaque tour.

## Strategie recommandee

Avancer en deux temps :

1. Prototype local rapide pour valider les ecrans, calculs et workflows.
2. Version connectee avec base de donnees, temps reel et notifications push.

Cela evite de bloquer sur les donnees externes de parcours ou les notifications mobiles avant d'avoir valide le coeur de l'application.

## MVP 1 - Prototype fonctionnel local

### But

Avoir une application utilisable sur ordinateur et mobile, avec des donnees de test, sans authentification ni backend.

### Fonctionnalites

- Creation d'une competition avec 3 ou 4 tours.
- 12 joueurs precharges et modifiables.
- Handicaps Open de Panse modifiables.
- Parcours reels precharges pour les 4 tours connus.
- Selection du depart blanc ou jaune.
- Recommandation provisoire du depart selon handicap et slope.
- Calcul WHS des coups rendus.
- Repartition des coups rendus par trou.
- Saisie des scores bruts trou par trou.
- Calcul Stableford net.
- Classement par tour.
- Classement cumule.
- Detection des birdies, eagles, albatros bruts.
- Notifications visibles dans l'application.
- Calcul du handicap Open de Panse apres validation d'un tour.
- Sauvegarde locale dans le navigateur.

### Limites acceptees

- Pas encore de vraie synchronisation multi-telephones.
- Pas encore de push systeme.
- Pas encore de recherche automatique de parcours sur le web.
- Pas encore de comptes utilisateurs.

## MVP 2 - Version competition

### But

Rendre l'application utilisable pendant une vraie edition de l'Open de Panse.

### Fonctionnalites

- Base de donnees Supabase.
- Synchronisation live des scores et classements.
- Lien public de classement sans mot de passe.
- Acces organisateur.
- Acces marqueur par partie.
- Acces joueur.
- Creation manuelle des parcours reels.
- Gestion des 3 ou 4 tours.
- Historique des handicaps.
- Notifications dans l'application partagees entre participants.
- Preparation des notifications push PWA.

## MVP 3 - Parcours et push avances

### But

Ameliorer l'automatisation et l'experience mobile.

### Fonctionnalites

- Recherche de parcours via source externe si disponible.
- Import ou aide a la saisie des cartes de score.
- Notifications push mobile.
- Installation PWA.
- Mode hors connexion avec resynchronisation.
- Export CSV ou PDF des resultats.

## Stack technique proposee

### Prototype

- React.
- TypeScript.
- Vite.
- CSS responsive mobile-first.
- LocalStorage pour sauvegarde locale.

### Version competition

- React + TypeScript.
- Supabase pour donnees, temps reel et roles simples.
- PWA pour installation mobile.
- Service worker pour notifications push lorsque supporte.

## Ordre de developpement recommande

1. Creer le socle React + TypeScript.
2. Modeliser les donnees : joueurs, tours, parcours, departs, trous, scores.
3. Coder les calculs golf :
   - handicap de jeu WHS.
   - arrondi.
   - coups rendus par trou.
   - Stableford net.
   - scores bruts sous le par.
   - evolution du handicap Open de Panse.
4. Construire les ecrans principaux :
   - tableau de bord.
   - joueurs.
   - tours et parcours.
   - saisie des scores.
   - classement.
   - notifications.
5. Ajouter une sauvegarde locale.
6. Tester le scenario complet sur 4 tours.
7. Brancher Supabase pour passer en temps reel.
8. Ajouter les roles et liens de partage.
9. Ajouter les notifications push.

## Decisions a prendre avant codage

### A trancher maintenant

- Confirmer les noms des 12 joueurs, ou accepter des joueurs de test au depart.
- Choisir si le design doit etre tres sobre type tableau de scoring, ou plus premium/evenementiel.
- Confirmer la combinaison exacte jouee a Castelconturbia.

### Peut attendre

- Source externe pour rechercher les parcours.
- Seuils exacts handicap+slope pour recommander blancs ou jaunes.
- Methode finale de notification push.

## Definition de fini pour le premier prototype

Le prototype est pret si l'on peut :

- Ouvrir l'application sur mobile.
- Voir les 12 joueurs.
- Configurer 4 tours.
- Voir les parcours reels de la competition precharges.
- Saisir des scores sur un tour.
- Voir les points Stableford nets calcules automatiquement.
- Voir le classement live.
- Voir une notification interne quand un joueur fait birdie ou mieux en brut.
- Valider un tour.
- Voir les handicaps Open de Panse mis a jour pour le tour suivant.
