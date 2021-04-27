"use strict";
// const [button1] = document.getElementsByTagName("button");
// button1.addEventListener("click", (e) => {
//   console.log(e.target);
// });
// const img = document.querySelector(".art > img");
// const h1 = document.querySelector(".art > h1");
// const span = document.querySelector(".art > p > span");
// console.log(img, h1, span);
// function createAdder(n) {
//   return (m) => {
//     return (n += m);
//   };
// }
// const adder = createAdder(10);
// console.log(adder(10));
// console.log(adder(50));
// console.log(adder(100));

// const [btn1, btn2] = document.querySelectorAll("button");
// btn1.addEventListener("mouseenter", change);
// btn2.addEventListener("mouseenter", change);

// function change(e) {
//   const temp = btn2.innerText;
//   btn2.innerText = btn1.innerText;
//   btn1.innerText = temp;
// }

const buttons = document.querySelectorAll("button");
const setColor = ({ target:
  { dataset, parentNode }
}) => {
  parentNode.style.backgroundColor = dataset.color;
};

for (const btn of buttons) {
  btn.addEventListener("click", setColor);
}


const form = document.getElementById("form");
const arr = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const { target, target: { elements: { test: { value } } } } = event;
  arr.push(value);
  target.reset();
  const li = document.createElement('li');
  li.innerText = value;
  const del = document.createElement('button');
  del.innerText = "delete";
  del.addEventListener('click', (e) => {
    arr.splice(arr.indexOf(e.target.parentNode.childNodes[0].data), 1);
    console.dir(e.target.parentNode.childNodes[0].data)
    e.target.parentNode.remove()
  })
  li.append(del);
  const ul = document.getElementById('list');
  ul.append(li);
  })
