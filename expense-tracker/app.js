// select elements
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const customAlert = document.querySelector('#alert');
const deleteAlert = document.querySelector('#delete');

// Init of local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// FUNCTIONS

function addTransaction(e) {
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    customAlert.classList.remove('hide');
    setTimeout(() => {
      customAlert.classList.add('hide');
    }, 3000);
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
}

// Generate random id
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM
function addTransactionDOM(transaction) {
  // get sign (minus or plus)
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}€</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((accumulator, item) => (accumulator += item), 0).toFixed(2);
  const income = amounts
                      .filter(item => item > 0)
                      .reduce((accumulator, item) => (accumulator += item), 0)
                      .toFixed(2);

                      
  const expense = (amounts
                    .filter(item => item < 0)
                    .reduce((accumulator, item) => (accumulator += item), 0) * -1).toFixed(2);


  balance.innerText = `${total}€`;
  moneyPlus.innerText = `${income}€`;
  moneyMinus.innerText = `${expense}€`;
}

// remove tr by id
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Init App
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
deleteAlert.addEventListener('click', e => {
  e.preventDefault();
  customAlert.classList.add('hide');

});