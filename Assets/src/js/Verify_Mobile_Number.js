function updateVerfiyNumberCountdown(time) {
    $('#countdownNumber').text(secondsToMinutes(time));
}

function finishVerfiyNumberCountdown() {
    $('#countdownLabel').hide();
    $('#finishedCountdownLabel').show();
    $('#Resend').attr("disabled", false);
}

function startVerifyNumberCountdown(expiryTime) {
    $('#countdownLabel').show();
    $('#finishedCountdownLabel').hide();
    updateVerfiyNumberCountdown(expiryTime);
    startCountdown(expiryTime - 1, updateVerfiyNumberCountdown, finishVerfiyNumberCountdown);
}