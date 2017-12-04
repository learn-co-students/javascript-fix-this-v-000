var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(() => {
      let thisDessert = this
      let thisCustomer = this.customer
      updateFunction(serve.apply(thisDessert, ["Happy Eating!", thisCustomer]))
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
  let cakeNode = this
  var updateCakeStatus = updateStatus.bind(cakeNode)
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  let pieNode = this
  var updatePieStatus = updateStatus.bind(pieNode)
  pie.decorate = cake.decorate.bind(pie)
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  let thisCool = cool.bind(this)
  // setTimeout(function() {
  //   thisCool(updateFunction)
  // }, 2000)
  setTimeout(() => {
    cool.call(this, updateFunction)
  },2000);

  updateFunction(status)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  let thisBake = bake.bind(this)
  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000);

  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(() => {
    this.decorate.call(this, updateFunction)
  }, 2000);

  updateFunction(status)
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked

  if(this.id === "cakeLink"){
    let cakeDiv = document.getElementById("cake")
    makeCake.call(cakeDiv)
  }
  else if(this.id === "pieLink"){
    let pieDiv = document.getElementById("pie")
    makePie.call(pieDiv)
  }
  // let cake = document.getElementById("cake")
  // let pie = document.getElementById("pie")
  // cake.addEventListener("click", makeCake)
  // pie.addEventListener("click", makePie)
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
