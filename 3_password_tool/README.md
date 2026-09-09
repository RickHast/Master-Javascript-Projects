# Password Tool

Un outil combinant générateur de mots de passe personnalisables et testeur de robustesse en temps réel.

## Fonctionnalités

**Générateur**
- Longueur personnalisable
- Sélection des catégories de caractères : majuscules, minuscules, chiffres, symboles
- Génération respectant strictement les critères cochés
- Copie en un clic dans le presse-papier, avec confirmation visuelle
- Validation des entrées (longueur nulle/vide, aucune catégorie cochée)

**Testeur de robustesse**
- Analyse en temps réel à chaque frappe (pas besoin de valider)
- Évaluation de la longueur (Très courte → Très longue)
- Évaluation de la diversité des caractères (Très faible → Fort)
- Retour visuel coloré selon le niveau de robustesse

## Notions travaillées

- Expressions régulières (`RegExp`) pour analyser la composition d'une chaîne
- `Math.random()` pour la génération contrôlée de caractères
- Événement `input` pour une réactivité en temps réel
- `navigator.clipboard` pour le copier-coller
- Organisation du code en plusieurs fichiers JS (`functions.js` / `script.js`)
- Popup custom en JS/CSS pur (sans `alert()`)

## Aperçu

![Aperçu de l'application](./screenshot.png)

## Démo

[Lien GitHub Pages](https://rickhast.github.io/Master-Javascript-Projects/3_password_tool/)

## Technologies

HTML / CSS / JavaScript vanilla — aucune dépendance externe

## Ce que j'ai appris

Ce projet a mis en évidence un piège classique : `input.value` retourne toujours une chaîne de caractères, même pour un champ `type="number"`. Une comparaison stricte (`===`) avec un nombre littéral échoue silencieusement si on ne compare pas avec le bon type. J'ai aussi appris l'importance du `return` explicite après une validation échouée : sans lui, le code continue de s'exécuter même après avoir affiché une erreur, ce qui peut créer des comportements imprévisibles.