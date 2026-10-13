// HTML ke elements pakdo
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

// Pehle se saved kaam laao (browser ki memory se)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Kaam ko browser me save karo
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Screen par saare kaam dikhao
function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.onchange = function () {
            tasks[index].done = !tasks[index].done;
            save();
            showTasks();
        };

        // Kaam ka text
        const text = document.createElement("span");
        text.textContent = task.text;

        // Delete button
        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete";
        del.onclick = function () {
            tasks.splice(index, 1);
            save();
            showTasks();
        };

        li.append(checkbox, text, del);
        taskList.appendChild(li);
    });

    // Kitne kaam bache hain
    const pending = tasks.filter(function (t) { return !t.done; }).length;
    count.textContent = tasks.length === 0
        ? "Koi kaam nahi hai"
        : pending + " kaam baaki hain";
}

// Naya kaam jodo
function addTask() {
    const value = taskInput.value.trim();
    if (value === "") return;

    tasks.push({ text: value, done: false });
    taskInput.value = "";
    save();
    showTasks();
}

addBtn.onclick = addTask;

// Enter dabane par bhi kaam add ho
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
});

// Page khulte hi list dikhao
showTasks();
