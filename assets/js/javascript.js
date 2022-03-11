var containerBlockEl = document.querySelector(".container");
var saveBtnEl = $(".saveBtn");
var currentDayEl = document.querySelector("#currentDay");
var hourNow = moment().format('H').toString();
var allData = [];

// this function loops through all possible hours, assigns whether its AM or PM and calls the buildRow function
function buildAllRows() {
   // display todays date
   getDate();

   // loop through 8 hours to create rows
   for (i = 9; i <= 17; i++) {
      if (i < 12) {
         buildRow(i, "AM");
      } else {
         buildRow(i, "PM");
      }
   }
};

// this function creates each individual row of index.html
function buildRow(hour, timeOfDay) {
   var hourBlockEl = document.createElement("p");
   var descBlockEl = document.createElement("textarea");
   var saveBtnEl = document.createElement("button");
   var timeBlockEl = document.createElement("div");

   // create rows for the page
   timeBlockEl.className = "row time-block";
   timeBlockEl.setAttribute("id", hour);

   // create hour portion of time block
   // adjust 24-hour time to standard 12-hour time
   if (hour > 12) {
      var tempHour = hour - 12;
      hourBlockEl.className = "hour col-2";
      hourBlockEl.setAttribute("id", hour);
      hourBlockEl.textContent = tempHour + " " + timeOfDay;
      // append to hour block
      timeBlockEl.appendChild(hourBlockEl);
   } else {
      hourBlockEl.className = "hour col-2";
      hourBlockEl.setAttribute("id", hour);
      hourBlockEl.textContent = hour + " " + timeOfDay;
      // append to hour block
      timeBlockEl.appendChild(hourBlockEl);
   }

   // create text portion of time block
   descBlockEl.classList.add(setBlockColors(descBlockEl));
   descBlockEl.classList.add("description"); 
   descBlockEl.classList.add("col-8");
   descBlockEl.setAttribute("id", hour);

   // append to time block
   timeBlockEl.appendChild(descBlockEl);

   // create save button of time block
   saveBtnEl.className = "saveBtn col-2";
   saveBtnEl.setAttribute("id", hour);
   // append to time block
   timeBlockEl.appendChild(saveBtnEl);


   // push to index.html
   containerBlockEl.appendChild(timeBlockEl);
};

// function to get current date
function getDate() {
   // current day
   var now = moment().format('dddd, MMMM D');

   // append current day to index.html
   currentDayEl.append(now);
};

function setBlockColors(descBlockEl) {
   var hour = descBlockEl.getAttribute("id")

   if (hour == hourNow) {
      return "present"
   }
   else if (hour > hourNow) {
      return "future"
   } else {
      return "past"
   }
}

// this function is used to save individual time blocks to localStorage
function saveHour(id) {
   var timeBlock = [];
   var id = event.target.getAttribute("id");
   var desc = document.querySelector("textarea[id='" + id + "'").value;

   timeBlock = {
      hour: id,
      desc: desc
   };
   loadHour();
   allData.push(timeBlock);
   localStorage.setItem("timeBlock", JSON.stringify(allData));

};

// this function is used to load saved time blocks from localStorage
function loadHour() {

   allData = JSON.parse(localStorage.getItem("timeBlock"));
}

// event listener to populate the page on load
addEventListener("load", buildAllRows);
addEventListener("load", loadHour);

// event listener to save the time block on button click
$("body").on("click", ".saveBtn", function () {
   saveHour(this.id);
})