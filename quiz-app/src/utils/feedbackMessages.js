export const FEEDBACK_MESSAGES = {
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

export function getRandomFeedback(isCorrect) {
  const category = isCorrect ? 'correct' : 'incorrect'
  const messages = FEEDBACK_MESSAGES[category]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}
/*🤗🤔🎉🧘💫📈🎯🔥🌟💪🫢💅🤓*/  