# Open de Panse - Estimation budgetaire

## Hypotheses

- 12 joueurs.
- 3 a 4 tours.
- Une competition par an au depart.
- Acces par mot de passe unique.
- Pas de roles differencies.
- Classement live partage entre telephones.
- Saisie par partie.
- Recherche de parcours souhaitee pour de futures editions.

## Cout technique mensuel

### Option MVP partage

Cette option suffit pour une competition amicale.

- Vercel Hobby : 0 USD / mois.
- Supabase Free : 0 USD / mois.
- Nom de domaine optionnel : environ 10 a 20 EUR / an.

Budget technique estime :

- 0 EUR / mois hors nom de domaine.
- 10 a 20 EUR / an si nom de domaine personnalise.

Limite :

- Le plan gratuit Supabase est adapte au test et a un petit usage, mais peut avoir des limites ou contraintes de disponibilite.

### Option production confortable

Cette option est plus prudente si l'application doit etre fiable pendant l'evenement.

- Vercel Hobby ou Pro : 0 a 20 USD / mois.
- Supabase Pro : environ 25 USD / mois.
- Nom de domaine : environ 10 a 20 EUR / an.

Budget technique estime :

- 25 a 45 USD / mois pendant les mois d'utilisation active.
- 10 a 20 EUR / an pour le nom de domaine.

Recommandation :

- Utiliser Supabase Pro au moins pendant la periode de competition.
- Vercel Hobby peut suffire tant que le projet reste simple.

## Budget de developpement

### Lot 1 - Mise en production simple

Objectif :

- Publier l'application.
- Ajouter Supabase.
- Synchroniser scores, joueurs, parties, notifications et classements.
- Garder un mot de passe unique.

Estimation :

- 3 a 5 jours de travail.

Budget indicatif selon taux journalier :

- A 500 EUR / jour : 1500 a 2500 EUR.
- A 700 EUR / jour : 2100 a 3500 EUR.
- A 900 EUR / jour : 2700 a 4500 EUR.

### Lot 2 - Version competition robuste

Objectif :

- Ameliorer la saisie mobile.
- Ajouter tests des calculs golf.
- Verrouiller les validations de trous.
- Gerer les corrections proprement.
- Preparations avant competition.

Estimation :

- 5 a 8 jours de travail.

Budget indicatif :

- A 500 EUR / jour : 2500 a 4000 EUR.
- A 700 EUR / jour : 3500 a 5600 EUR.
- A 900 EUR / jour : 4500 a 7200 EUR.

### Lot 3 - Recherche de parcours

Objectif :

- Ajouter un moteur de recherche de parcours.
- Rechercher par club, ville, pays, region.
- Importer automatiquement pars, stroke indexes, departs, distances, slopes et course ratings quand la source le permet.
- Sauvegarder les parcours importes dans la base Open de Panse.
- Permettre la correction manuelle des donnees.

Estimation :

- 4 a 8 jours si une API exploitable est choisie.
- 8 a 15 jours si plusieurs sources ou imports semi-manuels sont necessaires.

Budget indicatif :

- Version simple avec API : 2000 a 7200 EUR selon taux et complexite.
- Version avancee multi-sources : 4000 a 13500 EUR selon taux et complexite.

## Recherche de parcours

Oui, c'est possible.

Approche recommandee :

1. Ajouter un champ de recherche.
2. Interroger une API de parcours de golf.
3. Afficher les resultats.
4. Selectionner un parcours.
5. Importer la carte de score.
6. Permettre la correction manuelle avant validation.
7. Sauvegarder le parcours dans la base Open de Panse.

## Sources de donnees possibles

### API specialisee

Golf API annonce une base de plus de 42 000 parcours, avec :

- Donnees de club.
- Cartes de score.
- Pars.
- Stroke indexes.
- Tees.
- Distances.
- Slope.
- Course rating.

Point a verifier :

- Le prix et les conditions d'utilisation ne sont pas publics de maniere complete.
- Il faudra les contacter ou ouvrir un compte pour connaitre le cout reel.

### Import manuel assiste

Alternative plus economique :

- L'organisateur cree un parcours.
- Il saisit ou colle les 18 pars.
- Il saisit les 18 stroke indexes.
- Il ajoute les departs, slopes et course ratings.
- Le parcours est sauvegarde pour les editions suivantes.

Cette option est plus lente a l'usage, mais beaucoup moins risquee juridiquement et techniquement.

## Recommandation

Pour l'Open de Panse, la meilleure trajectoire est :

1. Passer d'abord en production avec Supabase et mot de passe unique.
2. Ajouter une creation manuelle de parcours propre et rapide.
3. Ajouter ensuite la recherche automatique via API si le budget et les conditions d'utilisation sont acceptables.

