// simple star wars game written with jQuery
// Bradley Jensen
// console.log("Brad was here...");

// create an object for the player's character options
// the characters have three attributes:
//    Health Points
//    Attack Power
//    Counter Attack Power
// a constructor for a 'Character' that has the three attributes
function Character(hp, ap, cap) {
  this.healthPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = cap;
}
// create an array of characters
var characters = ["Luke", "Han", "Darth", "Palpatine"];

// this line is a shortcut way to get the same effect as a document.ready
$(function() {
  var goodGuysDisplay = $("#goodGuys");
  var attackerDisplay = $("#attacker");
  var defenderDisplay = $("#defender");
  var badGuysDisplay = $("#badGuys");

  //var characterArray = [];

  // attack button is disabled on load
  // $("#attack-button").prop("disabled", true);
  $("#attack-button").hide();


  // the game will start by presenting four characters for the player to choose from
  // create the character elements and add them to the goodGuys display
  // this is phase 1
  var phase = 1;
  for (var i = 0; i < characters.length; i++) {
    var newDiv = $("<div>");
    newDiv.attr("id", characters[i]);
    newDiv.attr("class", "character");
    newDiv.text(characters[i]);

    goodGuysDisplay.append(newDiv);
  }

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

      // transition to phase 2;
      phase = 2;
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
        phase = 3;
        // enable the attack button
        $("#attack-button").show();
        //$("#attack-button").prop("disabled", false);
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
      //console.log("Attack!");
      // store local variables with the attacker and defender
      var attacker = attackerDisplay.children()[0];
      var defender = defenderDisplay.children()[0];
      //console.log(attacker.id + " Attacks: " + defender.id);
    } else {

    }
  });
});
