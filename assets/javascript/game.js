// simple star wars game written with jQuery
// Bradley Jensen
// console.log("Brad was here...");

// this line is a shortcut way to get the same effect as a document.ready
$(function() {
  //console.log("document ready");

  var i = 0;
  // the setInterval(function, delay) runs the function every delay milliseconds
  setInterval(function(){
    console.log(i);
    i = (i+1) % 10; // this line creates a looping i up to the value behind the modulus operator
  }, 1000);

  // create document listeners and link to the functions
  $(document).keydown(function(event) {
    userKeyDown(event);
  }); 

  $(document).click(function(event) {
    userClick(event);
  });


  // my functions go down here
  function userKeyDown(e) {
    // user released a key
    console.log("Key Down");
  }
  
  function userClick(e) {
    // user clicked the mouse
    console.log("Mouse Click");
  }
});

