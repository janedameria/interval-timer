const infoworkout = document.getElementById('info-workout');
const inforest = document.getElementById('info-rest');
const inforound = document.getElementById('info-round');
const infototal = document.getElementById('info-total');
const timer = document.getElementById('timer');
const roundtimer = document.getElementById('round-timer');
const activity = document.getElementById('activity');

let workouttime = 0;
let resttime = 0;
let workouttotal = 0;
let roundtotal = 0;
let roundtotal_temp = 0;
let countdown_second = 0;
let countdown;

playbtn.addEventListener('click', play);
pausebtn.addEventListener('click', pause);
stopbtn.addEventListener('click', stop);

document.getElementById("pausebtn").disabled = true;
document.getElementById("stopbtn").disabled = true;
document.getElementById("playbtn").disabled = true;
document.getElementById("submitbtn").disabled = false;

function play() {
  document.getElementById("playbtn").disabled = true;
  document.getElementById("submitbtn").disabled = true;
  document.getElementById("pausebtn").disabled = false;
  document.getElementById("stopbtn").disabled = false;
  countdown = setInterval(tick, 1000)
}

function tick() {
  document.getElementById("submitbtn").disabled = true;

  if (countdown_second <= 0) {
    clearInterval(countdown_second = 0);
    document.getElementById("pausebtn").disabled = true;
    document.getElementById("stopbtn").disabled = true;
    document.getElementById("playbtn").disabled = false;
    if (roundtotal_temp < roundtotal) {
      roundtotal_temp++;
      countdown_second = workouttotal + 1;
    }
  }
  roundtimer.textContent = "Round " + roundtotal_temp;
  timer.textContent = countdown_second > resttime ? countdown_second - resttime - 1 : countdown_second;
  if (countdown_second > resttime) {
    activity.textContent = "Workout";
    activity.style.color = "black";
    timer.style.color = "black";
    roundtimer.style.color = "black";

  }

  else {
    activity.textContent = "Rest";
    activity.style.color = "#5E723F";
    timer.style.color = "#5E723F";
    roundtimer.style.color = "#5E723F";
  }

  countdown_second--;
  if (countdown_second == -1) {
    setTimeout(completed, 1000);
  }
}

function completed() {
  clearInterval(countdown);
  document.getElementById("pausebtn").disabled = true;
  document.getElementById("stopbtn").disabled = true;
  document.getElementById("playbtn").disabled = true;
  document.getElementById("submitbtn").disabled = false;

  activity.textContent = "Workout Completed!";
  activity.style.color = "#F84F34";
  timer.textContent = "";
  roundtimer.textContent = "";
}

function pause() {
  clearInterval(countdown);
  document.getElementById("playbtn").disabled = false;
  document.getElementById("pausebtn").disabled = true;
  document.getElementById("stopbtn").disabled = false;
  document.getElementById("submitbtn").disabled = false;
}

function stop() {
  clearInterval(countdown);
  document.getElementById("pausebtn").disabled = true;
  document.getElementById("stopbtn").disabled = true;
  document.getElementById("playbtn").disabled = false;
  document.getElementById("submitbtn").disabled = false;
  start();
}

function submit() {
  document.getElementById('empty-text').textContent = "";

  let workoutminutes = document.getElementById('workoutminutes').value;
  let workoutseconds = document.getElementById('workoutseconds').value;
  let restminutes = document.getElementById('restminutes').value;
  let restseconds = document.getElementById('restseconds').value;
  let round = document.getElementById('round').value;

  if (workoutminutes == "") workoutminutes = 0;
  if (workoutseconds == "") workoutseconds = 0;
  if (restminutes == "") restminutes = 0;
  if (restseconds == "") restseconds = 0;

  workoutminutes = parseInt(workoutminutes);
  workoutseconds = parseInt(workoutseconds);
  restminutes = parseInt(restminutes);
  restseconds = parseInt(restseconds);

  workouttime = (workoutminutes * 60) + workoutseconds;
  resttime = (restminutes * 60) + restseconds;

  if (checkInput(round, workoutminutes, workoutseconds, restminutes, restseconds)) {
    showWorkoutInfo(round, workouttime, resttime);
    start(round);
    console.log(round);    
  }
}

function start(round){
  document.getElementById("playbtn").disabled = false;
  workouttotal = workouttime + resttime;
  roundtotal = round;
  countdown_second = workouttotal + 1;
  roundtotal_temp = 1;

  timer.textContent = workouttime;
  roundtimer.textContent = "Ready";
  activity.textContent = "Starting"; 
  activity.style.color = "black";
  timer.style.color = "black";
  roundtimer.style.color = "black";
}

function checkInput(round, workoutminutes, workoutseconds, restminutes, restseconds) {
  if (workoutminutes < 0 || workoutseconds < 0 || restminutes < 0 || restseconds < 0) {
    document.getElementById('empty-text').textContent = "Input can't be below zero.";
    return false;
  }

  if (workoutminutes == 0 && workoutseconds == 0) {
    document.getElementById('empty-text').textContent = "Both workout time value can't be zero.";
    return false;
  }

  if (restminutes == 0 && restseconds == 0) {
    document.getElementById('empty-text').textContent = "Both rest time value can't be zero/empty.";
    return false;
  }

  if (round == 0 || round == "") {
    document.getElementById('empty-text').textContent = "Round value can't be zero/empty.";
    return false;
  }

  else {
    return true;
  }
}

function showWorkoutInfo(round, workoutTotal, restTotal) {
  inforound.textContent = round;

  round = parseInt(round);
  infoworkout.textContent = workoutTotal + ` seconds.`
  inforest.textContent = restTotal + ` seconds.`;

  let total = (workoutTotal + restTotal) * round;
  let minutes = Math.floor(total / 60);
  let seconds = total % 60;

  infototal.textContent = minutes + ` minutes and ` + seconds + ` seconds.`;
}
