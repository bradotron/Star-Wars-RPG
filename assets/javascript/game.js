// simple star wars game written with jQuery
// Bradley Jensen
// console.log("Brad was here...");

// create an object for the characters
// the characters have three attributes:
//    Health Points
//    Attack Power
//    Counter Attack Power
// a constructor for a 'Character' that has a name and three attributes
function Character(name, hp, ap, cap) {
  this.name = name;
  this.healthPoints = hp;
  this.baseAttackPower = ap;
  this.currentAttackPower = ap;
  this.counterAttackPower = cap;
}
// create an array of characters for easy manipulating later
var characters = [ new Character("Luke Skywalker", 120, 8, 20), 
                   new Character("Han Solo", 140, 10, 20), 
                   new Character("Darth Vadar", 110, 8, 10), 
                   new Character("Emperor Palpatine", 180, 6, 30)];

// this line is a shortcut way to get the same effect as a document.ready
$(function() {
  var goodGuysDisplay = $("#goodGuys");
  var attackerDisplay = $("#attacker");
  var defenderDisplay = $("#defender");
  var badGuysDisplay = $("#badGuys");
  var phase = 0;

  startPhase1();

  $(".character").on("click", function(event) {
    //console.log("phase " + phase);
    //console.log(event); // the event is the click
    //console.log(this); // 'this' is the element that was clicked; in this case it is the character

    // in phase 1
    if (phase === 1) {
      // the user clicks on one character which will select that as the players 'attacker'
      // the remaining characters will all be sent to the badGuys display area (and give them a red border for fun)

      // move 'this' element into the attackerDisplay
      attackerDisplay.append(this);

      badGuysDisplay.append(goodGuysDisplay.children());

      startPhase2();
    } else if (phase === 2) {
      // the player needs to select the bad guy to attack
      //console.log("#"+this.id);
      var myParentId = $("#" + this.id).parents()[0].id; //
      //console.log( myParentId );
      //console.log( $("#"+this.id).parents() );

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
  });

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

      // if the defenders hp is 0, then the defender is dead
      if( parseInt( $(defender).attr("healthPoints") ) <= 0 ) {
        // defender is dead
        console.log("defender is dead");
        // then empty the defenderDisplay to delete this defender
        defenderDisplay.empty();
        if( badGuysDisplay.children().length == 0 ) {
          userWin();
        }
        else {
          // start phase 2 again - user needs to select a new enemy
          startPhase2();
        }
      }
      else {
        // the attackers currentAttackPower increases by its base attack power
        $(attacker).attr("currentAttackPower", parseInt( $(attacker).attr("currentAttackPower") ) + parseInt($(attacker).attr("baseAttackPower") ) );
        // the attackers health goes down by the defenders counter attack power;
        $(attacker).attr("healthPoints", parseInt( $(attacker).attr("healthPoints") ) - parseInt( $(defender).attr("counterAttackPower") ) );

        if( parseInt( $(attacker).attr("healthPoints") ) <= 0 ) {
          // attacker dies, game over
          gameOver();
        }
        else {
          // prompt user to carry on with attacking
          // update the displays? make a cool lightsaber noise?
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
      var newDiv = $("<div>");
      newDiv.attr("id", "character-" + i);
      newDiv.attr("class", "character");
      newDiv.attr("name", characters[i].name);
      newDiv.attr("baseAttackPower", characters[i].baseAttackPower);
      newDiv.attr("currentAttackPower", characters[i].currentAttackPower);
      newDiv.attr("healthPoints", characters[i].healthPoints);
      newDiv.attr("counterAttackPower", characters[i].counterAttackPower);
      newDiv.text(characters[i].name);

      goodGuysDisplay.append(newDiv);
    }
  }

  function startPhase2() {
    // transition to phase 2;
    phase = 2;
    // attack button is hidden in phase 2
    $("#attack-button").hide();
  }

  function startPhase3() {
    // go to phase 3
    phase = 3;
    // enable the attack button
    $("#attack-button").show();
  }

  function userWin() {
    // player winds, no more bad guys
    console.log("you win");
    phase = 0;
    $("#attack-button").hide();
    $("#reset-button").show();
  }

  function gameOver() {
    // player loses, game over
    console.log("Game Ove");
    phase = 0;
    $("#attack-button").hide();
    $("#reset-button").show();
  }
});
