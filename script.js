const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []

getRandomUser()

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  console.log(data);
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  console.log(newUser);
  addData(newUser);
}

// add user object
function addData(obj) {
  data.push(obj);
  updateDOM()
}

// double money
function doubleMoney(){
    data = data.map(function(user){
        // console.log(...user)
        return {...user, money: user.money * 2}
    })

    updateDOM();
}

// show only millionaires
function showMillionaires() {
    data = data.filter(person => person.money >= 1000000);

    updateDOM();
}

// sort by richest
function sortByRichest() {
    data.sort((a,b) => b.money - a.money)

    updateDOM()
}

// calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${wealth}</strong></h3>`;

    main.appendChild(wealthEl)
}

// updating the DOM
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong><strong>Wealth</strong></h2>'

  // const theArr = ['leo', 'ada', 'steven', 'kenneth']
  providedData.forEach(function(item) {
    const element = document.createElement('div');
    console.log(element);
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${item.money}`

    main.appendChild(element);
  })
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);