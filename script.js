


// let timer;

// const { use } = require("react");

// let timeleft = 1*60;
// let isRunning = false;

// function updateDisplay(){
//     let minutes = Math.floor(timeleft/60);
//     let seconds = timeleft%60;
//     document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
// }

// function defaultDisplay(){
//     let defaultTime = 5*60;
//     timeleft=defaultTime;
//     let min = Math.floor(defaultTime/60);
//     let sec = defaultTime%60;
//     document.getElementById("timer-display").textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
// }

// document.getElementById("start").addEventListener("click",function(){

//     if(!isRunning){
//         isRunning = true;
//         timer = setInterval(() =>{
//             if(timeleft > 0){
//                 timeleft--;
//                 updateDisplay();
//                 document.getElementById("start").textContent = "Pause";
//             }
//             else{
//                 defaultDisplay();
//                 clearInterval(timer);
//                 isRunning = false;
//             }
//         },1000);
//     }
// });


// // pause

// document.getElementById("pause").addEventListener("click", function(){
//     if(isRunning){
//         isRunning = false;
//       let min = Math.floor(timeleft/60);
//     let sec = timeleft%60;
//     document.getElementById("timer-display").textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
//     }
//     else{
//         isRunning = true;
//         updateDisplay();

//     }
    
// });

// // reset


// document.getElementById("reset").addEventListener("click", function(){
//     timeleft=25*60;
//     let min = Math.floor(timeleft/60);
//     let sec = timeleft%60;
//     document.getElementById("timer-display").textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
// });


// updateDisplay();


let timer;
const alarmSound = document.getElementById("alarm");
let alarmTimeout;
let timeleft =  25*60;
let isRunning = false;
let isPaused = false;
let originalTime = timeleft;
let userInput = 0;

let clickSound = document.getElementById("mouse-click");

function playClicksound(){
    clickSound.currentTime = 0; // reset to start of audio
    clickSound.play();

}

function updateDisplay() {
  let minutes = Math.floor(timeleft / 60);
  let seconds = timeleft % 60;
  document.getElementById('timer-display').textContent = 
    `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
function defaultDisplay(){
    let defaultTime = 5*60;
    timeleft=defaultTime;
    let min = Math.floor(defaultTime/60);
    let sec = defaultTime%60;
    document.getElementById("timer-display").textContent = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function toggleButtons(started) {
  document.getElementById("start").classList.toggle("hidden", started);
  document.getElementById("create").classList.toggle("hidden", started);
  document.getElementById("pause").classList.toggle("hidden", !started);
  document.getElementById("reset").classList.toggle("hidden", !started);
}

function startTimer() {
  if (!isRunning || isPaused) { // two cases start and resume functions
    if (isPaused) {  // checking alrady paused
      isPaused = false;
    } else {
      isRunning = true;  // start btn clicked
      toggleButtons(true);
    }
    
    timer = setInterval(() => {
      if (timeleft > 0) { 
        timeleft--;
        updateDisplay();
      } else {
        //defaultDisplay();
        timeleft = userInput === 0 ? originalTime : userInput;  // time completed
       // timeleft = originalTime;
        // alarm rings

        //updateDisplay();
        clearInterval(timer);
        isRunning = false;  // since time complated running = false
        alarmSound.play();
        alarmTimeout = setTimeout(()=>{
            alarmSound.pause();
            alarmSound.currentTime  = 0;



        },600000);
        //toggleButtons(false); // after time changes toggle btns
        
      }
    }, 1000);
  }
}

// createfunctionality function

// function createFunction(){

  
// }

// Start
document.getElementById("start").addEventListener("click", ()=>{
    playClicksound();
    startTimer();
});

// Pause/Resume
document.getElementById("pause").addEventListener("click",function() {
  playClicksound();
  if (isRunning && !isPaused) {  // already running if clicks pause
    // Pause
    clearInterval(timer);
    isPaused = true;
    this.textContent = "Resume";
  } else if (isRunning && isPaused) {  // already running clicks resume
    // Resume
    startTimer();
    this.textContent = "Pause";
  }
});

// Reset
document.getElementById("reset").addEventListener("click",function(){
   playClicksound();
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
 timeleft = userInput === 0 ? originalTime : userInput;
 //timeleft = originalTime;
  updateDisplay();
  toggleButtons(false);
  alarmSound.pause();
  alarmSound.currentTime  = 0;

  document.getElementById("pause").textContent = "Pause";
   // if in case after pause direct reset then , 
  // after start pause wont be there resume will be
  // so change text to pause again .......
});

// create

// document.getElementById("create").addEventListener("click", () =>{
//   playClicksound();
//   createFunction();
// });


// Get elements
const createBtn = document.getElementById("create");
const customForm = document.getElementById("custom-form");
const timerForm = document.getElementById("timer-form");

// Show form when Create is clicked
createBtn.addEventListener("click", function() {
  playClicksound();
  customForm.classList.remove("hidden");
  setTimeout(() => customForm.classList.add("show"), 10);
});

// Handle form submission
timerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  playClicksound();

  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  
  timeleft = (hours*60*60) + (minutes * 60);
 userInput = timeleft;
  
  // Close form
  customForm.classList.remove("show");
  setTimeout(() => customForm.classList.add("hidden"), 300);
  
  // Start timer with custom duration
  startTimer();
});

// Close form when clicking outside (optional)
document.addEventListener("click", function(e) {
  if (!customForm.contains(e.target) && e.target !== createBtn) {
    customForm.classList.remove("show");
    setTimeout(() => customForm.classList.add("hidden"), 300);
  }
});


updateDisplay();
