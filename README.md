# 𝒬𝓊𝒾𝔃𝔃𝓛𝒾𝓉 - L'Application de Quiz Culturel & Personnalisé

Bienvenue sur **QuizzLit**, une Web App (PWA) interactive conçue pour tester ses connaissances sur le Cinéma et la Littérature... avec un secret bien gardé ! 🤫

Ce projet a été développé avec une approche **Mobile-First** et intègre un moteur de jeu complet gérant différents types de questions, couplé à un backend sécurisé.

## ✨ Fonctionnalités Principales

- **🎮 Modes de jeu variés :** - **QCM :** Choix multiples classiques.
  - **INPUT :** Saisie au clavier avec un algorithme permissif (tolérance aux fautes de frappe, accents, et majuscules).
- **📈 Niveaux de difficulté :** Beginner, Intermediate, Expert.
- **💡 Mode "Le Saviez-vous ?" :** Affichage d'anecdotes et d'explications détaillées après chaque réponse.
- **📱 PWA & Mobile-First :** Interface fluide (Tailwind CSS) optimisée pour le pouce, installable directement sur l'écran d'accueil d'un smartphone.
- **🔐 Le Mode "Secret" :** Un portail caché accessible via un mot de passe (Backdoor UI) permettant de débloquer un thème "PERSO" 100% personnalisé (idéal pour les Super Users).

## 🛠️ Stack Technique

- **Frontend :** React.js + Vite
- **Styling :** Tailwind CSS
- **Backend & Database :** Supabase (PostgreSQL)
- **Stockage Médias :** Supabase Storage (Buckets Publics avec offuscation des noms de fichiers)
- **Hébergement :** Vercel (CI/CD depuis GitHub)

## 🔒 Focus Sécurité : Architecture RLS & RPC

L'une des particularités techniques de ce projet est la sécurisation des questions secrètes (thème `PERSO`). Pour éviter qu'un utilisateur n'inspecte les requêtes réseau pour tricher, l'architecture suivante a été mise en place sur Supabase :

1. **Row Level Security (RLS) :** La table `questions` est verrouillée par défaut.
2. **Remote Procedure Call (RPC) :** Une fonction SQL qui reçoit le mot de passe saisi sur le frontend, le compare avec la base de données, et filtre dynamiquement les questions retournées. Si le mot de passe est absent ou faux, les données sensibles ne quittent jamais le serveur.

A terme hasher les réponses aux questions pour éviter qu'elles soient visibles par le user dans la console.

## 🚀 Installation 

Si vous souhaitez jouer à QuizzLit

### 1. Rendez-vous sur https://quizzlit.vercel.app/
- Vous accéderez à l'app web en ligne ou vous pourrez jouer autant que vous voulez 

### 2. Cloner le dépôt en local
```bash
git clone [https://github.com/Lilian2588/QuizzLit.git](https://github.com/Lilian2588/QuizzLit.git)
cd QuizzLit\quiz-app
npm run dev
```
