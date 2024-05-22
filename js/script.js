"use strict";

const usz = document.querySelector("#usz"),
  usd = document.querySelector("#usd"),
  alerts = document.querySelector(".alert"),
  inner = alerts.querySelector("div"),
  btn = document.querySelector(".btn"),
  rounded = document.querySelector(".rounded");

console.log(inner.innerHTML);

usz.addEventListener("input", (e) => {

  console.log(e.data);


  fetch("json/current.json")
    .then(data => {
      return data.json();
    })
    .then(data => {
      usd.value = (+`${usz.value}` / data.current.usd).toFixed(2) + ' $';
      console.log(console.log(data.current.usd));
      if (usd.value === "NaN $") {
        alerts.style.top = "2%";
        alerts.style.transition = "1s";
        alerts.style.display = "block";
      } else if (usz.value === "" && usd.value === "0.00 $") {
        alerts.style.display = "block";
        alerts.style.top = "-15%";
        alerts.style.transition = "1s";
        rounded.reset();
      }
    }).catch(() => {
      usd.value = "Something went wrong";
      alerts.style.top = "2%";
      alerts.style.transition = "1s";
      alerts.style.display = "block";
      alerts.textContent = "Server bilan hatolik aniqlandi"
      if (usz.value == "" && usd.value == "Something went wrong") {
        alerts.style.display = "block";
        alerts.style.top = "-15%";
        alerts.style.transition = "1s";
        rounded.reset();
        alerts.textContent = "Kechirasiz sizda xatolik yuz berdi"
      }
    })
});

btn.addEventListener("click", () => {
  alerts.style.display = "block";
  alerts.style.top = "-8%";
  alerts.style.transition = "0.5s";
  usd.value = ""
  usz.value = ""
});


const reqi = new XMLHttpRequest()