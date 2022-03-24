let custom = document.getElementById("custom");
const bill = document.getElementById("bill");
const btn = document.querySelectorAll(".btn");
const peopleNumber = document.getElementById("number__of__people");
const tip = document.getElementById("tip");
const totalVal = document.getElementById("totalVal");
const form = document.getElementById("form");
const reset = document.getElementById("reset");

let billValue = 0;
let billBoolean = false;
let percentage = 0;
let numberOfPeople = 0;
let numberOfPeopleBoolean = false;

//Bill

bill.addEventListener("input", () => {
  if (bill.value.trim() === "") {
    setError(bill, "Can't be blank");
    billBoolean = false;
  } else if (parseFloat(bill.value.trim()) === 0) {
    setError(bill, "Can't be zero");
    billBoolean = false;
  } else if (parseFloat(bill.value.trim()) <= -1) {
    setError(bill, "Can't be negative");
    billBoolean = false;
  } else {
    removeErrors(bill);
    billValue = parseFloat(bill.value.trim());
    billBoolean = true;
  }
  calc();
});

//Buttons

btn.forEach((item, index) => {
  item.addEventListener("click", () => {
    btn.forEach((item) => {
      item.style.backgroundColor = "hsl(183, 100%, 15%)";
    });
    percentage = parseInt(item.innerHTML.slice(0, item.innerHTML.length - 1));
    item.style.backgroundColor = "hsl(172, 67%, 45%)";
    custom.value = "";
    calc();
  });
});

//Custom input
custom.addEventListener("focus", () => {
  percentage = 0;
  btn.forEach((item) => {
    item.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
});
custom.addEventListener("input", () => {
  if (custom.value.trim() === "") {
    percentage = 0;
  } else if (parseFloat(custom.value.trim()) === 0) {
    setError(custom, "Can't be zero");
    percentage = 0;
  } else if (parseFloat(custom.value.trim()) <= -1) {
    setError(custom, "Can't be negative");
    percentage = 0;
  } else if (parseFloat(custom.value.trim()) > 100) {
    setError(custom, "Can't be more than 100");
    percentage = 0;
  } else {
    removeErrors(custom);
    percentage = parseFloat(custom.value.trim());
  }
  calc();
});

//Number of People

peopleNumber.addEventListener("input", () => {
  if (peopleNumber.value.trim() === "") {
    setError(peopleNumber, "Can't be blank");
    numberOfPeopleBoolean = false;
  } else if (parseFloat(peopleNumber.value.trim()) === 0) {
    setError(peopleNumber, "Can't be zero");
    numberOfPeopleBoolean = false;
  } else if (parseFloat(peopleNumber.value.trim()) <= -1) {
    setError(peopleNumber, "Can't be negative");
    numberOfPeopleBoolean = false;
  } else {
    removeErrors(peopleNumber);
    numberOfPeople = parseFloat(peopleNumber.value.trim());
    numberOfPeopleBoolean = true;
  }
  calc();
});
// Calculate tip and total

const calc = () => {
  if (
    billBoolean === true &&
    numberOfPeopleBoolean === true &&
    percentage !== 0
  ) {
    const totalTip = billValue * (percentage / 100);
    tip.innerText = (totalTip / numberOfPeople).toFixed(2);
    totalVal.innerText = ((totalTip + billValue) / numberOfPeople).toFixed(2);
    reset.disabled = false;
  } else {
    tip.innerText = "0.00";
    totalVal.innerText = "0.00";
  }
};

//Reset Values
reset.addEventListener("click", () => {
  tip.innerText = "0.00";
  totalVal.innerText = "0.00";
  bill.value = "";
  custom.value = "";
  peopleNumber.value = "";
  btn.forEach((item) => {
    item.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
  reset.disabled = true;
  removeErrors(bill);
  removeErrors(custom);
  removeErrors(peopleNumber);
});

//Error handling functions

const setError = (input, message) => {
  const control = input.parentElement;
  const small = control.querySelector("small");
  small.innerText = message;
  control.className = "Input__control error";
};

const removeErrors = (input) => {
  const control = input.parentElement;
  const small = control.querySelector("small");
  small.innerText = "";
  control.className = "Input__control";
};
