var cake = {
  domElement: document.getElementById("cake"),
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function() {
    var that = this;
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateStatus.call(this, status);
    setTimeout(serve.bind(that, "Happy Eating!", that.customer), 2000);
  }
};

var pie = {
  domElement: document.getElementById("pie"),
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
  decorate: cake.decorate.bind(pie, status)
};

function makeCake() {
  mix.call(cake);
}

function makePie() {
  mix.call(pie, status);
}

function updateStatus(statusText) {
  this.domElement.getElementsByClassName("status")[0].innerText = statusText;
}

function bake() {
  var that = this;
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime;
  updateStatus.call(this, status);
  setTimeout(function() {
    cool.call(that);
  }, 2000);
}

function mix() {
  var status = "Mixing " + this.ingredients.join(", ");
  updateStatus.call(this, status);
  var that = this;
  setTimeout(function() {
    bake.call(that);
  }, 2000);
}

function cool() {
  var that = this;
  var status = "It has to cool! Hands off!";
  updateStatus.call(this, status);
  setTimeout(function() {
    that.decorate.call(that);
  }, 2000);
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  if (this.innerText == "Make Pie") {
    makePie.call(pie);
  } else if (this.innerText == "Make Cake") {
    makeCake.call(cake);
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  status = customer + ", your " + this.name + " is ready to eat! " + message;
  updateStatus.call(this, status);
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make");
  for (var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
