var con = document.getElementById("con");
var area = document.getElementById("location");
var get = document.getElementById("get");

var dtime = document.getElementById("dtime");
var tzone = document.getElementById("tzone");
var interval;



var allzone = document.querySelector("#allzone");

var url = "https://worldtimeapi.org/api/timezone/";

fetch(url).then(res => res.json())
    .then(result => {

        result.map(e => {


            var option = document.createElement("option");
            option.innerText = e;
            allzone.appendChild(option);
        })
    }).catch(error => console.log(error));






    get.addEventListener("click", () => {
    if (con.value == "" && area.value == "") {
        alert("Please enter a city: ");
    }

    else {
        const continent = con.value;
        const city = area.value;
        console.log(continent);
        console.log(area)
        if(interval) {
            clearInterval(interval);
        }
        var url = `https://worldtimeapi.org/api/timezone/${continent}/${city}`;

        fetch(url).then(result => result.json()).then(fresult => {
            console.log(fresult);

            var dt = fresult.datetime;
            console.log(dt);

            var utc=fresult.utc_datetime

            dtime.innerHTML = "Date and   Time:   " + dt;

            var { timezone } = fresult;
            tzone.innerHTML = "timezone:" + timezone;


            var hrhand = document.getElementById("hrhand");
            var minhand = document.getElementById("minhand");
            var sechand = document.getElementById("sechand");
            
            var date =new Date(dt);


            var localTime = date.getTime();
             console.log(localTime);

            var localOffset = date.getTimezoneOffset() * 60000;
              console.log(localOffset);

            // obtain the UTC time in milliseconds

             var utc = localTime + localOffset;

             var {utc_offset} = fresult;
             const utc_off = utc_offset.split(":");
             const offset = parseFloat(parseInt(utc_off[0])+"."+parseInt(utc_off[1]));  
             console.log(offset);
             
             date = utc + (3600000 * offset);
             console.log(new Date(date));




             interval = setInterval(() => {
                 currentdate = new Date(date);
                 hrhand.style.transform = `rotate(${currentdate.getHours() * 30 + currentdate.getMinutes() / 2}deg)`;
                 minhand.style.transform = `rotate(${currentdate.getMinutes() * 6}deg)`;
                 sechand.style.transform = `rotate(${currentdate.getSeconds() * 6}deg)`;
                 date = date + 1000;
            }, 1000);
        })
    }

});





