# Expense Tracker

Un gestionnaire de dépenses personnel construit autour de la programmation orientée objet : enregistrement, catégorisation, filtrage et calcul de totaux, avec persistance des données.

## Fonctionnalités

- Ajout d'une dépense (montant, catégorie, description)
- Liste des dépenses avec suppression individuelle
- Total général affiché et mis à jour dynamiquement
- Filtrage par catégorie avec total recalculé
- Validation du montant (refuse zéro, valeurs vides et négatives)
- Persistance via `localStorage`, avec reconstruction de vraies instances à la lecture

## Notions travaillées

- Classes ES6 (`class`, `constructor`, méthodes d'instance)
- Composition plutôt qu'héritage : un `ExpenseTracker` *gère* des `Expense`, il n'*en est* pas une
- Reconstruction d'instances après désérialisation JSON (`JSON.parse` ne redonne que des données brutes, pas les méthodes de la classe)
- Organisation du code en fichiers séparés (`models.js` pour les classes, `script.js` pour le DOM/événements)

## Aperçu

![Aperçu de l'application](./screenshot.png)

## Démo

[Lien GitHub Pages](https://rickhast.github.io/Master-Javascript-Projects/4_expense_tracker/)

## Technologies

HTML / CSS / JavaScript vanilla (POO) — aucune dépendance externe

## Ce que j'ai appris

Ce projet m'a fait comprendre une limite importante de `JSON.stringify`/`JSON.parse` : la sérialisation ne conserve que les données d'un objet, jamais ses méthodes. Un objet repassé par le `localStorage` n'est donc plus une vraie instance de sa classe — il faut explicitement la reconstruire via le `constructor`. J'ai aussi appris à distinguer héritage et composition : au départ, j'avais fait hériter mon gestionnaire de dépenses de la classe `Expense` elle-même, ce qui n'avait pas de sens sémantique. La bonne relation était que le gestionnaire *possède* des dépenses, pas qu'il *en soit* une.