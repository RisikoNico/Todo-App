var lists = [];
var name, div, loading_list_name, prev_title;
var typing = false;

window.onload = function() {
  //if (window.location.href == "file:///C:/Users/Nicolas/Desktop/Todo-App/window.html") {
  document.getElementById("svg").setAttribute("style", "width:" + window.innerWidth + "px");
  document.getElementById("svg").setAttribute("height", "123px");
  var keys = Object.keys(localStorage);
  console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var obj = JSON.parse(localStorage.getItem(keys[i]));
    addPreviousList(obj.name);
  }
  //}
}

function addPreviousList(name) {

  list_container = document.getElementById("list_container");
  div = document.createElement("DIV");
  div.classList.add("list");
  div.setAttribute("onclick", "showList(this)");
  var trash = new Image();
  trash.src = "assets/trashcan.png";
  trash.classList.add("trash");
  trash.setAttribute("onclick", "remove(this)");
  var pen = new Image();
  pen.src = "assets/pen.png";
  pen.classList.add("pen");
  pen.setAttribute("onclick", "rename(this)");
  var icons = document.createElement("div");
  icons.classList.add("icons");
  icons.appendChild(pen);
  icons.appendChild(trash);
  div.appendChild(icons);
  var title = document.createElement("p");
  title.classList.add("listname");
  title.innerHTML = name;
  div.appendChild(title);

  // Resize Div
  var height = 0.10 * window.innerHeight;
  div.setAttribute("style", "height:" + height + "px");

  list_container.appendChild(div);

  var newList = new List(name);
  lists.push(newList);
}

function addList() {
  if (!typing) {
    name = "";
    list_container = document.getElementById("list_container");
    div = document.createElement("DIV");
    div.classList.add("list");
    div.setAttribute("onclick", "showList(this)");
    var input = document.createElement("INPUT");
    var trash = new Image();
    trash.src = "assets/trashcan.png";
    trash.classList.add("trash");
    trash.setAttribute("onclick", "remove(this)");
    var pen = new Image();
    pen.src = "assets/pen.png";
    pen.classList.add("pen");
    pen.setAttribute("onclick", "rename(this)");
    var icons = document.createElement("div");
    icons.classList.add("icons");
    icons.appendChild(pen);
    icons.appendChild(trash);
    div.appendChild(icons);
    input.setAttribute("type", "text");
    input.setAttribute("onkeydown", "enter(this)");
    input.setAttribute("class", "input");
    div.appendChild(input);
    typing = true;
    // Resize Div
    var height = 0.10 * window.innerHeight;
    div.setAttribute("style", "height:" + height + "px");

    list_container.appendChild(div);
    input.focus();

    var newList = new List(name);
    lists.push(newList);
  }
}

function rename(elem) {
  typing = true;
  var input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.setAttribute("onkeydown", "reenter(this)");
  input.setAttribute("class", "input");
  elem.parentNode.parentNode.appendChild(input);
  prev_title = elem.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML;
  input.value = prev_title;
  elem.parentNode.parentNode.removeChild(elem.parentNode.parentNode.getElementsByClassName("listname")[0]);
  input.focus();
  reenter(input);
}

function reenter(el) {
  if (event.key === "Enter" && el.value != "") {
    name = el.value;
    var parent_ = el.parentNode;
    parent_.removeChild(el);
    var list_n_ = document.createElement("p");
    list_n_.classList.add("listname");
    list_n_.innerHTML = name;
    parent_.appendChild(list_n_);
    typing = false;
    var keys = Object.keys(localStorage);

    for (var i = 0; i < keys.length; i++) {
      var data = JSON.parse(localStorage.getItem(keys[i]));
      if (data["name"] == prev_title) {
        localStorage.removeItem(keys[i]);
        data["name"] = name;
        localStorage.setItem(name, JSON.stringify(data));
        break;
      }
    }
  }
}

function enter(el) {
  if (event.key === "Enter" && el.value != "") {
    name = el.value;
    var title = document.createElement("p");
    title.classList.add("listname");
    div.appendChild(title);
    el.parentNode.getElementsByTagName("p")[0].innerHTML = name;
    el.parentNode.removeChild(el);
    typing = false;
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].name = name) {
        localStorage.setItem(name, JSON.stringify(lists[i]));
      }
    }
  }
}

function showList(elem) {
  if (!typing) {
    loading_list_name = elem.getElementsByTagName("p")[0].innerHTML;
    var data = JSON.parse(localStorage.getItem(loading_list_name));
    data["status"] = true;
    localStorage.setItem(loading_list_name, JSON.stringify(data));
    window.location.href = "List/list.html";
  }
}

function remove(elem) {
  if (confirm("Do you want to remove the list " + elem.parentNode.parentNode.getElementsByTagName("P")[0].innerHTML + " ?")) {
    elem.parentNode.parentNode.remove();
    localStorage.removeItem(elem.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML);
    typing = true;
    setTimeout(function() {
      typing = false;
    }, 1000);
  } else {
    typing = true;
    setTimeout(function() {
      typing = false;
    }, 1000);
  }
}