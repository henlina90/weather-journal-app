/* Global Variables */
const submitButton = document.querySelector("#generate");
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");
const API_KEY = "9af1284dc837da8d0270052841984f14";
const countryCode = "us";
const kelvinScale = 273.15;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

submitButton.addEventListener("click", async () => {
  const zipCode = document.querySelector("#zip").value;
  const apiData = await getWeatherData(zipCode);
  const cTemp = apiData.main.temp - kelvinScale;
  const fTemp = Math.round((cTemp * 9) / 5 + 32);
  const content = document.querySelector("#feelings").value;
  postData(fTemp, newDate, content);
});

function getData() {
  fetch("/getData")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      updateDataLog(result);
    });
}

function updateDataLog(result) {
  result.forEach((el) => {
    const temp = el.temp;
    const date = el.date;
    const content = el.content;
    tempElement.innerHTML = temp;
    dateElement.innerHTML = date;
    contentElement.innerHTML = content;
  });
}

async function getWeatherData(zipCode) {
  const apiData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
  return apiData;
}

function postData(fTemp, newDate, content) {
  fetch("/postData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: "date: " + newDate,
      temp: "temperature: " + fTemp,
      content: "mood: " + content,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      updateDataLog(result);
    });
}

getData();
