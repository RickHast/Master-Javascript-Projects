# GitHub User Explorer

Un explorateur de profils GitHub : recherche un utilisateur, affiche ses informations et ses derniers dépôts publics, avec mise en cache des recherches récentes.

## Fonctionnalités

- Recherche d'un profil GitHub par nom d'utilisateur
- Affichage du profil : avatar, nom, bio, nombre de repos publics, followers/following
- Affichage des derniers dépôts publics (nom, description, langage, étoiles)
- Historique des 5 dernières recherches, cliquables pour un accès rapide
- Mise en cache des profils déjà recherchés dans la session, évitant des appels réseau redondants
- Gestion d'erreur claire pour un utilisateur inexistant

## Notions travaillées

Ce projet met volontairement en parallèle plusieurs façons de gérer des requêtes HTTP en JavaScript, pour bien saisir leurs différences :

- **`XMLHttpRequest` avec callbacks** : la récupération du profil utilisateur est faite en XHR pur, avec un callback de succès et un d'erreur passés en paramètres — la manière "classique" de gérer l'asynchrone avant les Promises
- **`fetch` + `async/await`** : la récupération des dépôts utilise l'approche moderne, pour comparer directement la lisibilité face aux callbacks
- **Closures et module pattern** : le système de cache est un module auto-exécuté qui garde son état interne totalement privé — aucune donnée n'est accessible directement de l'extérieur, seulement via les méthodes exposées (`ajouterAuCache`, `lireDuCache`)
- Asynchrone vs synchrone : compréhension pratique de pourquoi le code ne "attend" pas naturellement une réponse réseau sans callback, Promise ou async/await

## Aperçu

![Aperçu de l'application](./screenshot.png)

## Démo

[Lien GitHub Pages](https://rickhast.github.io/Master-Javascript-Projects/5_github_explorer/)

## Technologies

HTML / CSS / JavaScript vanilla — aucune dépendance externe

## Ce que j'ai appris

La plus grande difficulté de ce projet n'était pas technique mais architecturale : faire une vraie closure, pas juste "une fonction qui retourne un objet". Mon premier réflexe a été de mélanger les données privées et les méthodes publiques dans le même objet — ce qui ne cachait rien du tout. La bonne approche sépare clairement le stockage privé (jamais retourné) de l'interface publique (les méthodes seules), les méthodes accédant au stockage uniquement par fermeture lexicale. J'ai aussi compris concrètement pourquoi une Promise lancée en parallèle continue de s'exécuter même si une autre requête échoue avant elle — il faut explicitement décider quoi faire de son résultat, sinon elle s'exécute silencieusement en arrière-plan.