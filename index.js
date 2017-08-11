
// ------cake and pie raw data
var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateFunction(status);
    setTimeout(() => {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]));
    }, 2000);
  }
};
 
var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
};

// makeCake uses updateStatus to update page, bound to 'this' itself (the cake object)
function makeCake() {
  // set variable, use updateStatus function bound to 'this'
  var updateCakeStatus = updateStatus.bind(this);
  // pass in some text to updateCakeStatus, for display on the web page;
  updateCakeStatus("Prep");
  // call the mix function, passing in cake data
  // passing in the variable: updateCakeStatus, updates index.html with "Prep" innerText
  mix.call(cake, updateCakeStatus);
}



// makePie uses updateStatus to update page, bound to 'this' itself (the pie object)
function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  updatePieStatus("Prep");
  // call mix function, passing in pie data. 
  // passing in the variable: updatePieStatus, updates index.html with "Prep" innerText
  pie.decorate = cake.decorate.bind(pie);
  mix.call(pie, updatePieStatus);
}

// updateStatus: cake or pie, use updateStatus to update index.html
function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText;
}
 
 
// create variable 'status', set to "Mixing (ingredients array joined together)"
function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ");
  setTimeout(() => {
// call bake function, passing in 'this', updating status and setting timer;
    bake.call(this, updateFunction);
    // WHAT THE FUCK is updateFunction??????
  }, 2000);
// debugger;
  updateFunction(status);
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime;
  setTimeout(() => {
    cool.call(this, updateFunction);
  }, 2000);
  updateFunction(status);
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!";
  setTimeout(() => {
  this.decorate(updateFunction);
  }, 2000);
  updateFunction(status);
}

// -----make a cake or pie based on clicked link -----
// -----makeDessert calls DOM object: parentNode referencing 'this'
// test calls for the single word "cake" or "pie", so "this.parentNode" gets you to the <div id="cake">
// var cakeNode = document.getElementById("cake")
function makeDessert() {
  if(this.parentNode.id === "cake") {
    makeCake.call(this.parentNode);
  } else {
    makePie.call(this.parentNode);
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message);
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make");
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert);
  }
});
