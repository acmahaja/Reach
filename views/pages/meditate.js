
function selectTime() {
    document.querySelector('h1').innerHTML = "hey."
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var broken = false;
    const length = duration;
    setInterval(function () {
        if (broken == true) {
            return;
        };
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // var audio = new Audio('sound.mp3');
            // audio.play();
            timer = duration;
            console.log(length);
            const printed = length/60; 
            broken = true;
            document.querySelector('#finished').style.display = 'block';
            document.querySelector('#finished').style.fontSize = '20px';
            // document.querySelector('#emoji').style.display = 'block';
            document.querySelector('#timedisplay').innerHTML = `Today's session was ${printed} minutes long~`;
            document.querySelector('#total').innerHTML = `${printed}`;
        }
    }, 1000);
}

function functSubmit(event) {
    const length = document.querySelector('#time').value;
    document.querySelector('#timedisplay').innerHTML = `Today's session is ${length} minutes long~`;
    display = document.querySelector('#timer');
    var seconds = length*60;
    document.querySelector("#timerobject").style.display = 'block';
    document.querySelector('#timerobject').style.fontSize = '30px';
    // var audio = new Audio('gong.mp3');
    // audio.volume = 0.4;
    // audio.play();
    startTimer(seconds, display);
  }

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#form1').addEventListener("submit", functSubmit);
    
    document.addEventListener('click', event => {
        const element = event.target;
        if (element.className === 'hide') {
            document.querySelector('#top').remove();
        }
    });
//setInterval(count, 1000) 
})




/* window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
}; */