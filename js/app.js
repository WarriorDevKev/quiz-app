/* need question and answers. 
1) Create a mechanism to create questions & correct answers and store them
2) need a way to keep track of score
*/
import Question from "./question.js";
import Quiz from "./quiz.js";

const App = (() => {
    // cache the DOM - adding all DOM elements in variables for quiz access
    const quizEl = document.querySelector("_quiz");
    const quizQuestionEl = document.querySelector("_quiz__question");
    const trackerEl = document.querySelector("_quiz__tracker");
    const taglineEl = document.querySelector("_quiz__tagline");
    const choicesEl = document.querySelector("_quiz__choices");
    const progressInnerEl = document.querySelector("_progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");

    const q1 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q2 = new Question(
        "Who is thdde sun God?",
        ["Ra", "Litatle Mermaid", "Zues", "Elmo"],
        1
    )
    const q3 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q4 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q5 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q6 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q7 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q8 = new Question(
        "Who is ___?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )
    const q9 = new Question(
        "Who is the sun God?",
        ["Ra", "Little Mermaid", "Zues", "Elmo"],
        0
    )

    const quiz = new Quiz(q1, q2, q3, q4, q5, q6, q7, q8, q9);
    // all button and event handlers
    const listeners = _ => {
        nextButtonEl.addEventListener("click", function() {
    // when next button is clicked - capture user selection
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked')
            if (selectedRadioElem) {
                const key = selectedRadioElem.getAttribute("id") //get the value of choiceid
                quiz.guess(key);
            }
        })

        restartButtonEl.addEventListener("click", function() {
        // 1. reset the quiz
        quiz.reset()
        // 2. renderAll
        renderAll()
        // 3. restore next button
        nextButtonEl.style.opacity = 1;
        })
    }

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question)
        quizQuestionEl.innerHTML = question;

    }
    const renderChoicesElements = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem, index) => {
            markup += `
            <li class="_quiz__choice">
                <input type="radio" name="choice" class="_quiz__input" id="choices${index}">
                <label for="choice${index}" class="_quiz__label">
                    <i></i>
                    <span>${elem}</span>
                </label>
            </li>
            `
        });

        choicesEl.innerHTML = markup;
    }

    const renderTracker = _ => {
        const index = quiz.currentIndex;
        console.log(index);
        setValue(trackerEl), `${index+1} of ${quiz.questions.length}` // will read starting from number 1
    }

    // create a function that can take in 0-30 and loader will load and change progress bar
    const getPercentage = (num1, num2) => {
        return Math.round((num1/num2) * 100);
    }
    // launch function
    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function() {
            if (width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressInnerEl.style.width = width + `${width}%`;
            }
        }, 3)
    }
    launch(0, 30)

    const renderProgress = _ => {
        // 1. width in %
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
        // 2. launch(0, width)
        launch(0, currentWidth);
    }

    const renderEndScreen = _ => {
        setValue(quizQuestionEl, `Great job!`);
        setValue(taglineEl, `Complete!`);
        setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}`);
        nextButtonEl.style.opacity = 0; // next button gone
        renderProgress();
    }

    // Render ALL html li tags and generate dynamically
    const renderAll = _ => {
        if (quiz.hasEnded()) {
            // renderEndScreen
            renderEndScreen();
        } else {
            // 1. Render the question
            renderQuestion();
            // 2. Render the choices elements
            renderChoicesElements()
            // 3. Render Tracker
            renderTracker();
            // 4. Render Progress
        }
    }

    return {
        renderAll: renderAll,
        listeners: listeners
    }
})();

App.renderAll();
App.listeners();



// -------------------------------------------------
// Reveal Module Pattern - with the help of a closure, we're able to have private variables/methods and public methods

// run an IIFE

/* const App = (function() {
    let counter = 0;

    const doubleCounter = () => {
        counter *= 2;
    }

    const incrementCounter = () => {
        counter++;
    }
    const getCounter = () => {
        return counter;
    }

    const setCounter = (newNum) => {
        counter = newNum;
    }
    // public methods
    return {
        get: getCounter,
        set: setCounter
    }
})()

console.log(App.get()); // 0
App.set(2);
console.log(App.get()); // 2


// -------------------------------------------------
const q1 = new Question(
    "Question 1",
    [2, 4, 5 ,6],
    2
);
const q2 = new Question(
    "Sun God Name",
    ["45", 'Ra', 'Zues', '40'],
    3
);  
// const q3 = new Question();
// const q4 = new Question();
// const q5 = new Question();

const qArray = [q1, q2];

const myQuiz = new Quiz(qArray); // initializing questions + make available on Quiz object;

console.log(myQuiz.getCurrentQuestion())
// button next
// myQuiz.nextIndex());
console.log(myQuiz.getCurrentQuestion())

// const q1 = new Question (
//     "What's 1 + 1?", [2, 3, 7, 4],
//     0
// )
// const q2 = new Question (
//     "Question 2", ["Nope", "Nada", ['Zilch', "Undefined"],
//     "YES"]
// )
// // we can check for each question if user's guess is correct or not
// console.log(q1.isCorrect(0))

*/