// GLOBAL VARIABLES //

// variable to access the container element
var containerBlockEl = document.querySelector(".container");
// variable to access the save button element
var saveBtnEl = $(".saveBtn");
// variable to access the current day element
var currentDayEl = document.querySelector("#currentDay");
// variable to get current hour
var hourNow = moment().format('H');
// array for holding and manipulating localStorage
var allData = [];

// loops through loop and calls buildRow function on each loop
function buildAllRows() {
   // display todays date
   getDate();

   // loop through 8 hours to create rows
   // loop starts at 9 for 9AM and continues to 18, formatted for 24-hour time
   // this i variable is used as hour in various functions for ids for each html element
   for (var i = 9; i < 18; i++) {
      buildRow(i, "");
   }
};

// this function creates each individual row of index.html
function buildRow(hour) {
   // create each different html tag
   var hourBlockEl = document.createElement("p");
   var descBlockEl = document.createElement("textarea");
   var saveBtnEl = document.createElement("button");
   var timeBlockEl = document.createElement("div");

   // create rows (time block) for the page
   timeBlockEl.className = "row time-block";
   timeBlockEl.setAttribute("id", hour);

   // create hour portion of time block
   // adjust 24-hour time to standard 12-hour time

   // if hour is greater than 12, its afternoon, therefor PM is required text
   // also subtracts 12 from hour to display in 12-hour time
   if (hour > 12) {
      var timeOfDay = "PM"
      var tempHour = hour - 12;
      hourBlockEl.className = "hour col-2";
      hourBlockEl.setAttribute("id", hour);
      hourBlockEl.textContent = tempHour + " " + timeOfDay;
      // append to time block
      timeBlockEl.appendChild(hourBlockEl);

   // if hour is less than 12, its morning, therefor AM is required text
   } else if (hour < 12) {
      var timeOfDay = "AM"
      hourBlockEl.className = "hour col-2";
      hourBlockEl.setAttribute("id", hour);
      hourBlockEl.textContent = hour + " " + timeOfDay;
      // append to time block
      timeBlockEl.appendChild(hourBlockEl);
   }
   // else its noon, therefor PM is required text
   else {
      var timeOfDay = "PM"
      hourBlockEl.className = "hour col-2";
      hourBlockEl.setAttribute("id", hour);
      hourBlockEl.textContent = hour + " " + timeOfDay;
      // append to time block
      timeBlockEl.appendChild(hourBlockEl);
   }

   // create text portion of time block
   descBlockEl.setAttribute("id", hour);
   // calls setBlockColors to determine the color of the descBlockEl
   // based on what hour the block refers to and what time it currently is
   setBlockColors(descBlockEl);
   descBlockEl.classList.add("description");
   descBlockEl.classList.add("col-8");

   // append to time block
   timeBlockEl.appendChild(descBlockEl);

   // create save button of time block
   saveBtnEl.className = "saveBtn col-2";
   saveBtnEl.setAttribute("id", hour);
   saveBtnEl.innerHTML = '<i class="far fa-save"></i>';
   // append to time block
   timeBlockEl.appendChild(saveBtnEl);


   // push to index.html
   containerBlockEl.appendChild(timeBlockEl);
};

// function to get current date
function getDate() {
   // current day
   var now = moment().format('dddd, MMMM D');

   // append current day to currentDayEl
   currentDayEl.append(now);
};

// this function determines what color each description block will be based on
// what time it is
function setBlockColors(descBlockEl) {
   // get id, or what hour, in 24-hour format
   var hour = descBlockEl.getAttribute("id");
   hour = parseInt(hour);

   // if id from block is equal to the time
   // add present class to the descBlockEl
   if (hour == hourNow) {
      return descBlockEl.classList.add("present");
   }
   // if id from block is greater than the time
   // add future class to the descBlockEl
   else if (hour > hourNow) {
      return descBlockEl.classList.add("future");
   }
   // else id from block is less than the time
   // add past class to the descBlockEl
   else {
      return descBlockEl.classList.add("past");
   }
}

// this function is called on each save button click to save the respective
// time block to localStorage
function saveHour(id) {
   // getting the textarea that matches the passed id parameter from the button click
   var desc = document.querySelector("textarea[id='" + id + "'").value;

   // temp created object to be stored in allData array
   var timeBlock = {
      "hour": id,
      "desc": desc
   };

   // if allData contains data
   if (allData) {
      // loop over the array
      for (var i = 0; i < allData.length; i++) {
         // if allData key hour at index i matches the requested timeBlock hour addition
         if (allData[i].hour == timeBlock.hour) {
            // remove the old desc from allData and replace with new desc
            // this keeps the array to a max length of 8
            allData.splice(i, 1);
         }
      }
   }

   // push timeBlock object to allData array
   allData.push(timeBlock);

   // set allData array to localStorage
   localStorage.setItem("timeBlock", JSON.stringify(allData));
};

// this function is used to load saved time blocks from localStorage
function loadHour() {
   // variable used to select ALL the textarea elements
   var descBlockEl = document.querySelectorAll(".description");
   // update allData array with localStorage data
   allData = JSON.parse(localStorage.getItem("timeBlock"));

   // if allData contains data
   if (allData) {
      // double loop to iterate through localStorage and compare to textarea ids
      for (var i = 0; i < allData.length; i++) {
         // the var j loop is used to check each descBlockEl against every individual var i loop
         for (var j = 0; j < descBlockEl.length; j++) {
            // if the hour key in allData at index i is equal to the id of textarea element
            // at index j
            if (allData[i].hour == descBlockEl[j].getAttribute("id")) {
               // variable used to store the desc data saved in allData at index i
               var inText = allData[i].desc;
               // variable used to store which textarea element is being targeted
               var inTarget = descBlockEl[j];
               // add the text from allData array to the targeted textarea
               inTarget.textContent = inText;
            }
         }
      }
   
   } 
   // else, set all data to empty
   else {
      allData = [];
   }
}

// event listener to populate the page on load
addEventListener("load", buildAllRows);
// event listener to load the localStorage on load
addEventListener("load", loadHour);

// event listener to save the time block on button click
$("body").on("click", ".saveBtn", function () {
   saveHour(this.getAttribute("id"));
})