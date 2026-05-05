# Open de Panse - Mise en ligne gratuite

## Objectif

Mettre le MVP Open de Panse en ligne gratuitement avec :

- GitHub gratuit pour stocker le code.
- Vercel gratuit pour heberger l'application.
- Mot de passe unique `panse2026`.

## Cout

```text
0 EUR / mois
```

Tant que l'application reste statique, Vercel suffit.

## Limite de cette version

Cette mise en ligne permet a tout le monde d'ouvrir l'application.

Mais les donnees restent stockees dans le navigateur de chaque personne.

Donc :

- chaque personne peut tester l'application ;
- l'acces est limite par mot de passe ;
- les scores ne sont pas encore synchronises entre les telephones.

Pour synchroniser les scores live entre tout le monde, il faudra brancher Supabase Free dans une etape suivante.

## Etape 1 - Creer un compte GitHub

1. Aller sur https://github.com.
2. Creer un compte gratuit ou se connecter.
3. Creer un nouveau repository.
4. Nom conseille :

```text
open-de-panse
```

5. Laisser le repository en prive si tu veux.

## Etape 2 - Envoyer le projet sur GitHub

Depuis le dossier du projet, lancer :

```bash
git add .
git commit -m "Initial MVP Open de Panse"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/open-de-panse.git
git push -u origin main
```

Remplacer `TON-COMPTE` par ton identifiant GitHub.

## Etape 3 - Creer un compte Vercel

1. Aller sur https://vercel.com.
2. Creer un compte gratuit.
3. Choisir la connexion avec GitHub.
4. Autoriser Vercel a acceder au repository `open-de-panse`.

## Etape 4 - Deployer

1. Dans Vercel, cliquer sur "Add New Project".
2. Selectionner `open-de-panse`.
3. Garder les reglages par defaut.
4. Cliquer sur "Deploy".

Vercel donnera une URL du type :

```text
https://open-de-panse.vercel.app
```

## Etape 5 - Tester

1. Ouvrir l'URL Vercel.
2. Entrer le mot de passe :

```text
panse2026
```

3. Tester depuis un telephone.
4. Partager l'URL uniquement avec les participants.

## Etape suivante possible

Quand la version statique est en ligne, l'etape suivante sera :

- Creer un compte Supabase Free.
- Ajouter une base partagee.
- Synchroniser les scores entre telephones.

Cela peut encore rester a 0 EUR / mois au depart.

