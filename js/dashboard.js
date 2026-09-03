

// ======================================
// Daily Planner Dashboard
// Part 1
// ======================================

// ---------- Today's Date ----------

const todayDate = document.getElementById("todayDate");

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

todayDate.textContent =
    new Date().toLocaleDateString("en-US", options);


// ======================================
// Dark Mode
// ======================================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML="☀ Light Mode";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀ Light Mode";

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});


// ======================================
// Modal
// ======================================

// ======================================
// Modal
// ======================================

const modal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeModal = document.getElementById("closeModal");

if (addTaskBtn && modal) {

    addTaskBtn.onclick = () => {

    // Start a new task
    editIndex = -1;

    // Clear previous task details
    taskTime.value = "";
    taskName.value = "";
    taskDate.value = "";

    // Reset default values
    taskDay.value = "Monday";
    taskPriority.value = "Medium";

    // Open modal
    modal.style.display = "flex";
};
}

if (closeModal && modal) {

    closeModal.addEventListener("click", () => {

        modal.style.display = "none";

    });

}

window.addEventListener("click", (event) => {

    if (modal && event.target === modal) {

        modal.style.display = "none";

    }

});


// ======================================
// Calendar
// ======================================

const calendar = document.getElementById("calendar");

console.log(calendar);

let currentDate = new Date();

function generateCalendar() {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const today = new Date();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let html = `
        <div id="plannerCalendarHeader">

            <button type="button" id="prevMonth">◀</button>

            <h3>${monthNames[month]} ${year}</h3>

            <button type="button" id="nextMonth">▶</button>

        </div>

        <table class="calendar-table">

            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>

            <tbody>
                <tr>
    `;

    for (let i = 0; i < firstDay; i++) {
        html += `<td class="empty-day"></td>`;
    }

    for (let date = 1; date <= lastDate; date++) {

        const isToday =
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

        html += `
            <td
                class="calendar-day ${isToday ? "today" : ""}"
                data-date="${dateString}">
                ${date}
            </td>
        `;

        if ((date + firstDay) % 7 === 0 && date !== lastDate) {
            html += `
                </tr>
                <tr>
            `;
        }
    }

    html += `
                </tr>
            </tbody>

        </table>

        <div id="selectedDateTasks"></div>
    `;

    calendar.innerHTML = html;


    // Previous month
    document.getElementById("prevMonth").onclick = function () {

        currentDate.setMonth(currentDate.getMonth() - 1);

        generateCalendar();

    };


    // Next month
    document.getElementById("nextMonth").onclick = function () {

        currentDate.setMonth(currentDate.getMonth() + 1);

        generateCalendar();

    };


    // Calendar date click
    document.querySelectorAll(".calendar-day").forEach(day => {

        day.onclick = function () {

            // Remove previous selection
            document
                .querySelectorAll(".calendar-day")
                .forEach(d => d.classList.remove("selected"));

            // Highlight selected date
            day.classList.add("selected");

            // Get selected date
            const selectedDate = day.dataset.date;

            // Put selected date into task form
            taskDate.value = selectedDate;


            // Automatically determine day of week
            const [selectedYear, selectedMonth, selectedDayNumber] =
                selectedDate.split("-").map(Number);

            const selectedDay = new Date(
                selectedYear,
                selectedMonth - 1,
                selectedDayNumber
            );

            const dayNames = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];

            taskDay.value = dayNames[selectedDay.getDay()];


            // Show tasks for selected date
            const selectedDateTasks =
                document.getElementById("selectedDateTasks");

            const dateTasks = tasks.filter(
                task => task.date === selectedDate
            );


            if (dateTasks.length === 0) {

                selectedDateTasks.innerHTML = `
                    <h3>Tasks for ${selectedDate}</h3>
                    <p>No tasks scheduled for this date.</p>
                `;

            } else {

                selectedDateTasks.innerHTML = `
                    <h3>Tasks for ${selectedDate}</h3>
                    ${dateTasks.map(task => `
                        <div class="calendar-task">
                            <strong>${task.time}</strong>
                            — ${task.name}
                            <span>(${task.priority})</span>
                        </div>
                    `).join("")}
                `;

            }


            // Open Add Task modal
            modal.style.display = "flex";

        };

    });

}

generateCalendar();


// ======================================
// Notes
// ======================================

const notesBox=document.getElementById("notesBox");

const saveNotes=document.getElementById("saveNotes");

notesBox.value=localStorage.getItem("dailyNotes") || "";

saveNotes.onclick=()=>{

localStorage.setItem("dailyNotes",notesBox.value);

alert("Notes Saved Successfully!");

};


// ======================================
// Variables
// ======================================

let tasks=[];

const taskTable=document.getElementById("taskTable");
const searchTask = document.getElementById("searchTask");
const filterTask = document.getElementById("filterTask");

const progressFill=document.getElementById("progressFill");

const progressText=document.getElementById("progressText");

const totalTasks=document.getElementById("totalTasks");

const completedTasks=document.getElementById("completedTasks");

const pendingTasks=document.getElementById("pendingTasks");


// ======================================
// Weekly Lists
// ======================================

const weeklyLists={

Monday:document.getElementById("mondayList"),

Tuesday:document.getElementById("tuesdayList"),

Wednesday:document.getElementById("wednesdayList"),

Thursday:document.getElementById("thursdayList"),

Friday:document.getElementById("fridayList"),

Saturday:document.getElementById("saturdayList"),

Sunday:document.getElementById("sundayList")

};
// ======================================
// Add Task
// ======================================

const saveTask = document.getElementById("saveTask");

const taskTime = document.getElementById("taskTime");

const taskName = document.getElementById("taskName");

const taskDay = document.getElementById("taskDay");

const taskDate = document.getElementById("taskDate");

const taskPriority = document.getElementById("taskPriority");


let editIndex = -1;
saveTask.onclick = () => {

    if (taskTime.value === "" || taskName.value.trim() === "") {

        alert("Please enter task details.");

        return;

    }

    const task = {

        id: Date.now().toString(),

        time: taskTime.value,

        name: taskName.value.trim(),

        day: taskDay.value,

        date: taskDate.value,

        priority: taskPriority.value,

        completed: false

    };

    if (editIndex === -1) {

        tasks.push(task);

    } else {

        task.id = tasks[editIndex].id;

        task.completed = tasks[editIndex].completed;

        tasks[editIndex] = task;

        editIndex = -1;

    }

    saveTasks();

    renderTasks();

    modal.style.display = "none";

    taskTime.value = "";

    taskName.value = "";

    taskDay.value = "Monday";

    taskDate.value = "";

    taskPriority.value = "Medium";

};


// ======================================
// Render Tasks
// ======================================

function renderTasks() {

    taskTable.innerHTML = "";

    Object.values(weeklyLists).forEach(list => {
        list.innerHTML = "";
    });

    let filteredTasks = [...tasks];

    // Search
    const searchValue = searchTask.value.trim().toLowerCase();

    if (searchValue !== "") {

        filteredTasks = filteredTasks.filter(task =>
            task.name.toLowerCase().includes(searchValue)
        );

    }

    // Filter
    if (filterTask.value === "completed") {

        filteredTasks = filteredTasks.filter(task =>
            task.completed === true
        );

    }
    else if (filterTask.value === "pending") {

        filteredTasks = filteredTasks.filter(task =>
            task.completed === false
        );

    }

    // Sort by time
    filteredTasks.sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    filteredTasks.forEach(task => {

        const index = tasks.findIndex(t => t.id === task.id);

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${task.time}</td>

            <td>

                ${task.name}

                <br>

                <small class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </small>

                ${
                    task.date
                    ? `<br><small>📅 ${task.date}</small>`
                    : ""
                }

            </td>

            <td>

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

            </td>

            <td>

                <button onclick="editTask(${index})">
                    ✏
                </button>

                <button onclick="deleteTask(${index})">
                    🗑
                </button>

            </td>

        `;

        taskTable.appendChild(row);

    });


    // ======================================
// Weekly Planner
// ======================================

tasks
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))
    .forEach(task => {

        if (!weeklyLists[task.day]) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${task.time}</strong>
            - ${task.name}
            <br>
            <small class="priority ${task.priority.toLowerCase()}">
                ${task.priority}
            </small>
            ${
                task.date
                    ? `<br><small>📅 ${task.date}</small>`
                    : ""
            }
        `;

        if (task.completed) {

            li.style.textDecoration = "line-through";

            li.style.opacity = "0.6";

        }

        weeklyLists[task.day].appendChild(li);

    });


    updateProgress();

}


// ======================================
// Toggle Complete
// ======================================

window.toggleTask=function(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    renderTasks();

};



// ======================================
// Delete Task
// ======================================

window.deleteTask=function(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

    }

};



// ======================================
// Edit Task
// ======================================

window.editTask = function(index) {

    const task = tasks[index];

    taskTime.value = task.time || "";

    taskName.value = task.name || "";

    taskDay.value = task.day || "Monday";

    taskDate.value = task.date || "";

    taskPriority.value = task.priority || "Medium";

    editIndex = index;

    modal.style.display = "flex";

};



// ======================================
// Progress & Statistics
// ======================================

function updateProgress(){

    const total=tasks.length;

    const completed=tasks.filter(t=>t.completed).length;

    const pending=total-completed;

    const percent=total===0 ? 0 :

        Math.round((completed/total)*100);

    progressFill.style.width=percent+"%";

    progressText.textContent=percent+"%";

    totalTasks.textContent=total;

    completedTasks.textContent=completed;

    pendingTasks.textContent=pending;

}



// ======================================
// Local Storage
// ======================================

let saveTasks = function(){

    localStorage.setItem(
        "plannerTasks",
        JSON.stringify(tasks)
    );

};


function loadTasks(){

    const stored=

        localStorage.getItem("plannerTasks");

    if(stored){

        tasks=JSON.parse(stored);

    }

    renderTasks();

}



// ======================================
// Start
// ======================================

loadTasks();
searchTask.addEventListener("input", renderTasks);

filterTask.addEventListener("change", renderTasks);
// ======================================
// Firebase Integration
// Part 3
// ======================================

import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let currentUser = null;


// ======================================
// Load User Data
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    currentUser = user;

    const heading = document.querySelector(".topbar h1");

    if (heading) {

        heading.textContent =
            `Welcome, ${user.displayName || "User"} 👋`;

    }

    await loadCloudData();

});


// ======================================
// Save Everything
// ======================================

async function saveCloudData() {

    if (!currentUser) return;

    try {

        await setDoc(

            doc(db, "planner", currentUser.uid),

            {

                tasks: tasks,

                goals: goalBox.value,

                notes: notesBox.value,

                updatedAt: new Date().toISOString()

            }

        );

    }

    catch (error) {

        console.error(error);

    }

}


// ======================================
// Load Everything
// ======================================

async function loadCloudData() {

    if (!currentUser) return;

    try {

        const snapshot = await getDoc(

            doc(db, "planner", currentUser.uid)

        );

        if (snapshot.exists()) {

            const data = snapshot.data();

            tasks = data.tasks || [];

            goalBox.value = data.goals || "";

            notesBox.value = data.notes || "";

            renderTasks();

        }

    }

    catch (error) {

        console.error(error);

    }

}


// ======================================
// Auto Save Goals
// ======================================

saveGoals.onclick = async () => {

    localStorage.setItem(

        "dailyGoals",

        goalBox.value

    );

    await saveCloudData();

    alert("Goals Saved!");

};


// ======================================
// Auto Save Notes
// ======================================

saveNotes.onclick = async () => {

    localStorage.setItem(

        "dailyNotes",

        notesBox.value

    );

    await saveCloudData();

    alert("Notes Saved!");

};


// ======================================
// Override saveTasks()
// ======================================

const oldSaveTasks = saveTasks;

saveTasks = function () {

    oldSaveTasks();

    saveCloudData();

};


// ======================================
// Sync Every Minute
// ======================================

setInterval(() => {

    saveCloudData();

}, 60000);


// ======================================
// Before Closing Page
// ======================================

window.addEventListener(

    "beforeunload",

    saveCloudData

);


// ======================================
// Dashboard Ready
// ======================================

console.log("THIS IS MY NEW DASHBOARD");

window.scrollToSection = function(id){

    if(id==="top"){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        return;

    }

    document.getElementById(id).scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

};

searchTask.addEventListener("input", renderTasks);

filterTask.addEventListener("change", renderTasks);