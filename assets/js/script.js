var currTime = moment();

$("#currentDay").html(currTime.format("LL"));
changeTimes();
displayEvents();
$(".saveBtn").on("click",function(){
    saveEvent($(this).parent());
   
});

function firstLoad(){
    localStorage.setItem("9am", "test");
}

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


}