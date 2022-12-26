
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function ConvertMsToTime(millis: number) {
    var minutes: number = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    var hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours) != '00' ? `${padTo2Digits(hours)} hr` : ''} 
    ${padTo2Digits(minutes) != '00' ? `${padTo2Digits(minutes)} min` : ''} 
    ${padTo2Digits(seconds,)} sec`;
}

export function millisToMinutesAndSeconds(millis: number) {
    var minutes: number = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return (
        seconds == 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

export function randomBgColor() {
    var x = Math.floor(Math.random() * 255);
    var y = Math.floor(Math.random() * 255);
    var z = Math.floor(Math.random() * 255);
    var bgColor = "rgb(" + x + "," + y + "," + z + ",0.4)";

    return bgColor
}

export function randomBrightBgColor() {
    var x = Math.floor(Math.random() * 255);
    var y = Math.floor(Math.random() * 255);
    var z = Math.floor(Math.random() * 255);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";

    return bgColor
}