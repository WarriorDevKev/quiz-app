export default function Quiz(questions) {
    this.questions = questions;
    this.score = 0; 
    this.currentIndex = 0;             // need position of current question
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentIndex]
}
// increments every index
Quiz.prototype.nextIndex = function() {     
    this.currentIndex++ 
}
// check if game ended | currentIndex === Length
Quiz.prototype.hasEnded = function() {      
    return this.currentIndex === this.questions.length()
}
// guessing the answer. Compares current answer key to userGuess
Quiz.prototype.guess = function(userGuess) {
    const currentQuestion = this.getCurrentQuestion();
    // take in user input and checking with userGuess
    if (currentQuestion.isCorrect(userGuess)) {
        this.score++;
    }

    this.nextIndex();
}

Quiz.prototype.reset = function() {
    this.score = 0;
    this.currentIndex = 0;
}