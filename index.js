"use strict"
// ============preloder======================

// const preloader = document.querySelector(".preloader");

// window.addEventListener("load", function () {
//   preloader.classList.add("hide-preloader");
// });


// ========= fetch API =================================================================================

async function search(cityName) {
  let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${cityName}&days=3`);
  if (t.ok && 400 != t.status) {
    let a = await t.json();
      displayCurrent(a.location, a.current), displayNext(a.forecast.forecastday);
  }
}
// =========================================================================================

document.getElementById("search").addEventListener("keyup", (e) => {
  search(e.target.value);
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




function displayCurrent(a , t) {
  if (null != t) {
    let e = new Date(t.last_updated);
      let n = ` <div class="col-md-4 my-2  p-0 bg-dark  border border-top-0 bg-opacity-50 rounded rounded-5">
      <div  class=" d-flex justify-content-between p-1 border rounded rounded-5 px-5 bg-dark ">
      <p class="m-0 text-white">${days[e.getDay()]}</p>
        <p class="m-0 text-white">${e.getDate()} ${ monthNames[e.getMonth()]}</p>
    </div>
<div class="px-4 py-2">
      <p class="fw-bold text-white fs-4" >${a.name}</p>
  <div class="d-flex justify-content-between ">
        <p class=" text-white fw-bolder" style="font-size: 5rem;">${t.temp_c}<span>&#8451;</span></p>
        <img src="https:${t.condition.icon}" alt="" width="150" >
  </div>
  <p class=" fw-bolder text-info">${t.condition.text}</p>
  <div class=" d-flex ">
         <i class=" fas fa-umbrella fs-4 pe-1 me-3 text-white-50"> <span class=" text-light">${t.precip_in}%</span> </i> 
         <i class=" fas fa-wind pe-1 fs-4 me-3 text-white-50">  <span class=" px-1 text-light">${t.wind_kph} km/h</span> </i> 
         <i class=" fas fa-compass fs-4 pe-1 text-white-50">  <span class=" text-light">${t.wind_dir}</span>  </i> 
  </div>
</div>
    </div>`;
      document.getElementById("currentDayweather").innerHTML = n;
  }
}

function displayNext(a) {
  let t = "";
  for (let i = 1; i < a.length; i++) {
    let x = new Date(a[i].date)
    t += `  <div class="col-md-4 my-2  text-center bg-dark border border-top-0 bg-opacity-50 p-0   rounded rounded-5">
      <div  class="  p-1 bg-dark border rounded rounded-5">
      <p class="m-0 text-white">${days[x.getDay()]}</p>
    </div>
<div class="px-4 py-5  ">
  <div class="  ">
    <img src="https:${a[i].day.condition.icon}" alt="" width=48>
        <p class=" text-white fw-bolder" style="font-size: 3rem;">${a[i].day.maxtemp_c}<span>&#8451;</span></p>
        <p class=" text-white fw-bolder" style="font-size: 1rem;">${a[i].day.mintemp_c}<span>&#8451;</span></p>
        <p class=" fw-bolder text-info">${a[i].day.condition.text}</p>

  </div>
</div>
    </div>`
  };
  document.getElementById("currentDayweather").innerHTML += t;
}


search("cairo")

