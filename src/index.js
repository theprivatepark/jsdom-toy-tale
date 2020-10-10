let addToy = false;

const URL = 'http://localhost:3000/toys/'
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  document.querySelector(".add-toy-form").addEventListener("submit", submitHandler)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// fetch methods 
function fetchToys() {
fetch('http://localhost:3000/toys', {})
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach((toy) => renderToys(toy))
  }
  )}
fetchToys()

// DOM Manipulation
function renderToys(toy) {
  let allToysDiv = document.getElementById("toy-collection")
  let oneToyDiv = document.createElement('div')
  oneToyDiv.className += ' card'
  allToysDiv.appendChild(oneToyDiv)
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')
  oneToyDiv.append(h2, img, p, button)

  h2.innerText = toy.name
  img.src = toy.image
  img.className += ' toy-avatar'

  p.innerText = `Likes: ${toy.likes}`
  button.innerText = "Like <3"
  button.className += ' like-btn'

  button.addEventListener("click", (event) => {
    addLikeFunction(event, toy, p)
  })

}

function submitHandler(event) {
  event.preventDefault()
  let toyData = {}; //toy object
  toyData.name = event.target[0].value;
  toyData.image = event.target[1].value;
  toyData.likes = 0

  let requestPackage = {};
  requestPackage.method = 'POST';
  requestPackage.headers = { 'Content-Type': 'application/json' };
  requestPackage.body = JSON.stringify(toyData);

  fetch(URL, requestPackage) // fetch takes in string + hash
    .then(response => response.json())
    .then(toy => renderToys(toy));
}

function addLikeFunction(event, toy, p) {
  toy.likes++
  let patchUrl = URL + toy.id

  let changeLikeRequest = {};
  changeLikeRequest.method = 'PATCH';
  changeLikeRequest.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  changeLikeRequest.body = JSON.stringify({"likes": toy.likes});

  fetch(patchUrl, changeLikeRequest)
    
  p.innerText = `Likes: ${toy.likes}`
}