const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
var savedDates;
var inserting=false;
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

let Today=date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        values=CheckDates(lastDateofLastMonth - i + 1,0);
        isToday=values.isToday
        valuesPrint=values.valuesPrint 
        liTag += `<li data-value="${valuesPrint}" class="${isToday}">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { 
        values=CheckDates(i,1);
        isToday=values.isToday
        valuesPrint=values.valuesPrint
        liTag += `<li data-value="${valuesPrint}" class="${isToday}" onclick='changeState(this)'>${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        values=CheckDates(i - lastDayofMonth + 1,2);
        isToday=values.isToday
        valuesPrint=values.valuesPrint
        liTag += `<li data-value="${valuesPrint}" class="${isToday}">${i - lastDayofMonth + 1}</li>`
    }
    
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    daysTag.innerHTML = liTag;
    ChangeHeader()
}


function futureValue(){
    if(savedDates.length==0){
        FutureOut="Today"
        OGDate=FutureDate=Today;
    }else{
        let maxDate = savedDates.reduce((max, current) => {
            return new Date(current.Date) > new Date(max.Date) ? current : max;
        });
        OGDate=maxDate.Date;
        let TheDate=new Date(maxDate.Date)
        TheDate.setDate(TheDate.getDate()+7);
        FutureOut=TheDate.toISOString().split("T")[0];
        FutureDate=FutureOut
    }
    FutureDateSet(FutureDate,OGDate);
    document.getElementById("okay").innerHTML=`Next: ${FutureOut}`;
}

function FutureDateSet(TheDate,OGDate){
    DatesV=document.querySelectorAll(".OkayDate");
    DatesV.forEach((element)=>{
        element.classList.remove("OkayDate")
    })
    NotDatesV=document.querySelectorAll(".NotOkayDate");
    NotDatesV.forEach((element)=>{
        element.classList.remove("NotOkayDate")
    })
    let i=1
    while(true){
        let className;
        if(i<5){
            className="NotOkayDate";
        }else{
            className="OkayDate";
        }
        let PrevDates=new Date(OGDate)
        PrevDates.setDate(PrevDates.getDate()+i);
        PrevDates=PrevDates.toISOString().split("T")[0];
        Datecal=document.querySelector('[data-value="'+PrevDates+'"]')
        i++;
        if(PrevDates>Today){
            break
        }
        if(!Datecal){
            continue
        }
        Datecal.classList.add(className)
        
    }
}


function CheckDates(i,Mode){
    let isToday;
    let MonthValue=currMonth
    let YearValue=currYear
    if(Mode==0){
        if(MonthValue==0){
            MonthValue=11;
            YearValue--
        }else{
            MonthValue--;
        }
    }else if(Mode==2){
        if(MonthValue==11){
            MonthValue=0;
            YearValue++
        }else{
            MonthValue++;
        }
    }
    
    let datevalue=`${YearValue}-${parseInt(MonthValue+1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    let valuesPrint=datevalue
    let isDateExist=savedDates.findIndex(item=>item.Date==datevalue);
    if(Mode==1){
        isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
    }else{
        isToday="inactive"
    }

    if(isDateExist!=-1){
        valuesPrint+="&2"
        if(isToday=="active"){
            isToday="Today";
        }else{
            isToday+=" SELECTED";
        }
    }
    data={"isToday":isToday,"valuesPrint":valuesPrint};
    return data
}


prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar(); 
    });
});

function loadData(data){
    savedDates=data;
    renderCalendar();
}

function ChangeHeader(){
    futureValue()
    if(savedDates.length==0){
        document.getElementById("gapDate").innerHTML=`Date Gap: No Date`
        return
    }
    let maxDate = savedDates.reduce((max, current) => {
        return new Date(current.Date) > new Date(max.Date) ? current : max;
    });
    value=DateDifference(maxDate.Date,Today)
    document.getElementById("gapDate").innerHTML=`Date Gap: ${value}`
    
}


function changeState(object){
    if(inserting){
        return
    }
    values=object.getAttribute("data-value");
    newValues=values.split('&');
    if(Today<newValues[0]){
        return;
    }
    if(newValues.length==1){
        
        if(Today==newValues[0]){
            object.classList.remove("active");
            object.classList.add("Today");
        }else{
            object.classList.add("SELECTED");
        }
        object.setAttribute("data-value",`${newValues[0]}&2`);
        savedDates.push({Date:newValues[0]})
    }else{
        if(Today==newValues[0]){
            object.classList.remove("Today");
            object.classList.add("active");
        }else{
            object.classList.remove("SELECTED");
        }
        object.setAttribute("data-value",`${newValues[0]}`);
        savedDates = savedDates.filter(item => !(item.Date == newValues[0]));
    }
    ChangeHeader()
    DateControl(newValues[0],newValues.length,object)
}


function DateControl(Values,Mode){
    inserting=true
    let dataToSend={Value:Values,Mode:Mode}
    $.ajax({
        url: "EditDate.php", 
        type: "POST",              
        data: dataToSend,          
        success: function(response) {
            inserting=false
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.log("AJAX error: " + status + " " + error);
        }
    });
}


function DateDifference(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const differenceInMilliseconds = Math.abs(secondDate - firstDate);
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
}
