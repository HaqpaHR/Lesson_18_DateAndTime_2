// К предыдущему ДЗ "Дата и время" добавить выпадающий список (select) с форматами дат. При переключении, время должно отображаться в другом формате. При первом открытии страницы брать первый формат.
// Форматы:
// HH:MM:SS
// H:M AM/PM
// YYYY-MM-DD HH:MM
const timeType = ["HH:MM:SS","H:M AM/PM"," YYYY-MM-DD HH:MM"]
let type = "type_0";

function createSelectElement(arr) {
    const select = document.createElement("select");
    for(let i = 0; i < arr.length; i++){
        const option = document.createElement("option");
        option.value = "type_" + i;
        option.innerText = arr[i];
        select.appendChild(option)
    };
    return select    
}

function getOrdinaryTime(){

     const time = new Date();
     let hours = time.getHours();
     if (hours < 10) hours = '0' + hours;

     let minutes = time.getMinutes();
     if (minutes < 10) minutes = '0' + minutes;

     let seconds = time.getSeconds();
     if (seconds < 10) seconds = '0' + seconds;

     str = hours + ":" + minutes + ":" + seconds;

     return str
}

function getShortTime() {
    const time = new Date();
    let hours = time.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = time.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    let amPm = (hours > 12) ? "PM" : "AM";

    str = hours + ":" + minutes + " " + amPm;

    return str
};

function getFullTime(){
    const time = new Date();
    let hours = time.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = time.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    let year = time.getFullYear();

    let month = time.getMonth();
    if(month < 10) month = '0' + month;

    let day = time.getDate();
    if(day < 10) day = '0' + day;

    str = year + "-" + month + "-" + day + " " + hours + ":" + minutes;

    return str
};

function makeContainer(time) {
   const timeDiv = document.createElement("div");
   timeDiv.className = "clock";
     for(let i = 0; i < time.length; i++){
        const div = document.createElement("div");
        div.className = "time" + i;
        div.style.color = colorRandom();
        timeDiv.appendChild(div)
     }
   return timeDiv;
}

const selectedFormat = document.body.appendChild(createSelectElement(timeType))


function typeOfTyme(type) {
    switch(type){
        case "type_0":
            return getOrdinaryTime();
        case "type_1":
            return getShortTime();
        case "type_2":
            return getFullTime();
        default: false
    }
};

function makeTimeOnScreen(time){
    const container = document.body.querySelector("div");
    const newContainer = makeContainer(typeOfTyme(type));
    if(container) document.body.replaceChild(newContainer, container);
    const clock = document.body.querySelector(".clock");
    if(clock){
        const clockDivs = clock.querySelectorAll("div");
        for(let i = 0; i < time.length; i++){
            clockDivs[i].innerText = time[i]
        }
    }
}


selectedFormat.addEventListener("change", (event) => {
    type = event.target.value;
})

document.body.appendChild(makeContainer(typeOfTyme(type)));

setInterval(() => makeTimeOnScreen(typeOfTyme(type)), 1000);


function colorRandom() {
    let color = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    return color
}
