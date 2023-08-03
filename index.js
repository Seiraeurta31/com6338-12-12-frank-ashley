const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {

    var correctGuess = false
    //Break word and displayWord into char array
    let wordToGuess = this.word.split('')
    let displayWordArray = this.displayWord.split('')

    //Check if the letter is found in the word array
    for(let i=0; i<displayWordArray.length; i++){
      if(letter == wordToGuess[i]){
        //If a match, replace _ with letter in displayWord
        displayWordArray[i] = letter
        correctGuess = true  //mark letter was found
        //If letter is not already in list of correct letters, add it
        if(!this.correctLetters.includes(letter)){
          this.correctLetters.push(letter)
        }  
      }
    } 

    //Letter was not found in word, mark as incorrect letter
    if(!correctGuess){
      this.incorrectLetters.push(letter)
      this.remainingGuesses -- //reduce guess count
    }

    //Convert displayWord back to string
    this.displayWord = displayWordArray.join('')

  }

  // implement the updateScreen function:
  updateScreen() {

    //Access DOM elements
    const wordToGuess = document.getElementById('word-to-guess')
    const incorrectLettersDisplay = document.getElementById('incorrect-letters')
    const remainingGuessDisplay = document.getElementById('remaining-guesses')

    //Update display values to the page
    wordToGuess.textContent = this.displayWord
    incorrectLettersDisplay.textContent = this.incorrectLetters
    remainingGuessDisplay.textContent = this.remainingGuesses

  }

  // implement the isGameOver function:
  isGameOver() {

    var gameOver = false

    //Set game over values based on game status
    if((this.displayWord !== this.word) && (this.remainingGuesses > 0)){
      gameOver = false
    }
    else if((this.displayWord === this.word) && (this.remainingGuesses > 0)){
      gameOver = true
    }
    else if((this.displayWord !== this.word) && (this.remainingGuesses <= 0)){
      gameOver = true
    }
    else if((this.displayWord === this.word) && (this.remainingGuesses <= 0)){
      gameOver = true
    }

    return gameOver
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {

    var gameResult = null

    //Update game result based on game status
    if((this.displayWord === this.word) && (this.remainingGuesses > 0)){
      gameResult = "win"
    }
    else if((this.displayWord !== this.word) && (this.remainingGuesses <= 0)){
      gameResult = "loss"
    }

    return gameResult

  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()