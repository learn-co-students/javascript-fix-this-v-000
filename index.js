var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    this.status = status;
    setTimeout(serve.apply(this, ["Happy Eating!", this.customer]), 2000)
    },
updateStatus: updateStatus.bind(document.getElementById("cake"))
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
  decorate: cake.decorate.bind(pie),
  updateStatus: updateStatus.bind(document.getElementById("pie"))

}

function makeCake() {
  debugger;
  var updateCakeStatus = cake.updateStatus;
  mix.call(updateCakeStatus)
}

function makePie() {
  var updatePieStatus = pie.updateStatus;
  mix.call(updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool(updateFunction)
  }, 2000)
}

function mix(updateFunction) {
  debugger;
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(function() {
    bake(updateFunction)
  }, 2000)
  updateFunction.status
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(function() {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  if (this.text === "Make Cake") {
    makeCake();
  } else {
    makePie();
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
