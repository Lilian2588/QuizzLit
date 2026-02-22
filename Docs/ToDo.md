**En cours** 

- Page de première connexion pour donner le contexte de cet appli (vocal avec ma tête et des coeurs ig) 
    - photo de moi 
- Quand elle a finit un thème du mode progression une page s'affiche il y'a une photo d'elle contente et un vocal de moi qui dit bien joué blabla
    - faire une deuxième différente pour l'autre thème


**Majeures**

- Questions piège avec photos de reaction
- Rajouter des questions
    - Questions personnalisés et dur et donné des réferences et justifications très complétes pour permettre d'apprendre
- Mise en place du mode progression 
    - Progression : 3 Niveau par theme un sous niveau que les niveau de saisie et   multiples
    ->  3x2x2 = 12 Paliers
    Niveau 1 : 15 questions beginner 
    Niveau 2 : 15 questions intermédiaire 
    Niveau 3  15 questions expertes 15*12 = 180 questions Totales
- Faire un login rapide ou backdoor plus simple pour le contexte
   - Menu admin : Zoé 
   - Menu visiteur  -> ProgressionDashboard :
                        - pas de tête de zoé animated 
                        - Pépette dans la 1ere phrase 
                    -> GameScreen ;
                        - phrase feebacks
                    -> EndScreen 
                        - tête de zoé fin de palier progression
                        - getMessage et getReaction
                    -> Fin d'un thème progression pas de redirection vers la page 



**Mineures**
- Mode stats sur le mode freestyle (accuracy, temps de reponse moyen, par catégorie)
- Enlever le bouton aller à la fin

**Bugs**
- Le palier suivant ne fonctionne pas quand le niveau n'a jamais été réussi 

**Améliorations**

**Terminés**
- changer la photo bravo par la photo de zoe 
- note vocal fin de palier 
- Menu Hamburger amélioré
- "Retour au menu" à la fin d'un niveau de progression retourne a ProgressionDashboard
- Avoir un dashboard progression(Un point de départ : Zoé qu'est un enfant non cultivée et apres une ligne qui se sépare en 2 cotés Cinéma et Littérature, une le dernier achievmeent tu met une zoe dessus pour voir ou elle en est)
- Shuffle les div des questions parce que à l'heure actuelle la bonne réponse c'est toujours la premiere proposition
- Corriger le bouton Aller à la fin
- Corriger le bouton progression dans l'hamburger pour le EndScreen
- Le header dans ProgressionDashboard
- Current_index n'est pas reset à 0 quand on passe un palier 
- Remettre la flèche <- Menu dans ProgressionDashboard
- des que une reponse fausse direct emené au EndScreen 
- quitSession utilise startGame, ca devrait pas



