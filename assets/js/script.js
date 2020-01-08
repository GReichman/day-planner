var currTime = moment();
var savedEvents = [];

$("#currentDay").html(currTime.format("LL"));
changeTimes();
getEvents();
displayEvents();
function getEvents() {
    var events = JSON.parse(localStorage.getItem("events"));
    console.log(events);

    if (events == null) {
        console.log("hi");
        events = [" ", " ", " ", " ", " ", " ", " ", " ", " Time For A Beer"];
        localStorage.setItem("events",JSON.stringify(events));
        savedEvents = events;
    }//if first time running site

    else{
        savedEvents = events;

    }

}//get events

function storeEvents() {
    localStorage.setItem("events", JSON.stringify(savedEvents));

}//storeEvents

function displayEvents() {

    var pos = 0;

    $(".description").each(function () {
        // console.log(savedEvents[pos]+" "+pos);
        $(this).val(savedEvents[pos]);
        pos++;
    });


}//displayEvents

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


}