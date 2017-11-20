$("document").ready(function(){
  var available = [1,2,3,4,5,6,7,8,9];
  var unavailable = [];
  moveCount = 0;
  var human = {
    "team": false,
    "all": [],
    "set 1": [],
    "set 2": [],
    "set 3": [],
    "set 4": [],
    "set 5": [],
    "set 6": [],
    "set 7": [],
    "set 8": [],
  }
  var computer = {
    "team": false,
    "all": [],
    "set 1": [],
    "set 2": [],
    "set 3": [],
    "set 4": [],
    "set 5": [],
    "set 6": [],
    "set 7": [],
    "set 8": [],
  }
  var completeSet = [
    ["set 1", [1,2,3]],
    ["set 2", [4,5,6]],
    ["set 3", [7,8,9]],
    ["set 4", [1,4,7]],
    ["set 5", [2,5,8]],
    ["set 6", [3,6,9]],
    ["set 7", [1,5,9]],
    ["set 8", [3,5,7]],
  ]

  $("#oh").click(function(){
    if(human.team === false){
      setTeam("O", "X");
      computerMove();
    }
  })
  $("#ex").click(function(){
    if(human.team === false){
      setTeam("X", "O");

    }
  })
  $("#reset").click(function(){
    resetGame();
    for(var i = 1; i < 10; i++) {
      $(getID(i)).html("");
    }
    $("#team").html("<p id='message'>Plz pick iX or Oh on right to make play</p>")
  })

  $(".square").click(function(){
    // if not already chosen

    if(whoseMove()=== human && available.indexOf(getNumber(this.id)) != -1){
      moveCount++
      $(this).html(human.team)
      updateSets(getNumber(this.id));
      console.log("After human, available: " + available);
      console.log("After human, unavailable: " + unavailable);
      gameOverCheck();
      if(human.team != false){
        computerMove();
        console.log("After computer, available: " + available);
        console.log("After computer, unavailable: " + unavailable);
        gameOverCheck();
      }
    }
  })


  // set and display the team + clear the board //
  function setTeam(humanTeam, compTeam){
    $("#team").html("<p id='message'>You r play as such " + humanTeam + "s. Computer iz play as many " + compTeam + "s</p>");
    human.team = humanTeam;
    computer.team = compTeam;
    //loop through all of the cells and make em blank
    for(var i = 1; i < 10; i++) {
      $(getID(i)).html("");
    }
    $("#middle-doge").html("<img id='middle-doge-img' src='https://i.imgur.com/BRMfRGj.jpg'>");
  }


  function gameOverCheck(){
    var winner = false;
    var winningSet = [];
    // check if there's a winner (order of ifs doesn't matter because return
    // after every move)
    for(var x = 0; x < completeSet.length; x++){
      if(human[completeSet[x][0]].length === 3){
        winner = human;
        winningSet = human[completeSet[x][0]];
        console.log(winningSet)
      }
      if(computer[completeSet[x][0]].length === 3){
        winner = computer;
        winningSet = computer[completeSet[x][0]];
      }
    }
    // if there's a winner, let em know
    if (winner != false){
      for (var i = 0; i < 4; i++){
        $(getID(winningSet[i])).html("<img id='doge-win-img' src='https://i.imgur.com/XC0tiPv.png'>")
      }
      if (winner === human){
        $("#team").html("<p id='message'>Amaze! Such winz! Pick side to play again!</p>");
        $("#middle-doge").html("<img id='middle-doge-img' src='https://i.imgur.com/92SFTKU.jpg'>");
        resetGame()
      } else {
        $("#team").html("<p id='message'>Oh many sry! U lose. Pick side to play again!</p>");
        $("#middle-doge").html("<img id='middle-doge-img' src='https://i.imgur.com/EeCkCRu.jpg'>");
        resetGame()
      }
    } else if (winner === false && available.length === 0){
      $("#team").html("<p id='message'>No lose?! No Win?! Such cat! Pick a new team.</p>");
      for(var i = 1; i < 10; i++) {
        $(getID(i)).html("<img id='doge-win-img' src='https://i.imgur.com/yXWuHR8.jpg'>");
        $("#middle-doge").html("<img id='middle-doge-img' src='https://i.imgur.com/yXWuHR8.jpg'>");
      }
      resetGame()
    }
  }

  // ------- resets all variables -------- //
  function resetGame(){
    available = [1,2,3,4,5,6,7,8,9];
    unavailable = [];
    moveCount = 0;
    human = {
      "team": false,
      "all": [],
      "set 1": [],
      "set 2": [],
      "set 3": [],
      "set 4": [],
      "set 5": [],
      "set 6": [],
      "set 7": [],
      "set 8": [],
    }
    computer = {
      "team": false,
      "all": [],
      "set 1": [],
      "set 2": [],
      "set 3": [],
      "set 4": [],
      "set 5": [],
      "set 6": [],
      "set 7": [],
      "set 8": [],
    }
  }

  // ------- check whose turn it is ------- //
  function whoseMove(){
    if(available.length % 2 === 1) {
      if (human.team === "X") {
      return human;
      } else {
        return computer;
      }
    } else {
      if (available.length % 2 === 0 && human.team === "X") {
        return computer;
      } else {
        return human;
      }
    }
  }

  // ------- computer's move logic ------- //
  function computerMove(){
    var bestMove = [1,3,5,7,9]

    // ----- if Xs, picking from one of the best moves ----- //
    if (moveCount === 0){
      var bestIndex = Math.floor(Math.random() * 5);
      $(getID(bestMove[bestIndex])).html(computer.team);
      updateSets(bestMove[bestIndex]);
      moveCount++;
    }

    // ---- if Os, picking smartest available move -----//
    else if (moveCount === 1 && unavailable[0] != 5){
      if(bestMove.indexOf(unavailable[0]) != -1){
        $("#five").html(computer.team)
        updateSets(5);
        moveCount++;
      } else {
        var bestIndex = Math.floor(Math.random() * 5);
        $(getID(bestMove[bestIndex])).html(computer.team);
        updateSets(bestMove[bestIndex]);
        moveCount++;
      }
    }

    //----!!!looking for win ------//
    else if (twoCheck(computer) != false){
        $(getID(twoCheck(computer))).html(computer.team);
        updateSets(twoCheck(computer));
        moveCount++;

    }
    //----!!!looking for block ------//
    else if (twoCheck(human) != false){
        $(getID(twoCheck(human))).html(computer.team);
        updateSets(twoCheck(human));
        moveCount++;
    }

    //---- Otherwise, just make a random move -----//
    // this should be a bit smarter (aka look in a set, if has 1 and two are
    // available, go for one in that set)
    else {
      var moveIndex = Math.floor(Math.random() * available.length);
      $(getID(available[moveIndex])).html(computer.team);
      updateSets(available[moveIndex]);
      moveCount++;
    }
  }


  // -------------- helper functions ------------------ //
  // ------- get the ID from number ------- //
  function getID(num){
    switch(num){
      case 1:
        num = "#one";
        break;
      case 2:
        num = "#two";
        break;
      case 3:
        num = "#three";
        break;
      case 4:
        num = "#four";
        break;
      case 5:
        num = "#five";
        break;
      case 6:
        num = "#six";
        break;
      case 7:
        num = "#seven";
        break;
      case 8:
        num = "#eight";
        break;
      case 9:
        num = "#nine";
        break;
    }
    return num;
  }

  // ------ get the number from ID ------ //
   function getNumber(x){
     switch(x){
       case 'one':
         x = 1;
         break;
       case 'two':
         x = 2;
         break;
       case 'three':
         x = 3;
         break;
       case 'four':
         x = 4;
         break;
       case 'five':
         x = 5;
         break;
       case 'six':
         x = 6;
         break;
       case 'seven':
         x = 7;
         break;
       case 'eight':
         x = 8;
         break;
       case 'nine':
         x = 9;
         break;
     }
     return x;
   }


  //------------- Go for the win/Block opponent ----------------//
  //returns a number that is the third available in a set (first choice, since it's
  // either blocking or winning anyway). There's something weird about the diagonal sets
  // for some unknown reason
  function twoCheck(who){
    for(var y = 0; y < completeSet.length; y++){
      if(who[completeSet[y][0]].length === 2){
        for(var z = 0; z < completeSet[y][1].length; z++){
          if(who[completeSet[y][0]].indexOf(completeSet[y][1][z]) === -1){
            if(available.indexOf(completeSet[y][1][z]) != -1 ){
              return completeSet[y][1][z];
            }
          }
        }
      }
    }
    return false;
  }

  //------ functions for Human Move ------ //
  function updateSets(num){
    // switch plugs in number into object set based on whoseMove(happns
    // before splice, so whoseMove == current, not next)
    switch(num){
      case 1:
        whoseMove()["set 1"].push(num);
        whoseMove()["set 4"].push(num);
        whoseMove()["set 7"].push(num);
        break;
      case 2:
        whoseMove()["set 1"].push(num);
        whoseMove()["set 5"].push(num);
        break;
      case 3:
        whoseMove()["set 1"].push(num);
        whoseMove()["set 6"].push(num);
        whoseMove()["set 8"].push(num);
        break;
      case 4:
        whoseMove()["set 2"].push(num);
        whoseMove()["set 4"].push(num);
        break;
      case 5:
        whoseMove()["set 2"].push(num);
        whoseMove()["set 5"].push(num);
        whoseMove()["set 7"].push(num);
        whoseMove()["set 8"].push(num);
        break;
      case 6:
        whoseMove()["set 2"].push(num);
        whoseMove()["set 6"].push(num);
        break;
      case 7:
        whoseMove()["set 3"].push(num);
        whoseMove()["set 4"].push(num);
        whoseMove()["set 8"].push(num);
        break;
      case 8:
        whoseMove()["set 3"].push(num);
        whoseMove()["set 5"].push(num);
        break;
      case 9:
        whoseMove()["set 3"].push(num);
        whoseMove()["set 6"].push(num);
        whoseMove()["set 7"].push(num);
        break;
    }
    //whoseMove().all.push(num);
    //cuts out number from available array
    unavailable.push(num);
    available.splice(available.indexOf(num),1);


  }


}) //doc ready function end


/* --------- Feature addition ------------ */
// Fix top UI (need to sketch design)
  // make X's and O's larger
  // Top UI is locked
// Highlight winning cells (and clear highlights)
// Doge-ify (winning cells have doge images? Cats and doge? Doge wording)
