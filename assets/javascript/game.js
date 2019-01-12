// simple star wars game written with jQuery
// Bradley Jensen
// console.log("Brad was here...");

// create an object for the characters
// the characters have three attributes:
//    Health Points
//    Attack Power
//    Counter Attack Power
// a constructor for a 'Character' that has a name and three attributes
function Character(name, hp, ap, cap, img) {
  this.name = name;
  this.healthPoints = hp;
  this.baseAttackPower = ap;
  this.currentAttackPower = ap;
  this.counterAttackPower = cap;
  this.imgSrc = img;
}
// create an array of characters for easy manipulating later
var characters = [ new Character("Luke Skywalker", 120, 10, 20, "assets/images/luke_skywalker_125x125.jpg"), 
                   new Character("Han Solo", 140, 8, 15, "assets/images/han_solo_125x125.jpg"), 
                   new Character("Darth Vadar", 110, 12, 10, "assets/images/darth_vader_125x125.jpg"), 
                   new Character("Emperor Palpatine", 180, 6, 25, "assets/images/palpatine_125x125.jpg")];

// this line is a shortcut way to get the same effect as a document.ready
$(function() {
  var goodGuysDisplay = $("#goodGuys");
  var attackerDisplay = $("#attacker");
  var defenderDisplay = $("#defender");
  var badGuysDisplay = $("#badGuys");
  var phase = 0;

  // reset the game to start
  startPhase1();

  function clickedCharacter(e) {
    //console.log("clicked and phase " + phase);
    //console.log(event); // the event is the click
    //console.log(this); // 'this' is the element that was clicked; in this case it is the character

    // in phase 1
    if (phase === 1) {
      // the user clicks on one character which will select that as the players 'attacker'
      // the remaining characters will all be sent to the badGuys display area (and give them a red border for fun)

      // move 'this' element into the attackerDisplay
      //console.log(this);
      $(this).addClass("bg-green");
      attackerDisplay.append(this);


      badGuysDisplay.append(goodGuysDisplay.children());
      for(var i=0; i<badGuysDisplay.children().length; i++) {
        //console.log(badGuysDisplay.children()[i]);
        $(badGuysDisplay.children()[i]).addClass("bg-red");
      }
      startPhase2();
    } else if (phase === 2) {
      // the player needs to select the bad guy to attack
      //console.log("#"+this.id);
      var myParentId = $("#" + this.id).parents()[0].id; //

      if (myParentId === "badGuys") {
        // the player clicked a bad Guy
        // console.log("you chose bad guy: " + this.id);
        // send the bad guy to the defenders
        defenderDisplay.append(this);

        // the rest of the bad guys just hang out

        // go to phase 3
        startPhase3();
      } else {
        // the user didn't click a bad guys so do nothing
        // or maybe remind the user to select an opponent
      }
    } else if (phase === 3) {
      // during phase 3, the attack button is active and the attacking happens
      // if the user clicks on a different bad guy, that bad guy becomes the defender
      var myParentId = $("#" + this.id).parents()[0].id; //

      if (myParentId === "badGuys") {
        // the player clicked a bad Guy
        // console.log("you chose bad guy: " + this.id);
        // send the current defender to the badGuys
        badGuysDisplay.append(defenderDisplay.children());

        // send the bad guy to the defenders
        defenderDisplay.append(this);

        // the rest of the bad guys just hang out

        // phase does not change
      } else {
        // the user didn't click a bad guys so do nothing
        // or maybe remind the user to select an opponent
      }
    } else {
      console.log("unknown phase");
    }
  }


  $("#attack-button").click(function(e) {
    e.preventDefault();
    // user clicked the attack button

    // if phase 3, then the attacker attacks the bad guy
    if (phase === 3) {
      // store local variables with the attacker and defender
      var attacker = attackerDisplay.children()[0];
      var defender = defenderDisplay.children()[0];

      // the attacker hits the defender, the attackers attack power increases by its base attack power
      $(defender).attr("healthPoints", parseInt( $(defender).attr("healthPoints") ) - parseInt( $(attacker).attr("currentAttackPower") ) );
      $("#messages").html( $(attacker).attr("name") + " hits " + $(defender).attr("name") + " for " + $(attacker).attr("currentAttackPower") + " damage!");

      // if the defenders hp is 0, then the defender is dead
      if( parseInt( $(defender).attr("healthPoints") ) <= 0 ) {
        // defender is dead
        // console.log("defender is dead");
        // then empty the defenderDisplay to delete this defender
        defenderDisplay.empty();
        if( badGuysDisplay.children().length == 0 ) {
          userWin();
        }
        else {
          $("#messages").html( $("#messages").html() + "<br>" + $(defender).attr("name") + " is defeated!");
          // start phase 2 again - user needs to select a new enemy
          startPhase2();
        }
      }
      else {
        // the attackers currentAttackPower increases by its base attack power
        $(attacker).attr("currentAttackPower", parseInt( $(attacker).attr("currentAttackPower") ) + parseInt($(attacker).attr("baseAttackPower") ) );
        // the attackers health goes down by the defenders counter attack power;
        $(attacker).attr("healthPoints", parseInt( $(attacker).attr("healthPoints") ) - parseInt( $(defender).attr("counterAttackPower") ) );
        $("#messages").html( $("#messages").html() + "<br>" + $(defender).attr("name") + " counters " + $(attacker).attr("name") + " for " + $(defender).attr("counterAttackPower") + " damage!");


        if( parseInt( $(attacker).attr("healthPoints") ) <= 0 ) {
          // attacker dies, game over
          updateMe(attacker);
          updateMe(defender);
          gameOver();
        }
        else {
          // prompt user to carry on with attacking
          // update the displays? make a cool lightsaber noise?
          updateMe(attacker);
          updateMe(defender);
        }
      }
    } else {
      // the attack button should only be enabled in phase 3
      // but if somehow it gets pressed nothing happens here
      // console.log("Attack was pushed in phase: " + phase);
    }
  });
  
  $("#reset-button").click(function(e) {
    e.preventDefault();
    // user pressed the reset button
    startPhase1();
  });

  function updateMe(update) {
    // this function will update the stats on a character card
    // console.log($($(update).children()[1]).children());
    // update attack
    $($($(update).children()[1]).children()[0]).html("Atk<br>" + $(update).attr("currentAttackPower"));
    // update health
    $($($(update).children()[1]).children()[1]).html("HP<br>" + $(update).attr("healthPoints"));
  }

  function startPhase1() {
    // reset button is hidden
    $("#reset-button").hide();
    // attack button is hidden in phase 1
    $("#attack-button").hide();

    goodGuysDisplay.empty();
    attackerDisplay.empty();
    defenderDisplay.empty();
    badGuysDisplay.empty();

    // the game will start by presenting characters for the player to choose from
    // create the character elements and add them to the goodGuys display
    // this is phase 1
    phase = 1;
    for (var i = 0; i < characters.length; i++) {
      goodGuysDisplay.append(buildCharacterCard(characters[i], i));
    }
    //add the click listener to the characters
    $(".character").on("click", clickedCharacter);

    // tell the user to select a character
    $("#instructions").text("Select a character to begin...");

    // clear the messages
    $("#messages").html("");
  }

  function buildCharacterCard(buildThis, i) {
    // this is where I build the character
    // character is an image and a stats bar
    // 1 column, 2 row grid

    // create a new div that will be the return object
    var newDiv = $("<div>");
    newDiv.addClass("character row-1");
    newDiv.attr("id", "character-" + i);

    // give the div the character stats as attributes
    newDiv.attr("name", buildThis.name);
    newDiv.attr("baseAttackPower", buildThis.baseAttackPower);
    newDiv.attr("currentAttackPower", buildThis.currentAttackPower);
    newDiv.attr("healthPoints", buildThis.healthPoints);
    newDiv.attr("counterAttackPower", buildThis.counterAttackPower);

    // create the image and append it to the new div
    newDiv.append($("<img>").attr("src", buildThis.imgSrc));

    // create the stats display 
    var newStats = $("<div>").addClass("stats-bar");
    newStats.append($("<div>").html("Atk<br>"+buildThis.currentAttackPower).addClass("bg-green color-white text-center"));
    newStats.append($("<div>").html("HP<br>"+buildThis.healthPoints).addClass("bg-blue color-white text-center"));
    newStats.append($("<div>").html("Ctr<br>"+buildThis.counterAttackPower).addClass("bg-red color-white text-center"));

    // append the stats to the newdiv
    newDiv.append(newStats);

    return newDiv;
  }

  function startPhase2() {
    // transition to phase 2;
    phase = 2;
    // attack button is hidden in phase 2
    $("#attack-button").hide();

    $("#instructions").text("Select an opponent!");
  }

  function startPhase3() {
    // go to phase 3
    phase = 3;
    // enable the attack button
    $("#attack-button").show();
    $("#instructions").text("Press attack!");
    $("#messages").html("");
  }

  function userWin() {
    // player winds, no more bad guys
    console.log("you win");
    phase = 0;
    $("#instructions").text("You are victorious! Press Reset to play again...")
    $("#messages").html("Well Played!");
    $("#attack-button").hide();
    $("#reset-button").show();
  }

  function gameOver() {
    // player loses, game over
    //console.log("Game Over");
    phase = 0;
    $("#instructions").text("You have been defeated! Press Reset to try again...");
    $("#messages").html("Choose your character and opponents wisely!");
    $("#attack-button").hide();
    $("#reset-button").show();
  }
});
