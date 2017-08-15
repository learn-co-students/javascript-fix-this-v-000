'use strict';

var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
      var that = this;
    setTimeout(() =>
      updateFunction.call(that, serve.apply(that, ["Happy Eating!", that.customer]))
    , 2000)
    updateFunction.call(that, status)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
}


function makeCake() {
  var updateCakeStatus = updateStatus.bind(document.getElementById("cake"))
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(document.getElementById("pie"));
  pie.decorate = cake.decorate.bind(pie);
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
    var that = this;
   setTimeout(() =>
    bake.call(that, updateFunction)
   , 2000)
  updateFunction.call(that, status)
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
    var that = this;
   setTimeout(() =>
    cool.call(that, updateFunction)
  , 2000)
    updateFunction.call(that, status);
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
    var that = this;
  setTimeout(() =>
    that.decorate(updateFunction)
  , 2000)
    updateFunction.call(that, status);
}

function makeDessert() {
  var dessertDiv = document.getElementById("cake");
    if (dessertDiv.getElementsByClassName("js-make")[0] == this) {
       makeCake.call(document.getElementById("cake"));
   } else  {
        makePie.call(document.getElementById("pie"));
   }

  // add code here to decide which make... function to call
  // based on which link was clicked
};

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
