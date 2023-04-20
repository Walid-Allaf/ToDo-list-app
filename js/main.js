let search = document.querySelector(".form .input"),
  input = document.querySelector(".new .input"),
  addBtn = document.querySelector(".add"),
  tasksDiv = document.querySelector(".tasks"),
  overlay = document.querySelector(".overlay"),
  tasksArray = [];

// Check If There Is Tasks In Local Storage
if (window.localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
  addTaskToDocument(tasksArray);
}

// Done Button
addBtn.addEventListener("click", () => {
  if (input.value != "") {
    creatTask(input.value);
    input.value = "";
    document.querySelector(".new").style.transform = "translate(-50%, 100px)";
    overlay.style.display = "none";
  }
});

// Add Button
let addNew = document.querySelector(".add-new");
addNew.addEventListener("click", () => {
  document.querySelector(".new").style.transform = "translate(-50%, 0)";
  overlay.style.display = "block";
  input.focus();
  overlay.addEventListener("click", () => {
    document.querySelector(".new").style.transform = "translate(-50%, 100px)";
    overlay.style.display = "none";
  });
});

// Search Field
search.addEventListener("focus", () => {
  if (search.style.width != "80%") {
    addNew.style.display = "none";
    search.style.width = "80%";
    let span = document.createElement("span");
    span.append(document.createTextNode("Cancel"));
    setTimeout(() => {
      document.querySelector(".form").appendChild(span);
    }, 100);

    span.addEventListener("click", () => {
      addNew.style.display = "none";
      document.querySelector(".form").lastChild.remove();
      search.style.width = "100%";
      search.value = "";
      addTaskToDocument(tasksArray);
    });
  }
});

search.addEventListener("blur", () => {
  if (search.value == "") {
    addNew.style.display = "flex";
    document.querySelector(".form").lastChild.remove();
    search.style.width = "100%";
    search.value = "";
    addTaskToDocument(tasksArray);
  }
});

search.addEventListener("keyup", () => {
  let searchResult = tasksArray.filter((task) => {
    if (task.title.toLowerCase().match(search.value.toLowerCase())) return task;
  });
  tasksDiv.innerHTML = "";
  if (searchResult.length == 0) {
    tasksDiv.append("No Result");
  } else {
    addTaskToDocument(searchResult);
  }
});

input.addEventListener("keyup", () => {
  if (input.value == "") {
    addBtn.style.color = "#777";
  } else {
    addBtn.style.color = "#ffca28";
  }
});

// let task = document.querySelectorAll(".task");
// task.forEach((e) => {
//   e.addEventListener("click", () => {
//     console.log("Clicked");

//   });
// });

// Functions
function creatTask(taskTitle) {
  addTaskToArray(taskTitle);
  addTaskToDocument(tasksArray);
}

function addTaskToArray(taskTitle) {
  const task = {
    id: new Date().getTime(),
    title: taskTitle,
  };
  tasksArray.unshift(task);
  addTaskToLocalStorage(tasksArray);
}

function addTaskToLocalStorage(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}

function addTaskToDocument(arr) {
  tasksDiv.innerHTML = "";

  arr.forEach((el) => {
    let taskContainer = document.createElement("div");
    taskContainer.classList.add(`task`);
    taskContainer.id = el.id;

    let taskCheck = document.createElement("span");
    taskCheck.classList.add(`check`);

    let taskTitle = document.createElement("p");
    taskTitle.setAttribute("id", el.id);
    if (el.title.length > 35) {
      taskTitle.append(`${el.title.slice(0, 35)}` + `...`);
    } else {
      taskTitle.append(el.title);
    }

    taskContainer.appendChild(taskCheck);
    taskContainer.appendChild(taskTitle);
    tasksDiv.appendChild(taskContainer);

    let deleteBtn = document.createElement("button");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add(`fas`, `fa-trash`);
    deleteBtn.appendChild(deleteIcon);
    taskContainer.appendChild(deleteBtn);
  });
  delTaskBtn = document.querySelectorAll("button");
  delTaskBtn.forEach((e) => deleteTask(e));

  check = document.querySelectorAll(".check");
  check.forEach((e) => doneTaks(e));
}

function deleteTask(e) {
  e.addEventListener("click", () => {
    let goal = e.parentElement.id;
    tasksArray = tasksArray.filter((e) => goal != e.id);
    addTaskToLocalStorage(tasksArray);

    e.parentElement.classList.add("animate-left");
    setTimeout(() => {
      e.parentElement.classList.remove("animate-left");
      addTaskToDocument(tasksArray);
    }, 300);
  });
}

function doneTaks(e) {
  e.addEventListener("click", () => {
    e.classList.toggle("done");

    if (e.innerHTML != "") {
      e.innerHTML = "";
    } else {
      let checkIcon = document.createElement("i");
      checkIcon.classList = "fas fa-check";
      e.append(checkIcon);
    }
  });
}
