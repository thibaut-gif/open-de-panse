# Open de Panse - Redemarrage propre du deploiement

## Situation

Le depot GitHub a ete nettoye ou vide.

Objectif :

- repartir proprement ;
- remettre uniquement les fichiers utiles ;
- publier l'application sans empiler les anciens fichiers ;
- utiliser Netlify comme solution principale si GitHub Pages reste instable.

## Fichiers a garder

Pour faire fonctionner l'application, il faut seulement :

```text
index.html
app.js
styles.css
assets/open-de-panse-logo.png
README.md
```

Les autres fichiers de documentation sont utiles mais non indispensables.

## Fichiers locaux a utiliser

Sur ton Mac, le projet complet est dans :

```text
/Users/tchaumais/Documents/New project
```

La derniere version testable est dans ce ZIP :

```text
/Users/tchaumais/Documents/New project/open-de-panse-update-mobile-hole-entry.zip
```

Cette version contient :

- mode admin ;
- mode participant ;
- connexion Supabase ;
- scores partages ;
- parties creees par l'admin ;
- saisie mobile trou par trou ;
- logo ;
- alertes ;
- classement.

## Option recommandee : Netlify

Netlify est le plus simple pour publier rapidement sans se battre avec GitHub Pages.

### Etape 1 - Aller sur Netlify Drop

Ouvrir :

```text
https://app.netlify.com/drop
```

### Etape 2 - Glisser le ZIP

Glisser ce fichier :

```text
open-de-panse-update-mobile-hole-entry.zip
```

### Etape 3 - Recuperer l'URL

Netlify donne une URL du type :

```text
https://nom-aleatoire.netlify.app
```

Cette URL peut etre ouverte sur mobile.

### Etape 4 - Tester les mots de passe

Participant :

```text
panse2026
```

Administrateur :

```text
panseadmin2026
```

## Option GitHub propre

Si tu veux aussi remettre un depot GitHub propre, fais ceci.

### Etape 1 - Dezipper le ZIP

Sur ton Mac :

1. Double-cliquer sur :

```text
open-de-panse-update-mobile-hole-entry.zip
```

2. Ouvrir le dossier dezippe.

### Etape 2 - Uploader dans GitHub

Dans le depot GitHub vide :

1. Cliquer **Add file**.
2. Cliquer **Upload files**.
3. Glisser seulement :

```text
index.html
app.js
styles.css
assets
README.md
```

4. Cliquer **Commit changes**.

### Etape 3 - Activer GitHub Pages

1. Aller dans **Settings**.
2. Aller dans **Pages**.
3. Selectionner :

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

4. Cliquer **Save**.

### Etape 4 - Attendre le deploiement

Aller dans **Actions**.

Attendre une coche verte sur :

```text
pages build and deployment
```

Si GitHub affiche encore :

```text
The job was not acquired by Runner
```

alors c'est un probleme GitHub Actions. Dans ce cas, utiliser Netlify.

## Supabase

Le projet Supabase est deja configure dans le code avec :

```text
https://pvqzyysapstdozequtkw.supabase.co
```

La table necessaire est :

```text
app_state
```

Elle a deja ete creee via SQL.

## Comment tester le temps reel

1. Ouvrir l'application sur ordinateur.
2. Se connecter en admin :

```text
panseadmin2026
```

3. Creer les parties.
4. Ouvrir l'application sur mobile.
5. Se connecter en participant :

```text
panse2026
```

6. Verifier que les parties apparaissent.
7. Saisir un score.
8. Verifier que le classement et les alertes se mettent a jour.

## Recommendation finale

Pour l'instant :

- utiliser Netlify pour publier ;
- garder GitHub comme sauvegarde du code ;
- ne pas dependre de GitHub Pages tant que les deploiements restent bloques.

