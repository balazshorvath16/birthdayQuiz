jQuery(function($){

	$(document).ready(function(){
		
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
        
          $('.card_container').each(function() {
            var children = $(this).children().toArray();
            shuffle(children);
            $(this).append(children);
          });
        
            $('.card').click(function() {
                $(this).toggleClass('flipped card_fix');
                var classCount = $('.flipped').length;
                console.log('The "example-class" appears ' + classCount + ' times.');
                if(classCount >= 20) {
                    $('.card').css('pointer-events', 'none');
                }
            });
        
            // console.log('The "example-class" appears ' + classCount + ' times.');
	});
	
});


// v1
const answerButtonsContainer = document.getElementById('answer-buttons');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.btn');
const scoreDisplay = document.getElementById('score');
const timerElement = document.getElementById('timer');
const summarized_sore = document.getElementById('summ_score');
const prizeSection = document.getElementById('prize_section');
const quizMainCont = document.getElementById('quiz_main_cont');


var showQuestionsBtn = document.getElementById('show_question');

function showQuestion() {
        quizMainCont.style.display = "block";
        showQuestionsBtn.style.display = "none";
        clearInterval(timerInterval);
        startTimer();
       
        
  };

const questions = [
    {
        question: 'Mikor születettem?',
        answers: ['1996-04-21', '1996-04-12', '1996-04-20', '1996-04-18'],
        correct: 0
    },
    {
        question: 'Melyik a kedvenc sorozatom?',
        answers: ['Taboo', 'Family Guy', 'Agymenők', 'Tóth János'],
        correct: 2
    },
    {
        question: 'Melyik a kedvenc video játékom?',
        answers: ['Dark Souls', 'Elden Ring', 'Rainbow 6 Siege', 'Rocket League'],
        correct: 1
    },
    {
        question: 'Melyik a kedvenc ételem?',
        answers: ['Hamburger', 'Bolognai spagetti', 'Pizza', 'Chili Cheese Burger'],
        correct: 1
    },
    {
        question: 'Mikor van az évfordulónk?',
        answers: ['2018-10-20', '2019-10-22', '2018-10-22', '2019-10-20'],
        correct: 2
    },
    {
        question: 'Melyik a kedvenc márkám?',
        answers: ['Adidas', 'Under Armour', 'DRK', 'Nike'],
        correct: 3
    },
    {
        question: 'Mikor vittem haza Picúrt?',
        answers: ['2022-02-18', '2022-02-12', '2022-02-10', '2022-02-16'],
        correct: 0
    },
    {
        question: 'Melyik a kedvenc zenekarom?',
        answers: ['Tool', 'Slipknot', 'Rammstein', 'Children of Bodom'],
        correct: 0
    },
    {
        question: 'Hányas számú mezben játszottam, amikor fociztam?',
        answers: ['10', '16', '13', '18'],
        correct: 2
    },
    {
        question: 'Melyik évben érettségiztem?',
        answers: ['2012', '2013', '2014', '2015'],
        correct: 2
    },
    {
        question: 'Melyik egyetemre vettek fel?',
        answers: ['Eszterházy Károly Katolikus Egyetem', 'Eötvös Loránd Tudományegyetem', 'Károli Gáspár Református Egyetem', 'Debreceni Református Hittudományi Egyetem'],
        correct: 0
    },
    {
        question: 'Milyen telefonom volt, amikor megismerkedtünk?',
        answers: ['iPhone 16', 'iPhone 6 Plus', 'iPhone 6S Plus', 'iPhone 8 Plus'],
        correct: 2
    },
    {
        question: 'Melyik a kedvenc energiaitalom?',
        answers: ['Hell', 'Red Bull', 'Bomba', 'Monster'],
        correct: 3
    },
    {
        question: 'Melyik volt az első autóm?',
        answers: ['Opel Astra', 'Opel Corsa', 'Opel Mokka', 'Opel Vectra'],
        correct: 3
    },
    {
        question: 'Melyik előadót szerettem meg az ausztriai kirándulás alatt?',
        answers: ['Twenty One Pilots', 'Rilés', 'Tool', 'Imagine Dragons'],
        correct: 3
    },
    {
        question: 'Melyik a kedvenc ízű fagyim?',
        answers: ['Vanília', 'Csoki', 'Pisztácia', 'Eper'],
        correct: 3
    },
    {
        question: 'Hogy hívták az első kutyusom? (akinek én voltam a gazdája)',
        answers: ['Nero', 'Lucky', 'Rocky', 'Eddie'],
        correct: 2
    },
    {
        question: 'Hol szerettem a legjobban dolgozni szakácsként?',
        answers: ['Epcos', 'Gekko', 'Yolo Food', 'Stoczek'],
        correct: 0
    },
    {
        question: 'Melyik a kedvenc chips márkám?',
        answers: ['Lays', 'Chio', 'Pringles', 'Smack Day'],
        correct: 2
    },
    {
        question: 'Ki a kedvenc bosszúállóm?',
        answers: ['Thor', 'Űrlord', 'Doctor Strange', 'Pókember'],
        correct: 3
    },
    {
        question: '+1 Melyik a kedvenc sütim?',
        answers: ['Ischler', 'Hatlapos', 'Brownie', 'Francia krémes'],
        correct: 1
    },

];

const timePerQuestion = 30; // Time in seconds for each question


let currentQuestion = 0;
let score = 0;
let timeLeft = timePerQuestion;
let timerInterval;
let answeredQuestions = [];
let wrongAnswers = [];


function startTimer() {
    timeLeft = timePerQuestion;
    timerElement.textContent = `Hátralévő idő: ${timeLeft}`;
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Hátralévő idő: ${timeLeft}`;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        checkAnswer(-1); // Time's up, move to the next question
    }
}

function displayQuestion(question) {
    clearInterval(timerInterval);
    startTimer();
    
    questionText.textContent = question.question;
    answerButtonsContainer.innerHTML = ''; // Clear previous buttons
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => checkAnswer(index));
        answerButtonsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const currentQuestionObj = questions[currentQuestion];
    
    if (selectedIndex !== currentQuestionObj.correct) {
        wrongAnswers.push({
            question: currentQuestionObj,
            wrongAnswer: selectedIndex
        });
    }
    if (selectedIndex === currentQuestionObj.correct) {
        score += 20;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion(questions[currentQuestion]);
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timerInterval);
    questionText.textContent = 'Teljesítetted a kvízt!';
    answerButtonsContainer.innerHTML = ''; // Clear answer buttons
    scoreDisplay.textContent = ` ${score} / ${questions.length * 20}`;

    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    wrongAnswers.forEach((wrongAnswer, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('result-question');

        const questionResult = document.createElement('p');
        questionResult.textContent = `${index + 1}. ${wrongAnswer.question.question}`;
        questionResult.classList.add('wrong-answer');
        questionDiv.appendChild(questionResult);

        const wrongAnswerText = document.createElement('p');
        wrongAnswerText.textContent = `Válaszod: ${wrongAnswer.question.answers[wrongAnswer.wrongAnswer]}`;
        wrongAnswerText.classList.add('wrong-answer');
        questionDiv.appendChild(wrongAnswerText);

        const correctAnswer = document.createElement('p');
        correctAnswer.textContent = `Helyes válasz: ${wrongAnswer.question.answers[wrongAnswer.question.correct]}`;
        correctAnswer.classList.add('correct-answer');
        questionDiv.appendChild(correctAnswer);

        resultContainer.appendChild(questionDiv);
        prizeSection.style.display = "block";
        
    });
    const prizeButtons = document.querySelectorAll('.prize-btn');
    const pointSummaryText = document.createElement('p');
    pointSummaryText.textContent = `Pontjaid: ${score}`;
    summarized_sore.appendChild(pointSummaryText);

    // const prizeOptions = {
    //     20: document.querySelectorAll('.price_20'),
    //     40: document.querySelectorAll('.price_40'),
    //     100: document.querySelectorAll('.price_100'),
    //     200: document.querySelectorAll('.price_200'),
    //     300: document.querySelectorAll('.price_300'),
    //     400: document.querySelectorAll('.price_400')
    // };
    
    // prizeButtons.forEach(prizeButton => {
    //     prizeButton.addEventListener('click', () => {
    //         const pointsNeeded = parseInt(prizeButton.id.split('-')[1]);
            
    //         if (earnedPoints >= pointsNeeded) {
    //             earnedPoints -= pointsNeeded;
    //             updatePointSummary();
                
    //             const prizeContainer = prizeButton.closest('.card_container');
    //             const prizeCards = prizeContainer.querySelectorAll('.card');
    //             prizeCards.forEach(card => {
    //                 if (card.style.display !== 'none') {
    //                     card.style.display = 'none';
    //                     return;
    //                 }
    //             });
    //         } else {
    //             alert("You don't have enough points.");
    //         }
    //     });
    // });
    
    
    
    
    
    
    
}

displayQuestion(questions[currentQuestion]);





    // var price20 = document.querySelectorAll(".price_20");
    // var price40 = document.querySelectorAll(".price_40");
    // var price100 = document.querySelectorAll(".price_100");
    // var price200 = document.querySelectorAll(".price_200");
    // var price300 = document.querySelectorAll(".price_300");
    // var price400 = document.querySelectorAll(".price_400");
    // price20.forEach(function(element) {
    //   element.addEventListener("click", function() {
    //     if(summarized_sore < 20 ) {
    //         alert("Sajnos nincs elég pontod. :(")
    //       } else {
    //         summarized_sore.textContent = score - 20;
    //       }
    //   });
    // });
    // price40.forEach(function(element) {
    //     element.addEventListener("click", function() {
    //         if(summarized_sore < 40 ) {
    //             alert("Sajnos nincs elég pontod. :(")
    //           } else {
    //             summarized_sore.textContent = score - 40;
    //           }
    //     });
    //   });
    //   price100.forEach(function(element) {
    //     element.addEventListener("click", function() {
    //         if(summarized_sore < 100 ) {
    //             alert("Sajnos nincs elég pontod. :(")
    //           } else {
    //             summarized_sore.textContent = score - 100;
    //           }
    //     });
    //   });
    //   price200.forEach(function(element) {
    //     element.addEventListener("click", function() {
    //         if(summarized_sore < 200 ) {
    //             alert("Sajnos nincs elég pontod. :(")
    //           } else {
    //             summarized_sore.textContent = score - 200;
    //           }
    //     });
    //   });
    //   price300.forEach(function(element) {
    //     element.addEventListener("click", function() {
    //         if(summarized_sore < 300 ) {
    //             alert("Sajnos nincs elég pontod. :(")
    //           } else {
    //             summarized_sore.textContent = score - 300;
    //           }
    //     });
    //   });
    //   price400.forEach(function(element) {
    //     element.addEventListener("click", function() {
    //         if(summarized_sore < 400 ) {
    //             alert("Sajnos nincs elég pontod. :(")
    //           } else {
    //             summarized_sore.textContent = score - 400;
    //           }
    //     });
    //   });

    //   if(summarized_sore == 0) {
    //     alert("Sajnos elfogytak a pontjaid! :(")
    //   }

    //   let scoree = 100;

    //   function choosePrize() {
    //     price20.forEach(function(element) {
    //         element.addEventListener("click", function() {
    //             if (scoree >= 40) {
    //                 scoree -= 40;
    //                 alert("Congratulations! You've chosen a prize. You now have " + points + " points.");
    //               } else {
    //                 $('.card').css('pointer-events', 'none');
    //                 alert("Unfortunately, you've run out of points.");
                    
    //               }
                
    //         });
    //       }); 
    //   }
      
    //   choosePrize();



    
