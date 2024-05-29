
var datetime=new Date();
console.log(datetime);
document.getElementById("time").textContent=datetime.toLocaleTimeString();

function refreshTime(){
    const timeDisplay=document.getElementById("time");
    const timeString=new Date().toLocaleTimeString();
    timeDisplay.textContent=timeString;
}
    setInterval(refreshTime, 1000);

