# Weather App

Une application météo qui affiche les conditions actuelles pour une ville recherchée, avec historique des recherches récentes et mode dégradé en cas de connexion instable.

## Fonctionnalités

- Recherche météo par nom de ville (géocodage + météo en temps réel)
- Affichage : température, vitesse et direction du vent, condition météo (texte + emoji), heure de la donnée
- Fond visuel dynamique selon la condition météo (images générées par IA)
- Historique cliquable des 5 dernières recherches
- Sauvegarde de la dernière recherche réussie via `localStorage`
- Mode dégradé : en cas d'échec réseau, affichage de la dernière donnée connue plutôt qu'un écran vide
- Indicateur de chargement pendant les requêtes
- Gestion d'erreur : ville introuvable ou requête échouée → message clair, pas de plantage

## Notions travaillées

- `fetch()` et `async`/`await` pour la communication avec une API externe
- `try`/`catch` pour la gestion d'erreurs réseau
- Chaînage de requêtes asynchrones (géocodage → météo)
- Manipulation d'objets JSON complexes
- `localStorage` pour la persistance de données structurées
- Gestion des cas d'échec en cascade dans une chaîne de fonctions asynchrones

## Aperçu

![Aperçu de l'application](./screenshot.png)

## API utilisée

[Open-Meteo](https://open-meteo.com/) — API météo et géocodage gratuite, sans clé ni inscription requise.

## Technologies

HTML / CSS / JavaScript vanilla — aucune dépendance externe

## Ce que j'ai appris

Ce projet m'a fait comprendre un piège classique de l'asynchrone : quand une fonction `async` échoue silencieusement dans son `catch` sans faire de `return` explicite, elle retourne `undefined` — et ce `undefined` peut se propager dans toute la chaîne d'appels suivante (jusqu'à corrompre des données sauvegardées en cache) si on ne vérifie pas le résultat à chaque étape. J'ai aussi appris à tester mes fonctionnalités réseau avec un débit simulé lent (DevTools → Network → throttling), sans quoi certains bugs de connexion instable restent invisibles en conditions normales.