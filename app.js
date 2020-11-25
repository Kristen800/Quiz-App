const STORE = {
  // 5 or more questions are required
  questions: [//1
    {
      question: "What is considered the world's oldest writing system? ",
      answers: [
        'Aramaic',
        'Cuneiform',
        'Egyptian hieroglyphs',
        'Latin'
      ],
      correctAnswer: 'Cuneiform'
    },
    {//2
      question: "Where was Napoleon Bonaparte born?",
      answers: [
        'Sardinia',
        'Sicily',
        'Cyprus',
        'Corsica'
      ],
      correctAnswer: 'Corsica'
    },
    {//3
      question: "Which rock band formed in 1994 takes its name from a term used by the Allies in the Second World War to describe various UFOs?",
      answers: [
        'Blur',
        'The Foo Fighters',
        'Stone Temple Pilots',
        'Soul Coughing',
      ],
      correctAnswer: 'The Foo Fighters'
      },
      {//4}
      question: "Who was the wife of t'he future Henry VIII's older brother, Arthur?",
      answers: [
        'Catherine of Aragon',
        'Matilda of Scotland',
        'Elizabeth I',
        'Philippa of Hainault',
      ],
      correctAnswer: 'Catherine of Aragon'
      },
      {//5
      question: "What is trepanning?",
      answers: [
        'Bloodletting',
        'Drilling holes in the head',
        'Needling',
        'Electric Shock Therapy',
      ],
      correctAnswer: 'Drilling holes in the head'
      }
  ],
 // quizStarted: false,
  questionNumber: 0,
  score: 0
};
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
//Start Screen
function startScreenHtml(){
  return `
  
  <div id="startScreen">
    <p>A short quiz of random history facts.</p>
    <button type="button" id="start">Start Quiz</button>
  </div>
  `;
  }

function renderQuestion(){
  let question=STORE.questions[STORE.questionNumber]
  let questionHtml=currentQuestionHtml(question)
  $('main').html(questionHtml)
  $('form').submit(function(e){
    e.preventDefault()
    let answer=$('input:radio[name=answer]:checked').val();
  //If no answer is selected
    if(answer === undefined){
      return;
    }
    //Scoring
    if (answer === question.correctAnswer){
      STORE.score++

      $('main').html(`
      <h3>Congratulations!</h3>
      <p>You're answer is correct.</p>
      <button class="nextButton">Next</button>
      `)
    }else{
      $('main').html(`
      <h3>Incorrect</h3>
      <p>The correct answer is ${question.correctAnswer}
      </p>
      <button class="nextButton">Next</button>
      `)
    }
    STORE.questionNumber++
  })
}

function currentQuestionHtml(question){
  let answer=question.answers
  return`
  <header>
    <p>Current Question: ${STORE.questionNumber+1}</p>
    <p>Score: ${STORE.score}</p>
  </header>
  <form>
    <h3 class="Question">${question.question}</h3>
    <label for="answer-0">
      <input type="radio" id="answer-0" name="answer" value="${answer[0]}"required>${answer[0]}
    </label>
     <label for="answer-1">
            <input type="radio" id="answer-1" name="answer" value="${answer[1]}">${answer[1]}
          </label>
        <label for="answer-2">
            <input type="radio" id="answer-2" name="answer" value="${answer[2]}">${answer[2]}
          </label>
        <label for="answer-3">
            <input type="radio" id="answer-3" name="answer" value="${answer[3]}">${answer[3]}
          </label>
        <button class="submitButton" type="submit">
            Submit
          </button>
    </form>  
  `
}


// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

function renderStartScreen(){
  $('main').html(startScreenHtml())
  $('#startScreen').click(function(){
    renderQuestion()
    next()
  })
}

//HTML for results Screen
function restartScreenHtml(){
  return`
  <div class ="quiz-result">
    <p>The End.</p>
    <p>Your score is ${STORE.score}/${STORE.questions.length}</p>
    <button type="button" id="restart">Try Again</button>
  </div>
  `;
}

function clearScore(){
  STORE.score=0;
  STORE.questionNumber=0;
}
// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function next(){
  $('main').on('click','.nextButton',function(){
    let totalNumberofQuestions = STORE.questions.length
    let currentQuestion = STORE.questionNumber
    if (currentQuestion >= totalNumberofQuestions){
      $('main').html(restartScreenHtml())
      $('#restart').click(function(e){
        clearScore();
        renderStartScreen();
      })
    } else{
      renderQuestion()
    }
  })
}

$(renderStartScreen);