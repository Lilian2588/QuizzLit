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

export function getRandomFeedback(isCorrect, feedbackType = true) {
  const category = isCorrect ? 'correct' : 'incorrect'
  const messages = feedbackType === true ? FEEDBACK_MESSAGES[category] : FEEDBACK_MESSAGES2[category]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}
/*🤗🤔🎉🧘💫📈🎯🔥🌟💪🫢😏💅🤓🧖🏻‍♀️👩🏻🏆⚙️🏠*/  