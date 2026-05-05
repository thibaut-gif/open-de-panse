# Open de Panse

MVP web mobile-first pour suivre une competition amicale de golf en Stableford net.

## Acces

- Participant : `panse2026`
- Administrateur : `panseadmin2026`

L'administrateur peut creer les parties et modifier les handicaps.

## Fonctionnalites actuelles

- Mot de passe unique : `panse2026`.
- 12 joueurs precharges.
- 4 tours precharges.
- Parties de jeu par tour.
- Saisie des scores par joueur ou par partie.
- Calcul WHS des coups rendus.
- Calcul Stableford net.
- Classement par tour et cumule.
- Notifications internes apres validation d'un trou pour birdie, eagle, albatros ou mieux.
- Mise a jour du handicap Open de Panse apres validation d'un tour.

## Lancer en local

```bash
python3 -m http.server 5173
```

Puis ouvrir :

```text
http://127.0.0.1:5173/
```

## Mise en ligne gratuite

Voir [MISE_EN_LIGNE_GRATUITE.md](./MISE_EN_LIGNE_GRATUITE.md).

## Limite actuelle

Cette version stocke les donnees dans le navigateur.

Pour synchroniser les scores entre plusieurs telephones, il faudra ajouter Supabase ou une autre base partagee.
