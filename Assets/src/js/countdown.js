function startCountdown(duration, updateFunction, finishFunction) {
    var timeInterval = setInterval(function () {
        updateFunction(duration);
        duration--;
        if (duration <= -1) {
            clearInterval(timeInterval);
            finishFunction();
        }
    }, 1000);
}

function secondsToMinutes(time) {
    var minutes, seconds;
    minutes = parseInt(time / 60, 10)
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}