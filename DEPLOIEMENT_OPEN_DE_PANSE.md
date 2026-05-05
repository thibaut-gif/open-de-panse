# Open de Panse - Mise en ligne et acces participants

## Objectif

Mettre l'application Open de Panse en ligne pour que les participants puissent y acceder depuis leur telephone avec un mot de passe unique.

Mots de passe retenus :

```text
Participant : panse2026
Administrateur : panseadmin2026
```

L'application accepte aussi `panse 2026`, avec ou sans majuscules.

## Point important

La version actuelle est un prototype statique.

Cela veut dire :

- Chaque telephone peut ouvrir l'application.
- Le mot de passe limite l'acces.
- Mais les scores sont encore sauvegardes localement dans chaque navigateur.

Pour que tous les participants voient les memes scores en direct, il faut ajouter une base partagee, par exemple Supabase.

## Etape 1 - Mettre le prototype en ligne

Pour une premiere mise en ligne simple, Vercel ou Netlify sont les meilleurs choix.

### Option recommandee : Vercel

1. Creer un compte sur https://vercel.com.
2. Connecter le compte GitHub.
3. Mettre le projet Open de Panse sur GitHub.
4. Dans Vercel, cliquer sur "Add New Project".
5. Selectionner le repository Open de Panse.
6. Garder les reglages par defaut pour un site statique.
7. Deployer.

Vercel donnera une adresse du type :

```text
https://open-de-panse.vercel.app
```

### Alternative : Netlify

1. Creer un compte sur https://www.netlify.com.
2. Connecter GitHub.
3. Importer le repository.
4. Deployer le site.

Netlify donnera une adresse du type :

```text
https://open-de-panse.netlify.app
```

### Fly.io

Fly.io est plutot utile quand l'application a un vrai serveur backend.

Pour la version statique actuelle, Vercel ou Netlify sont plus simples.

## Etape 2 - Limiter l'acces

La version actuelle contient un ecran de connexion avec mot de passe unique.

Principe :

- Tout le monde utilise le meme mot de passe.
- Il n'y a pas de roles differents.
- Tout participant connecte peut consulter et modifier les donnees visibles dans l'application.

Limite :

- Ce mot de passe est une protection simple, adaptee a une competition amicale.
- Ce n'est pas une securite forte pour des donnees sensibles.

## Etape 3 - Passer en vraie version multi-telephones

Pour que l'application fonctionne vraiment pendant la competition, il faut remplacer la sauvegarde locale par une base partagee.

### Solution recommandee : Supabase

Supabase permettra :

- Scores partages entre tous les telephones.
- Classement live.
- Parties de jeu partagees.
- Joueurs et handicaps communs.
- Notifications visibles par tous.
- Mot de passe unique verifie cote base ou cote serveur.

### Donnees a stocker dans Supabase

- Joueurs.
- Tours.
- Parcours.
- Parties.
- Scores.
- Trous valides.
- Notifications.
- Handicaps Open de Panse.

## Plan de passage en production

### Phase A - Mise en ligne rapide

- Mettre le site statique sur Vercel.
- Garder le mot de passe unique.
- Utiliser la version comme demo partageable.

### Phase B - Donnees partagees

- Creer un projet Supabase.
- Ajouter les tables.
- Brancher l'application sur Supabase.
- Tester la saisie simultanee depuis plusieurs telephones.

### Phase C - Competition

- Charger les vrais parcours definitifs.
- Verifier les parties de chaque tour.
- Tester avec 2 ou 3 participants.
- Envoyer le lien et le mot de passe a tout le groupe.

## Decision recommandee

Pour l'Open de Panse, la meilleure suite est :

1. Publier rapidement une demo sur Vercel.
2. Ajouter Supabase avant de l'utiliser en competition.
3. Garder un mot de passe unique pour tous les participants.
