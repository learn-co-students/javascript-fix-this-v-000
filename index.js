var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    console.log("In decorate")
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(function() {
      updateFunction(serve.apply(this, "Happy Eating!", this.customer))
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

function makeDessert() {
  if (this.parentNode.id == "cake"){
    makeCake.call(this.parentNode);
  } else {
    makePie.call(this.parentNode);
  }
}

function makeCake() {
  console.log("In makeCake")
  var updateCakeStatus = updateStatus.bind(this);
  mix.call(cake, updateCakeStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function makePie() {
  let updatePieStatusFn = updateStatus.bind(this);
  mix(updatePieStatusFn)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(() => bake.call(this, updateFunction), 2000)
  updateFunction(status)
  // This is one way to do it. Took a screenshot of the other way
  // setTimeout(callback.bind(this), 2000)
  // The 'this' of native functions is different
}

function bake(updateFunction) {
  console.log("In bake")
  console.log("Bake's this: ", this)
  var status = "Baking at o" + this.bakeTemp + " for " + this.bakeTime
  console.log(status)
  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  console.log("In cool")
  console.log("Cool's this: ", this)
  var status = "It has to cool! Hands off!"
  setTimeout(function() {
    console.log("Cool setTimeout Func's 'this': ", this)
    this.decorate(updateFunction)
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
