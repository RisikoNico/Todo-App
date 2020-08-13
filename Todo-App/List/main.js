var current_list_name, task_name, task;
var typing_ = false;
var tasks_container = document.getElementById("tasks_container");
var showing_todos = true;
var anim_running = false;

window.onload = function() {
  var data;
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    data = JSON.parse(localStorage.getItem(keys[i]));
    if (data["status"] == true) {
      current_list_name = data["name"];
      break;
    }
  }
  data = JSON.parse(localStorage.getItem(current_list_name));
  for (var i = 0; i < data["tasks"].length; i++) {
    var done = false;
    if (data["tasks"][i].status == true) {
      tasks_container = document.getElementById("tasks_container_done");
      done = true;
    } else if (data["tasks"][i].status == false) {
      tasks_container = document.getElementById("tasks_container_todo");
    } else {
      tasks_container = document.getElementById("tasks_container_done");
    }
    task = document.createElement("div");
    if (done) {
      task.classList.add("task_done");
    } else {
      task.classList.add("task_todo");
    }
    var title = document.createElement("p");
    if (!done) {
      var finish = document.createElement("p");
      var finish_container = document.createElement("div");
      finish_container.appendChild(finish);
      finish.innerHTML = "✓";
      finish.classList.add("finish");
      finish.setAttribute("onclick", "finishTask(this)");
      task.appendChild(finish);
    }
    title.innerHTML = data["tasks"][i].task;
    title.classList.add("taskname");
    task.appendChild(title);
    tasks_container.appendChild(task);
  }
  document.getElementById("list_name").innerHTML = current_list_name;
  showing(showing_todos);
}

function showing(boolean) {
  if (boolean) {
    var tasks_todo = document.getElementsByClassName("task_todo");
    for (var i = 0; i < tasks_todo.length; i++) {
      tasks_todo[i].setAttribute("style", "display: block");
    }
    var tasks_done = document.getElementsByClassName("task_done");
    for (var i = 0; i < tasks_done.length; i++) {
      tasks_done[i].setAttribute("style", "display: none");
    }
  } else if (!boolean) {
    var tasks_todo = document.getElementsByClassName("task_todo");
    for (var i = 0; i < tasks_todo.length; i++) {
      tasks_todo[i].setAttribute("style", "display: none");
    }
    var tasks_done = document.getElementsByClassName("task_done");
    for (var i = 0; i < tasks_done.length; i++) {
      tasks_done[i].setAttribute("style", "display: block");
    }
  }
}

function showTodos() {
  if (!anim_running) {
    showing_todos = true;
    showing(showing_todos);
    document.getElementById("tasks_container_todo").setAttribute("style", "z-index: unset");
    var h = document.getElementById("underline_");
    h.style.animationPlayState = "running";
    anim_running = true;
    setTimeout(function() {
      h.remove();
      anim_running = false;
      var p = document.createElement("p");
      p.setAttribute("id", "underline");
      document.body.insertBefore(p, document.body.firstChild);
    }, 2000);
  }
}

function showDones() {
  if (!anim_running) {
    showing_todos = false;
    showing(showing_todos);
    document.getElementById("tasks_container_todo").setAttribute("style", "z-index: 2");
    var h = document.getElementById("underline");
    h.style.animationPlayState = "running";
    anim_running = true;
    setTimeout(function() {
      h.remove();
      anim_running = false;
      var p = document.createElement("p");
      p.setAttribute("id", "underline_");
      document.body.insertBefore(p, document.body.firstChild);
    }, 2000);
  }
}

function finishTask(elem) {
  var data_ = JSON.parse(localStorage.getItem(current_list_name));
  var task_n = elem.parentNode.getElementsByTagName("p")[1].innerHTML;
  for (var i = 0; i < data_["tasks"].length; i++) {
    if (data_["tasks"][i].task == task_n) {
      data_["tasks"][i].status = true;
      localStorage.setItem(current_list_name, JSON.stringify(data_));
      var elemToChange = elem.parentNode;
      elemToChange.parentNode.removeChild(elemToChange);
      document.getElementById("tasks_container_done").appendChild(elemToChange);
      elemToChange.classList.remove("task_todo");
      elemToChange.classList.add("task_done");
      elemToChange.setAttribute("style", "display: none");
      elemToChange.removeChild(elem);
    }
  }
}

function addTask() {
  if (!typing_) {
    typing_ = true;
    // Add Taskdiv
    tasks_container = document.getElementById("tasks_container_todo");
    var input = document.createElement("input");
    var finish = document.createElement("p");
    finish.classList.add("finish");
    finish.innerHTML = "✓";
    finish.setAttribute("onclick", "finishTask(this)");
    task = document.createElement("div");
    task.classList.add("task_todo");
    input.setAttribute("type", "text");
    input.setAttribute("onkeydown", "typing(this)");
    input.setAttribute("class", "input");
    task.appendChild(finish);
    task.appendChild(input);
    tasks_container.appendChild(task);
    input.focus();
  }
}

function typing(elem) {
  if (event.key === "Enter" && elem.value != "") {
    task_name = elem.value;
    typing_ = false;
    var title = document.createElement("p");
    title.innerHTML = task_name;
    title.classList.add("taskname");
    elem.parentNode.removeChild(elem);
    task.appendChild(title);

    var task_ = new Task(task_name);
    var data = JSON.parse(localStorage.getItem(current_list_name));
    var arr = data["tasks"];
    arr.push(task_);
    data["tasks"] = arr;
    localStorage.setItem(current_list_name, JSON.stringify(data));
  }
}

function navigateBack() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var data = JSON.parse(localStorage.getItem(keys[i]));
    if (data["status"] == true) {
      data["status"] = false;
      localStorage.setItem(keys[i], JSON.stringify(data));
    }
  }
  window.location.href = "../window.html";
}