var currTime = moment();

$("#currentDay").html(currTime.format("LL"));
changeTimes();
displayEvents();
backgroundChanger();

$(".saveBtn").on("click",function(){
    saveEvent($(this).parent());
   
});
$(".saveBtn").append("<img src='assets/images/floppy-disk.png'>");
setInterval(function(){
    var newMoment = moment();
    
    if(newMoment.format("HH")!= currTime.format("HH")){
        console.log("new hour");
        currTime=newMoment;
        changeTimes();
    }//if new hour

    backgroundChanger();
    console.log(newMoment.format("hh:mm"));
},60000);

function displayEvents() {

    $(".description").each(function() {

        var thisEvent = localStorage.getItem($(this).parent().parent().attr("data-save"));
        console.log("loading: "+thisEvent);
        if (thisEvent != null) {
            $(this).val(thisEvent);
        }
        else {
            localStorage.setItem($(this).attr("data-save"), " ");
        }

    });


}//displayEvents

function saveEvent(clicked) {
    var thisEvent = clicked.prev().children(".description").val();
    var saveSlot = clicked.parent().attr("data-save");
    console.log(thisEvent);
    console.log(saveSlot);
    localStorage.setItem(saveSlot,thisEvent);
}

function changeTimes() {
    $(".contentRow").each(function () {

        let rowHour = $(this).attr("data-hour");
        let currHour = currTime.format("HH");
        let relation = compareTimes(rowHour, currHour);
        if (relation === "second") {
            $(this).children(".eventCol").removeClass("present future").addClass("past");
        }//if past

        else if (relation == "same") {
            $(this).children(".eventCol").removeClass("past future").addClass("present");
        }

        else {
            $(this).children(".eventCol").removeClass("past present").addClass("future");
        }

    });


}//changeTimes

function compareTimes(first, second) {
    let fnum = parseInt(first);
    let snum = parseInt(second);


    if (fnum < snum) {
        return "second";
    }
    else if (fnum == snum) {
        return "same";
    }
    else {
        return "first";
    }


}//compare Times

function backgroundChanger(){
    /* background-color: #FC9C54; morning*/
    /* background-color: #FFE373; midday */
    /* background-color:#FD5E53; sunset*/
    /* background-color: #0f0b42; night  */
    
var hour = currTime.format("HH");

if (hour>=18 && hour < 22){
    $("body").css("background-color","#FD5E53");
}//if evening
else if(hour>=7 && hour <12){
    $("body").css("background-color"," #FC9C54");

}//if morning
else if(hour >=12 && hour <18){
    $("body").css("background-color","#FFE373");

}//if midday
else{
    $("body").css("background-color","#0f0b42");

}//else night






}