const STORE = [
    {
        id: 1,
        question: 'What large hairy cryptid is commonly associated with the Pacific Northwest of the United States?',
        answers: [
            'Loch Ness monster',
            'Bigfoot',
            'The Mothman',
            'The Chupacabra'
        ],
        correctAnswer:
        'Bigfoot'
    },
    {
        id: 2,
        question: 'What strange phenomenon is typical of the Chupacabra?',
        answers: [
            'Vomiting blue and white flames',
            'Kidnapping wandering children at night',
            'Drinking the blood of livestock',
            'Leaving large footprints in the snow'
        ],
        correctAnswer:
        'Drinking the blood of livestock'
    },
    {
        id: 3,
        question: 'Which creature was described by witnesses as being human shaped, with clawed hands and an incredible leaping ability?',
        answers: [
            'Mothman',
            'Yeti',
            'Spring-heeled Jack',
            'Jackalope'
        ],
        correctAnswer:
        'Spring-heeled Jack'
    },
    {
        id: 4,
        question: 'Mothman sightings are connected to what infrastructure disaster?',
        answers: [
            'Hyatt Regency walkway collapse',
            'Buffalo Creek flood',
            'Johnstown Flood',
            'The Silver Bridge collapse'
        ],
        correctAnswer:
        'The Silver Bridge collapse'

    },
    {
        id: 5,
        question: 'What cryptid is part of Native American folklore?',
        answers: [
            'The Wendigo',
            'Jersey Devil',
            'Yeti',
            'Bigfoot'

        ],
        correctAnswer:
        'The Wendigo'
    },
    {
        id: 6,
        question: 'What is the likely origin of the legend of the Jersey Devil',
        answers: [
            'Rabbits infected with the Shope papilloma virus',
            'Misidentification of known animals',
            'Colonial religio-political disputes',
            'Dogs afflicted with mange'
        ],
        correctAnswer:
        'Colonial religio-political disputes'
        
    },
    {
        id: 7,
        question: 'According to legend, what would happen if you were to touch a Mongolian death worm?',
        answers: [
            'Nothing, it is harmless',
            'Instant death',
            'Any skin that comes into contact will bubble and burn',
            'All of your body hair will fall off'
        ],
        correctAnswer:
        'Instant death'
    }

];

let score = 0;
let questionNumber = 0;
var questionIdArray = [];

let currentQuestion = STORE[generateRandomNum(STORE.length)];

function resetStats() {
    questionIdArray = [];
    score = 0;
    questionNumber = 0;
    $('.score-number').text(0);
    $('.question-number').text(0);
  }

function startQuiz() {
    $(".startbutton").on('click', function (event){
        $(".start-container").hide();
        $(".question-answer-box").show();
        $(".question-score-counter").show();
        generateQuestion();
        questionIdArray.push(currentQuestion.id);
        updateQuestionNumber();
    }) 
}

function questionForm(item) {
    $(".question-answer-box").html(`<form class="question-content">
    <fieldset>
       <legend class="questionText" id="${item.id}">${item.question}</legend>
       <label class="possible-answer"><input class="radio" type="radio" value="${item.answers[0]}" name="answer" required="">${item.answers[0]}</label>
       <label class="possible-answer"><input class="radio" type="radio" value="${item.answers[1]}" name="answer" required="">${item.answers[1]}</label>
       <label class="possible-answer"><input class="radio" type="radio" value="${item.answers[2]}" name="answer" required="">${item.answers[2]}</label>
       <label class="possible-answer"><input class="radio" type="radio" value="${item.answers[3]}" name="answer" required="">${item.answers[3]}</label>
       <button type="submit" class="submit-button">Submit</button>
    </fieldset>
    </form>`);
}

function generateQuestion() {
    questionForm(currentQuestion);
}


function thisQuestion(id) {
  return STORE.find(questionObj => questionObj.id == id)     
}

function submitQuestion() {
    // run this when is the submit button is pressed
  $('.question-answer-box').on('submit', function (event){
     event.preventDefault();
     $(".question-answer-box").hide();
     $(".response-box").show();
     let answer = $('input:checked').val();
     if (currentQuestion.correctAnswer === answer) {
         rightAnswer();
     } else {
         wrongAnswer();
     }
    
    });
}

function updateQuestionNumber() {
    questionNumber++;
    $('.question-number').text(questionNumber);
}

function updateScore() {
    score++;
    $(".score-number").text(score);
}

function nextQuestion() {
 $(".response-box").on('click', '.next-button', function() {
    setNextQuestion();
    generateQuestion();
    $(".question-answer-box").show();
    $(".response-box").hide();
    updateQuestionNumber();
 });
}

function generateRandomNum(len) {
    return Math.floor(Math.random() * len);
}

function setNextQuestion() {
    if (questionIdArray.length == STORE.length) {
        endScore();   
    }
    const randomNum = generateRandomNum(STORE.length)
    const possibleQuestion = STORE[randomNum];
    if (questionIdArray.includes(possibleQuestion.id)) {
        setNextQuestion()
    } else {
        currentQuestion = possibleQuestion;
        questionIdArray.push(currentQuestion.id)
        console.log(questionIdArray)
    }
}

function wrongAnswer() {
    $(".response-box").html(
        `<h2>Sorry...that's the wrong answer</h2>
        <p>The correct answer is ${currentQuestion.correctAnswer}</p>
        <button type="button" class="next-button button">Next</button>`
    );
}

function rightAnswer() {
    $(".response-box").html(
        `<h2>You got the right answer!</h2>
        <button type="button" class="next-button button">Next</button>`
    );
    updateScore() ;
}

function endScore() {
    $(".response-box").hide();
    $('.final-score').show();


    const best = [
        'You did great! You know everything about Cryptids.'
    ];

    const okay = [
        'You are on the right track to being a Cryptologist.'
    ];

    const bad = [
        'You need to research more about Cryptids.'
    ];

    if (score >= 6) {
        array = best;
    } else if (score < 6 && score > 3) {
        array = okay;
    } else {
        array = bad;
    }
    return $(".final-score").html(
       `<h2>Your score is ${score} out of 7</h2>
        <h3>${array[0]}</h3>
        <button type="submit" class="restart-button">Restart</button>`
    )

}

function restartQuiz() {
    $('.final-score').on('click', '.restart-button', function () {
        event.preventDefault();
        resetStats();
        $('.final-score').hide();
        $('.start-container').show();
        $(".question-score-counter").hide();
        

    })
}

$(startQuiz);
$(submitQuestion);
$(nextQuestion);
$(restartQuiz);


//create response box
//create end of quiz
//create restart button
//create score counter