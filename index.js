var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateFunction(status)
    setTimeout(() => {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
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

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ");
  updateFunction(status)
  setTimeout(() => { 
	  bake.call(this, updateFunction) 
  }, 2000)
	  
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime;
  updateFunction(status)
  setTimeout(() => { 
	  cool.call(this, updateFunction) 
  }, 2000)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!";
  updateFunction(status)
  setTimeout(() => { 
	  this.decorate.call(this, updateFunction) 
  }, 3000)
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

function makeCake() {

  var updateCakeStatus = updateStatus.bind(this);
   
  mix.call(cake, updateCakeStatus)

}

function makePie() {
  var updatePieStatus = updateStatus.bind(this); // this = the dom element for pie

  pie.decorate = cake.decorate.bind(pie); // binding to borrow function for later use.
  mix.call(pie, updatePieStatus)
}

function makeDessert() {
  (this.innerHTML == 'Make Cake') ? makeCake.call(this.parentElement) : makePie.call(this.parentElement);
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
