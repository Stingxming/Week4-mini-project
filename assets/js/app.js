/*
 1. Design UI
    - Draw a picture
    - Determine where you will display feedback. 
    - Determine what is clickable, what will recieve key input, change input
      timers, scroll events, etc
    - rough in the elements in HTML, style is less important

*/

/*
  2. Declare variables: DOM hooks
    - In the Javascript, create variables for each of the DOM elements that will display feedback
    - create variables for the elements that will receive input
    - set each variable to its DOM element like:
    
    var theElement = document.querySelector([CSS Selector for your element]);
 */
    var winsEl = document.querySelector(".scoreboard__score__value--wins");
    var lossesEL = document.querySelector(".scoreboard__score__value--losses");
    var timerEl = document.querySelector(".gameboard__timer");
    var startGameButtonEl = document.querySelector(".controls__playgame");
    var gameBoardEl = document.querySelector(".gameboard");
    var gameResultEl = document.querySelector(".gameboard__result");
    var gameDisplayEl = document.querySelector("gameboard__display");
    var controlsEl = document.querySelector(".controls");
    var currentWordIndex;
    var currentGuess;
    /*
     3. Declare variables: state (things we need to keep track of)
        - What are the datq that need to be kept track of? 
        - Global state variables sometimes emerge while working on event handlers (i.e., it
          becomes clearer what needs to be tracked across the application)
        - state variables:
          "State describes the status of the entire program or an individual
           object. It could be text, a number, a boolean, or another data type.
    
           It’s a common tool for coordinating code. For example, once you update state, a bunch of different functions can instantly react to that change."
           https://www.freecodecamp.org/news/state-in-javascript-explained-by-cooking-a-simple-meal-2baf10a787ee/
        - Does the state variable need to be global (i.e., used by all the event handlers) or does it only need to be local
          to the event handler?
    */
    var wins = 0;
    var losses = 0;
    var timer = null;
    var timeLeft = 0;
    /*
     4. Declare variables: constants
        - What are the data the application needs that won't change?
        - e.g. Math constants, pre-created content (maybe the questions and answers?)
    */
    var kWordList = [
    "variable",
    "style",
    "markdown",
    "javacript",
    "node",
    "Webpack",
    "indexeddb",
    ];
    
    var kDuration =20;
    var kStorageKey = "week-4-activity-28-scores";
    /*
     5. Identify events
        - Based on the variables created in Step 2, create event handlers
    
          theElement.addeventListener([EVENT TYPE], function(event){
            // do stuff here...
          })
    
        ...where [EVENT TYPE] is "click" or "change" or "keydown" or whatver
    
        - Identify the things that should happen in the click handlers
        - Rememember: there is always a page load event. Usually have a function for anything
          that needs setting up at the beginning, before people interact with the 
          page. Start the execution of this setup function at the bottom of page
    */
    
    // CREATE LISTENERS FOR:
    
    // event: page load
    
    function init() {
      console.log("Game Loading...");

      // retrieve data from persistance
      var scores = JSON.parse(localStorage.getItem(kStorageKey));

      // update state
      if (scores) {
        wins = scores.wins;
        losses = scores.losses;
      }

      // update the ui
        updateScoreBoard();   
    }

    // event: click start
    
    function handleCkickStart(ev) {
      console.log("Game Started!");
      startGameButtonEl.addEventListener("click, handleClickStart");
    
    
    if (!timer) {
        timeLeft = kDuration;
        timer = setInterval(handleTimerTick, 1000);
        currentWordIndex = Math.floor(Math.random() * kWordList.length);
        currentGuess = new Array(kWordList[currentWordIndex].length).fill("_");
        hideElement(controlsEl);
        hideElement(gameResultEl);
        showElement(timerEl);
        showElement(gameBoardEl);
    }

    //choose a word from the list

    // set time left

    // set current guess

    // hide the start button

    // reset the display

    // hide any result message 

    // show timer

    // show gameboard

    }
    
    // event: timer tick
    
    function handleTimerTick(ev) {
      console.log("timer ticked!", timeLeft);
      timer--;
      timerEl.textContent = timeLeft;
      if(timeLeft === 0) {
        handleGameEnds(false);
      }
    }
    
    // event: type letter
    
    function handleKeydown(ev) {
      console.log("key pressed: ", ev.key);
    }
    document.addEventListener("keydown", handleKeydown);
    
    // event: game ends
    
    function handleGameEnds(didWin) {
    clearInterval(timer);
    timer = null;

        // update state

    if (didWin) {
        wins++;
    } else {
        losses++;
    }

    localStorage.setItem(kStorageKey, JSON.stringify({wins, losses }));

    // update ui

    // display results
    displayResult(didWin);
    updateScoreBoard();
    showElement(controlsEl);

    }
    
    /*
     6. Refactor (Helper Functions)
        - identify tasks that can be broken into their own functions, outside the event handlers
        - Are there tasks that more than one event handler share?
    */
    
        function updateScoreBoard() {
            // update ui
            winsEl.textContent = wins;
            lossesEL.textContent = losses;
        }

        function hideElement(el) {
            el.classList.add("hide");
        }

        function showElement(el) {
            el.classList.remove("hide");
        }

        function displayResult(didWin) {
            hideElement(timerEl);

            gameResultEl.classList.remove("success");
            gameResultEl.classList.remove("failure");

            if(didWin) {
                gameResultEl.textContent ="YOU WIN!";
                gameResultEl.classList.add("success");
            } else {
                gameResultEl.textContent ="YOU LOSE!";
                gameResultEl.classList.add("failure");
            }
            showElement(gameResultEl);
        }
    
    // start the game 

    init();