
const inputContianer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEle = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button'); 
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let saveCountdown ;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;

const day = hour * 24;

// Set Date Input minimum with todays date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);


// Populate countdown
function updateDom(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second)


         //  Hide input
        inputContianer.hidden = true;

        // Check if countdown has ended
        if(distance < 0){
            countdownEle.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;

        }else{
            // Show countdown progress
                 //  Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;

            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEle.hidden = false;

        }

   
       
 
        
    }, 1000);
}  

function  updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    
    saveCountdown = {
        title:countdownTitle,
        date:countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));

   if(countdownDate === ''){
    alert('Please select a date for countdown')
   }else{
        // Get number version of current date
        countdownValue = new Date(countdownDate).getTime();

        updateDom();
    }
    
}
function reset(){
    // Hide Countdown and show inputs
    countdownEle.hidden = true;
    inputContianer.hidden = false;
    completeEl.hidden = true;

    clearInterval(countdownActive);
    // Reset values 
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')


}
// Get countdown from local storage

function restorePrevious(){

if (localStorage.getItem('countdown')){
    inputContianer.hidden = true;
    saveCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
}
}

// Event Listeners

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset)

restorePrevious()