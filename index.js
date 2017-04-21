var cake = { //defines a bunch of attributes and sets decorate to a arrow function
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) { //here is the function
    var status = "Decorating with " + this.topping + ". Ready to eat soon!" //var set to string with current object topping
    updateFunction(status) //callback function being passed into function(updateFunction) with parameter var status/string
    setTimeout(() => { //sets arrow function to update status in 2 seconds - arrow function was used because it's non-binding
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer])) //update function uses apply method to utilize serve function after two seconds
    }, 2000)
  }
}

var pie = { //var pie sets pie attributes
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() { //function that 'makes cake'
  var updateCakeStatus = updateStatus.bind(this) //sets var that is binding 'this' object to updateStatus function
  updateCakeStatus("Prep") //calls var function that updates status in html
  mix.call(cake, updateCakeStatus) //calls cake object and updateCakeStatus on mix function
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this) //sets var to updateStatus function with this object bind-ed to the function 
  updatePieStatus("Prep") //calls updatePieStatus function and passes 'Prep' in
  pie.decorate = cake.decorate.bind(pie) //utilizes cake decorate method by calling it with 'bound' pie attributes
  mix.call(pie, updatePieStatus) //calls pie object literal and updatePieStatus function on mix function
}

function updateStatus(statusText) { 
  this.getElementsByClassName("status")[0].innerText = statusText
} //grabs first status class inner text and sets it to the parameter value

function mix(updateFunction) { 
  var status = "Mixing " + this.ingredients.join(", ") //this is either from makeCake || makePie
  setTimeout(() => { //sets timeout for 2 seconds
    bake.call(this, updateFunction) //then calls this and updateFunction on bake function
  }, 2000)
  updateFunction(status)
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
  updateFunction(status)
}

function makeDessert() {
  if(this.parentNode.id === "cake") {
    makeCake.call(this.parentNode)
  } else {
    makePie.call(this.parentNode)
  }
}

function serve(message, customer) {
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) { //event listener for click
  var cookLinks = document.getElementsByClassName("js-make") //sets var to document class name
  for(var i=0; i<cookLinks.length; i++) { //loops 
    cookLinks[i].addEventListener("click", makeDessert) 
  }
});