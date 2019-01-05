// simple star wars game written with jQuery
// Bradley Jensen
//console.log("Hello World");

$(document).ready(function() {
  //console.log("document ready");
  //$(document).keyup(userKeyUp(event));

  // $(document).on("keyup", function(event) {
  //   console.log(event);
  // } );

  $(document).keyup(function(event) {
    userKeyUp(event);
  }); 

  $(document).click(function(event) {
    userClick(event);
  })
});

function userKeyUp(e) {
  // user released a key
  console.log(e);
}

function userClick(e) {
  console.log(e);
  console.log(e.clientX + " " + e.clientY);
}