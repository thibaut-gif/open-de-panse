# Open de Panse - Passage en temps reel avec administrateur

## Probleme identifie apres test

La version actuelle fonctionne comme prototype local/statique.

Limite :

- Chaque navigateur garde ses propres donnees.
- Plusieurs personnes peuvent creer des parties differentes.
- Les scores ne sont pas partages entre tous les telephones.
- Les alertes ne peuvent pas apparaitre chez tout le monde si elles ne sont pas stockees dans une base commune.

Pour une vraie competition, il faut une base partagee et une synchronisation temps reel.

## Nouvelle organisation cible

### Profil administrateur

L'administrateur peut :

- Creer et modifier les parties.
- Assigner les joueurs aux parties.
- Designer les marqueurs.
- Corriger les scores.
- Valider les trous.
- Valider les tours.
- Modifier les handicaps de depart.

### Profil participant

Le participant peut :

- Voir les parties creees par l'administrateur.
- Voir les joueurs de sa partie.
- Saisir les scores de sa partie si besoin.
- Consulter le classement live.
- Voir les alertes sur la page d'accueil et dans l'onglet Alertes.

### Acces

Option simple :

- Un mot de passe administrateur.
- Un mot de passe participant.

Exemple :

- Admin : `panse-admin-2026`
- Participant : `panse2026`

Point important :

- Avec une application statique seule, ces mots de passe ne sont pas une securite forte.
- Avec Supabase, on peut mieux controler qui peut modifier quoi.

## Fonctionnement temps reel

Supabase devient la base commune.

Toutes les personnes connectees lisent les memes donnees :

- Joueurs.
- Parcours.
- Tours.
- Parties.
- Scores.
- Trous valides.
- Notifications.
- Classements.

Quand un marqueur valide un trou :

1. Les scores du trou sont sauvegardes dans Supabase.
2. L'application detecte les birdies/eagles/albatros bruts.
3. Une notification est creee dans Supabase.
4. Tous les telephones recoivent la notification en temps reel.
5. La page d'accueil affiche l'alerte dans le bloc "Dernieres alertes".
6. L'onglet Alertes garde l'historique.

## Donnees Supabase necessaires

### players

- id
- name
- handicap

### rounds

- id
- number
- date
- course_id
- status

### courses

- id
- club
- name
- location
- tees
- holes

### groups

- id
- round_id
- name
- marker_player_id

### group_players

- group_id
- player_id
- position

### scores

- round_id
- player_id
- hole_number
- gross
- updated_at

### validated_holes

- round_id
- group_id
- hole_number
- validated_at

### notifications

- id
- round_id
- player_id
- hole_number
- type
- message
- created_at

## Priorite de developpement

### Etape 1 - Ajouter Supabase Free

- Creer un projet Supabase gratuit.
- Creer les tables.
- Mettre les donnees actuelles dans Supabase.
- Brancher l'application sur Supabase.

### Etape 2 - Ajouter les profils

- Ecran de connexion avec choix implicite selon mot de passe.
- Admin : peut modifier parties, joueurs, handicaps.
- Participant : voit les parties, saisit les scores, consulte.

### Etape 3 - Synchronisation live

- Scores en temps reel.
- Classement en temps reel.
- Alertes en temps reel sur accueil et onglet Alertes.

### Etape 4 - Verrouillage simple

- Eviter que plusieurs personnes modifient la structure des parties.
- Garder la saisie des scores ouverte aux participants.
- Garder les corrections possibles pour l'admin.

## Conclusion

Pour repondre au besoin reel de competition, la prochaine etape n'est plus seulement du design ou de l'interface.

Il faut brancher Supabase, meme en plan gratuit, afin que toutes les personnes voient la meme competition en temps reel.

