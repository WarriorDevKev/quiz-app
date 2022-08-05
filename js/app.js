import Question from "./question.js";
import Quiz from "./quiz.js"

const App = (() => {
    // cache the DOM -  adding all DOM elements in variables for quiz access
    const quizEl = document.querySelector("._quiz");
    const quizQuestionEl = document.querySelector("._quiz__question");
    const trackerEl = document.querySelector("._quiz__tracker");
    const taglineEl = document.querySelector("._quiz__tagline");
    const choicesEl = document.querySelector("._quiz__choices");
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");

    // ************** QUESTIONS ************** */
    const q1 = new Question(
        "How do you find the minimum of x and y using JavaScript?",
        ["Math.min(xy)", "math.minimum(x,y)", "x + y", "Math.min(x,y)"],
        3
    )
    const q2 = new Question(
        "When was JavaScript created?",
        ["June 1995", "May 1995", "July 1885", "Sep 1996"],
        1
    )
    const q3 = new Question(
        "1 Terabyte (Tb) is the equivalent to how many gb? ",
        ["1,024 mb", "1,000 gb", "1 kilo", "1,024 gb"],
        3
    )
    const q4 = new Question(
        "What is a Runtime Environment?",
        ["JavaScript variable", "where a program is executed", 
        "A place to go jogging...", "an object"],
        1
    )
    const q5 = new Question(
        "console.log(typeof []) would return what?",
        ["Array", "Object", "null", "a list"],
        1
    )
    const q6 = new Question(
        "A Programmer and an Architect essentially have the same role",
        ["False", "True"],
        0
    )
    const q7 = new Question(
        "Where is the correct place to insert a JavaScript tag in HTML?",
        ["Top of body tag", "Both the head & body tags", "href link",
        "script tag at the end of body"],
        3
    )

    const quiz = new Quiz([q1, q2, q3, q4, q5, q6, q7]);

    // all buttons and event handlers
    const listeners = _ => {
        nextButtonEl.addEventListener("click", function () {
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
            if (selectedRadioElem) {
                const key = Number(selectedRadioElem.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();
            }
        })

        restartButtonEl.addEventListener("click", function () {
            // 1. reset the quiz
            quiz.reset();
            // 2. renderAll
            renderAll();
            // 3. restore the next button
            nextButtonEl.style.opacity = 1;
        })
    }

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question);
    }

    const renderChoicesElements = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem, index) => {
            markup += `
        <li class="_quiz__choice">
          <input type="radio" name="choice" class="_quiz__input" data-order="${index}" id="choice${index}">
          <label for="choice${index}" class="_quiz__label">
            <i></i>
            <span>${elem}</span>
          </label>
        </li>
      `
        });

        setValue(choicesEl, markup);
    }

    const renderTracker = _ => {
        const index = quiz.currentIndex;
        setValue(trackerEl, `${index+1} of ${quiz.questions.length}`) // will read starting from number 1
    }
    // takes in nums then loads and change progress bar
    const getPercentage = (num1, num2) => {
        return Math.round((num1 / num2) * 100);
    }
    // launch function()
    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function () {
            if (width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressInnerEl.style.width = width + "%";
            }
        }, 3)
    }

    const renderProgress = _ => {
        // 1. width in %
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
        // 2. launch(0, width)
        launch(0, currentWidth);
    }

    const renderEndScreen = _ => {
        setValue(quizQuestionEl, `Great Job!`);
        setValue(taglineEl, `Complete!`);
        setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
        nextButtonEl.style.opacity = 0; // next button gone
        renderProgress();
    }

    // Render ALL html li tags and generate dynamically
    const renderAll = _ => {
        if (quiz.hasEnded()) {
            // renderEndScreen
            renderEndScreen();
        } else {
            // 1. render the question
            renderQuestion();
            // 2. Render the choices elements
            renderChoicesElements()
            // 3. Render Tracker
            renderTracker();
            // 4. Render Progress
            renderProgress();
        }
    }

    return {
        renderAll: renderAll,
        listeners: listeners
    }
})();

App.renderAll();
App.listeners();