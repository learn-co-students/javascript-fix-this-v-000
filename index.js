var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status);
    var dessert = this;
    setTimeout(function() {
      updateFunction(serve.apply(dessert, ["Happy Eating!", dessert.customer]))
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = this;

  var updateFunction = updateStatus.bind(updateCakeStatus);

  mix.call(cake, updateFunction)
}

function makePie() {
  var updatePieStatus = this;

  pie.decorate = cake.decorate.bind(pie);

  var updateFunction = updateStatus.bind(updatePieStatus);

  mix.call(pie, updateFunction)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  var dessert = this
  setTimeout(function() {
    cool.call(dessert, updateFunction)
  }, 2000)
  updateFunction(status);
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  var dessert = this
  setTimeout(function() {
    bake.call(dessert, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  var dessert = this
  setTimeout(function() {
    dessert.decorate(updateFunction)
  }, 2000)
  updateFunction(status);
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was s
  var typeString = this.text.toString();
  if (typeString.includes("Cake")) {
    var cakeNode = document.getElementById("cake");
    makeCake.call(cakeNode);
  } else if (typeString.includes("Pie")) {
    var pieNode = document.getElementById("pie");
    makePie.call(pieNode);
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
