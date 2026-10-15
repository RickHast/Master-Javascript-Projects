# Quiz Builder

Un créateur et lecteur de quiz personnalisés : on crée ses quiz, on y ajoute des questions à choix multiples, puis on les joue avec un score et un historique par quiz.

## Fonctionnalités

- Création de plusieurs quiz indépendants, chacun avec ses propres questions (2 à 4 propositions, une seule bonne réponse)
- Détection des doublons (titres de quiz et questions)
- Parties avec questions mélangées à chaque fois, une question à la fois
- Retour immédiat après chaque réponse, avec la bonne réponse affichée en cas d'erreur
- Score final en pourcentage et historique des 5 derniers scores par quiz
- Persistance via `localStorage`, suppression d'un quiz avec ses scores
- Design responsive, testé sur mobile

## Notions travaillées

Ce projet met en pratique les dernières notions vues en formation :

- **Destructuring** : dans `currentQuestion`, `const { propoText, isAnswer } = propo` extrait les champs de chaque proposition
- **Rest** : `const { questionText, ...propositions } = question` sépare le texte de la question de ses propositions, que je parcours ensuite avec une boucle (au lieu de quatre blocs identiques)
- **Spread sur tableau** : dans `shuffleQuestionsList`, `[...questions]` copie la liste avant de la mélanger, donc le quiz stocké n'est jamais modifié
- **Spread sur objet** : dans `saveQuizContainer`, `{...question}` copie la question avant de l'enregistrer
- Classes (`Quiz`, `Question`), `localStorage`, manipulation du DOM

## Aperçu

![Aperçu de l'application](./screenshot.png)

## Démo

[Lien GitHub Pages](https://rickhast.github.io/Master-Javascript-Projects/6_quiz_builder/)

## Technologies

HTML / CSS / JavaScript vanilla, sans Webpack ni Babel (inutiles pour un projet de cette taille)

## Ce que j'ai appris

- **Un booléen est copié, pas partagé.** Pour empêcher de répondre deux fois à la même question, mon premier réflexe était un booléen passé à chaque proposition. Chacune en modifiait sa propre copie. Il a fallu un objet partagé par référence, créé une fois par question.
- **Une correction peut en casser une autre.** En retirant un compteur que je croyais inutile, j'ai empêché d'ajouter plus d'une question par quiz. Depuis, je relance tous mes tests après chaque modification.
- **Le design touche aussi à l'accessibilité.** Mes couleurs de bonne et de mauvaise réponse manquaient de contraste sur le fond. Je les ai éclaircies et j'ai ajouté les icônes ✔️ et ❌, pour ne pas dépendre de la couleur seule.
- **Changer le format des données après publication est risqué.** Les anciennes données enregistrées dans le navigateur d'un utilisateur ne correspondent plus au nouveau code.