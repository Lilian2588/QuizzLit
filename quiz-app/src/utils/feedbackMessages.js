export 
const FEEDBACK_MESSAGES = {
  correct: [
    "Tu en as dans la caboche dis donc ! 😱",
    "Excellent Pupuce ! 👨🏻",
    "So strong ! 💪",
    "Slayyyyyy ! 💅",
    "T'es une véritable passionnée toi ! 🫢"
  ],
  incorrect: [
    "Cela arrive même au meilleurEEEEE.... ! 🤗",
    "Raté ! Mais chaque erreur est une leçon ! 🧘",
    "Allez au moins t'as appris 🤓",
    "C'est toi regarde -> 💁🏻‍♀️, bon sinon fais un effort",
    "Bofff Hein ! 🤔"
  ]
}
const FEEDBACK_MESSAGES2 = {
  correct: [
  "Excellente réponse ! Bien joué. 👏",
  "C'est exact ! Impressionnant. ✨",
  "Parfait ! Tu maîtrises le sujet. 🎯",
  "Exactement ! Belle culture générale. 📚",
  "Bravo, c'est la bonne réponse ! 🚀"
  ],
  incorrect: [
  "Presque ! Ce n'était pas la bonne réponse. 🤔",
  "Dommage ! Mais c'est une excellente occasion d'apprendre. 💡",
  "Pas tout à fait. La prochaine sera la bonne ! 💪",
  "Raté pour cette fois, ne te décourage pas ! 🔄",
  "Mauvaise réponse. L'important est de participer... et de retenir ! 🧠"
  ]
}

const FEEDBACK_MESSAGES_SUPER = {
  correct: [
  "Au moins tu me connais un peu...",
  "Bouche bée... bée...😏",
  "Je voulais te piéger mais bon",
  "Sacrée mémoire 🧠",
  "Merci ! 🥹",
  "Comment tu saisssss ?! 😱"
  ],
  incorrect: [
  "Faut qu'on apprenne un peu plus à se connaître je pense",
  "En vrai je pense une question comme ça j'aurais pas su non plus...",
  "Une info de plus à ajouter à ta culture générale ! 👨🏻",
  "Bbbbb !!!!!",
  "Presque presque... mais pas tout à fait 🤓"
  ]
}

export function getRandomFeedback(isCorrect, feedbackSuper, isPerso) {
  const category = isCorrect ? 'correct' : 'incorrect'
  const messages = (isPerso && feedbackSuper) 
    ? FEEDBACK_MESSAGES_SUPER[category] 
    : feedbackSuper 
      ? FEEDBACK_MESSAGES[category] 
      : FEEDBACK_MESSAGES2[category]; 
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}
/*🤗🤔🎉🧘💫📈🎯🔥🌟💪🫢😏💅🤓🧖🏻‍♀️👩🏻🏆⚙️🏠*/  