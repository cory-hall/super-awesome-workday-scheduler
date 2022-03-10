var containerBlockEl = document.querySelector(".container");
var saveBtnEl = $(".saveBtn");

// this function loops through all possible hours, assigns whether its AM or PM and calls the buildRow function
function buildAllRows() {
   for (i = 9; i <= 17; i++) {
      if (i < 12) {
         buildRow(i, "AM");
      } else if (i === 12) {
         buildRow(i, "PM");
      } else {
         buildRow(i - 12, "PM");
      }
   }
};

// this function creates each individual row of index.html
function buildRow(hour, time) {
   var hourBlockEl = document.createElement("p");
   var descBlockEl = document.createElement("textarea");
   var saveBtnEl = document.createElement("button");
   var timeBlockEl = document.createElement("div");

   timeBlockEl.className = "row time-block";

   // create hour portion of time block
   hourBlockEl.className = "hour col-2";
   hourBlockEl.setAttribute("id", hour);
   hourBlockEl.textContent = hour + " " + time;
   // append to hour block
   timeBlockEl.appendChild(hourBlockEl);

   // create text portion of time block
   descBlockEl.className = "description col-8";
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

// this function is used to save individual time blocks to localStorage
function saveHour(id) {
   var timeBlock = [];
   var id = event.target.getAttribute("id");
   var desc = document.querySelector("textarea[id='" + id + "'").value;

   timeBlock = {
      "hour": id,
      "desc": desc
   };

   localStorage.setItem("timeBlock", JSON.stringify(timeBlock));
   console.log(timeBlock);

};

// this function is used to load saved time blocks from localStorage
function loadHour() {

}

// event listener to populate the page on load
addEventListener("load", buildAllRows);

// event listener to save the time block on button click
$("body").on("click", ".saveBtn", function(){
   saveHour(this.id);
})