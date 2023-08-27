async function newIP() {
  let rest = await fetch(`https://api.ipgeolocation.io/getip`);
  let data = await rest.json();
  search(data.ip);
}

window.addEventListener('load', ()=>{
  newIP();
})

let searchBtn = document.querySelector(".input__search span");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
  document.querySelector(".ip_address").textContent = ''
  document.querySelector(".location").textContent = ''
  document.querySelector(".timezone").textContent = ''
  document.querySelector(".isp").textContent = ''
  document.querySelector(".informations img").src = ``
  let inputValue = document.querySelector(".input__search input").value;
  search(inputValue); 
  });
}

async function search(adressIP) {
  let rest = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=71285892474b4b8db281d16ff764a845&ip=${adressIP}`
  );
  let data = await rest.json();
  console.log(data);
  document.querySelector(".ip_address").textContent = data.ip;
  document.querySelector(".location").textContent = data.time_zone.name;
  document.querySelector(".timezone").textContent =data.time_zone.current_time.slice(0, 19);
  document.querySelector(".isp").textContent = data.isp;
  document.querySelector(".informations img").src = data.country_flag;
  document.querySelector(".map").innerHTML=`<div id="map"></div>`
  
  let makerCoordinates = [Number(data.latitude), Number(data.longitude)];
  let map = L.map("map").setView(makerCoordinates, 16);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 21,
    attribution: "© OpenStreetMap contibutors",
  }).addTo(map);
  L.marker(makerCoordinates).addTo(map);
  map.flyTo(makerCoordinates, 14);
}
