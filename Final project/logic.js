// Data to use in the project
var todos = [];
let tasksDOM = document.getElementById("table-body");
// read opearation: get all tasks
function readTasks() {
  tasksDOM.innerHTML = "";
  let index = 0;
  for (task of todos) {
    tasksDOM.innerHTML += `
          <tr class="table-row ${
            task.isDone ? "done-task" : ""
          }" id="table-row">
            <td class="task-data" id="task-data">
              <p id="task-title" class="task-title">${task.title}</p>
              <div id="date-container" class="date-container">
                <span class="material-symbols-outlined"> calendar_month </span>
                <p id="task-date" class="task-date">
                  <small>${task.date}</small>
                </p>
              </div>
            </td>
            <td id="update-action" class="update-action">
              <button 
                onclick="updateTask(${index})"
                id="update-btn"
                class="update-btn btn btn-outline-success rounded-button"
              >
                <span class="material-symbols-outlined"> edit </span>
              </button>
            </td>
            <td id="delete-action" class="delete-action">
              <button
                onclick="deleteTask(${index})"
                id="delete-btn"
                class="delete-btn btn btn-outline-success rounded-button"
              >
                  <span class="material-symbols-outlined"> delete </span>

              </button>
            </td>
            <td id="done-action" class="done-action">
              <button
                onclick="toggleTaskCompletion(${index})"
                id="done-btn"
                class="done-btn btn btn-outline-success rounded-button ${
                  task.isDone ? "green-btn" : ""
                }"
              >
                <span class="material-symbols-outlined"> ${
                  task.isDone ? "close" : "done"
                } </span>

              </button>
            </td>
          </tr>
    `;
    index++;
  }
}

getTasksFromLocalStorage();

readTasks();

// Create
document.getElementById("add-btn").addEventListener("click", function () {
  let newTaks = {
    title: prompt("أدخل إسم المهمة"),
    date: new Date().toLocaleDateString(),
    isDone: false,
  };
  todos.push(newTaks);
  storeTasksInLocalStorage();
  readTasks();
});

// Update
function updateTask(id) {
  let isConfirmed = confirm("هل أنت متأكد من تعديل: " + todos[id].title);
  if (isConfirmed) {
    todos[id].title = prompt("أدخل إسم المهمة", todos[id].title);
    storeTasksInLocalStorage();
    readTasks();
  }
}
// Delete
function deleteTask(id) {
  let isConfirmed = confirm("هل أنت متأكد من حذف: " + todos[id].title);
  if (isConfirmed) {
    todos.splice(id, 1);
    storeTasksInLocalStorage();
    readTasks();
  }
}
// Done
function toggleTaskCompletion(id) {
  todos[id].isDone = !todos[id].isDone;
  storeTasksInLocalStorage();
  readTasks();
}

function getTasksFromLocalStorage() {
  todos = JSON.parse(localStorage.getItem("tasks")) ?? [];
}

function storeTasksInLocalStorage() {
  // Turn the array to string
  // Local storage don't accept objects and arrays
  localStorage.setItem("tasks", JSON.stringify(todos));
}