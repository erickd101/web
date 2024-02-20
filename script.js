const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector(".today-btn"),
      gotoBtn = document.querySelector(".goto-btn"),
      dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

//Funcion que agrega los dias
function initCalendar(){
    //Obtener los dias anteriores, actuales y posteriores
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //Actualiza el mes actual
    date.innerHTML = months[month] + " " + year;

    //Agrega los dias en domingo
    let days = "";

    //Dias anteriores
    for(let x = day; x > 0; x--){
        days += `<div class="day prev-date"> ${prevDays -x +1}</div>`;
    }

    //Dias actuales
    for(let i = 1; i <= (lastDate); i++){
        if(i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth())
            days += `<div class="day today">${i}</div>`;
        
        //Agregar restantes
        else{
            days += `<div class="day"> ${i} </div>`; 
        }
    }

    //Dias del mes siguiente
    for(let j = 1; j <= nextDays; j++){
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

}

initCalendar();

//Mes anterior

function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}

//Mes siguiente

function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

//Agrega addListenner para mes anterior y siguiente
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//Agrega funcionalidad a goto y goto today
todayBtn.addEventListener("click", ()=>{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
} );

dateInput.addEventListener("input", (e)=> {
    //Permite solo numeros
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length == 2){
        //Agrega un slash cuando dos numeros son ingresados
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        //No permite mas de 7 caracteres
        dateInput.value = dateInput.value.slice(0,7);
    }
    if(e.inputType == "deleteContentBackward"){
        if(dateInput.value.length == 3){
            dateInput.value = dateInput.value.slice(0,2);

        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

//Funcion para ir a la fecha ingresada
function gotoDate(){
    const dateArr = dateInput.value.split("/");
    //Validar la fecha
    if(dateArr.length == 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4){
            month = dateArr[0] -1;
            year= dateArr[1];
            initCalendar();
            return;
        }
    }
    //Si la fecha es invalida
    alert("Por favor, ingrese una fecha valida");
}