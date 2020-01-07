var currTime=moment();
var test = currTime.format("hh:mm");
console.log(currTime);
console.log(currTime._d);
console.log(test);
console.log(currTime.format("LL"));

$("#currentDay").html(currTime.format("LL"));


changeTimes();

function changeTimes(){
$(".contentRow").each(function(){
   console.log("Is "+currTime.format("HH") + " before "+ $(this).attr("data-hour"));
    console.log($(this).attr("data-hour") < currTime.format("HH")); 
   let rowHour=$(this).attr("data-hour");
   let currHour = currTime.format("HH");
   let relation = compareTimes(rowHour,currHour);
   if(relation==="second"){
            $(this).removeClass("present future").addClass("past");
        }//if past
 
        else if(relation=="same"){
         $(this).removeClass("past future").addClass("present");
        }
 
        else{
         $(this).removeClass("past present").addClass("future");
        }
 
});


}//changeTimes

function compareTimes(first, second){
    let fnum=parseInt(first);
    let snum=parseInt(second);


    if(fnum< snum){
        return "second";
    }
    else if(fnum == snum){
        return "same";
    }
    else{
        return "first";
    }


}