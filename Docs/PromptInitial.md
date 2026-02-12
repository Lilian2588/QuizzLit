**Objectif :**
Je souhaite développer une application mobile de type "Quiz Culturel" en ligne. Je cherche une solution avec un **client léger** et une partie serveur (backend) **facile à implémenter, évolutive et facile à maintenir**.

## 1. Le Périmètre du projet (Scope)

**A. Le MVP (Priorité immédiate - À développer maintenant)**
* **Thème :** Littérature Moderne / Littérature incoutournable.
* **Format du Quiz :** Textuel uniquement (Citation -> Auteur/Œuvre).
* **Niveaux :**
    * *Débutant :* Citations très célèbres ("Être ou ne pas être").
    * *Intermédiaire :* Citations d'auteurs connus, œuvres moins évidentes.
    * *Expert :* Passages obscurs d'œuvres connues.
* **Fonctionnalités :** Système de progression, niveaux, achievements.

**B. Contrainte d'Évolutivité (Pour le futur uniquement)**
* **Contexte :** Une fois le MVP terminé, je compte ajouter un second thème : le **Cinéma**.
* **Nouveau format de données :** Ce futur thème nécessitera de gérer des **Images** (deviner un film à partir d'une scène) et pas seulement du texte.
* **Instruction Clé :** Ne développe PAS cette partie Cinéma maintenant. Cependant, tes choix d'architecture aujourd'hui (choix de la base de données, du backend et du code) doivent être **flexibles**. Je dois pouvoir "brancher" ce nouveau thème et ce nouveau format (images) plus tard sans avoir à tout casser ou refaire l'architecture.

## 2. Tes livrables attendus

### A. Architecture Technique & Stack
Propose-moi l'architecture idéale pour ce projet. Je veux que tu me présentes **2 ou 3 options technologiques différentes** (ex: choix du framework mobile, choix du backend/BaaS vs serveur custom).
* Pour chaque option, détaille les avantages et inconvénients.
* **Critère de choix :** Le backend doit être très simple à mettre en place pour le MVP (texte), mais capable de stocker des fichiers (images) à l'avenir sans migration complexe.

### B. Roadmap d'implémentation
Une fois les options présentées (je ferai mon choix ensuite), donne-moi le processus global pour aboutir au MVP (Littérature) :
1.  Setup de l'environnement.
2.  Création de la structure de données (Base de données) pensée pour être extensible.
3.  Développement du MVP Mobile.
4.  Mise en ligne.

Merci de structurer ta réponse étape par étape pour que je puisse t'aiguiller sur mon choix final.