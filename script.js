const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
var savedDates;
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
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { 
        datevalue=`${currYear}-${parseInt(currMonth+1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

        isDateExist=savedDates.findIndex(item=>item.Date==datevalue);
        valuesPrint=datevalue;
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";

        if(isDateExist!=-1){
            valuesPrint+="&"+savedDates[isDateExist].ID
            if(isToday=="active"){
                isToday="Today";
            }else{
                isToday+=" SELECTED";
            }
        }
        
        liTag += `<li data-value="${valuesPrint}" class="${isToday}" onclick='changeState(this)'>${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    daysTag.innerHTML = liTag;
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


function changeState(object){
    values=object.getAttribute("data-value");
    newValues=values.split('&');
    if(newValues.length==1){
        if(Today==newValues[0]){
            object.classList.remove("active");
            object.classList.add("Today");
        }else{
            object.classList.add("SELECTED");
        }
    }else{
        if(Today==newValues[0]){
            object.classList.remove("Today");
            object.classList.add("active");
        }else{
            object.classList.remove("SELECTED");
        }
    }
    DateControl(((newValues.length==1)?newValues[0]:newValues[1]),newValues.length,object,newValues)
}


function DateControl(Values,Mode,object,newValues){
    let dataToSend={Value:Values,Mode:Mode}
    $.ajax({
        url: "EditDate.php", 
        type: "POST",              
        data: dataToSend,          
        success: function(response) {
            if(Mode==1){
                object.setAttribute("data-value",`${newValues[0]}&${response}`);
                savedDates.push({Date:newValues[0],ID:response})
            }else{
                object.classList.remove("SELECTED");
                object.setAttribute("data-value",`${newValues[0]}`);
                savedDates = savedDates.filter(item => !(item.Date == newValues[0] && item.ID == newValues[1]));
            }
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.log("AJAX error: " + status + " " + error);
        }
    });
}