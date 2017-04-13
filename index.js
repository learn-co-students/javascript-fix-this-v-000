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

    var that = this;
    setTimeout(function() {updateFunction(serve.apply(that, ["Happy Eating!", that.customer]))}, 2000)
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

pie.decorate = cake.decorate.bind(pie);

function makeDessert() {
  if (this.innerHTML === "Make Cake") {
    makeCake.call(document.getElementById("cake"))
  } else if (this.innerHTML === "Make Pie") {
    makePie.call(document.getElementById("pie"))
  }
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this);
  mix.call(cake, updateCakeStatus);
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  mix.call(pie, updatePieStatus);
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText;
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  updateFunction(status);
  var that = this;
  setTimeout(function() {
    bake.call(that, updateFunction);
  }, 2000)
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction(status);
  var that = this;
  setTimeout(function() {
    cool.call(that, updateFunction)
  }, 2000)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  updateFunction(status);
  var that = this;
  setTimeout(function() {
    that.decorate(updateFunction)
  }, 2000)
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
