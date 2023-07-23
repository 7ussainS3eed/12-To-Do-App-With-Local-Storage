let arrayOfTasks = [];
let tasks = document.querySelector(".tasks");
let addingToPage = function() {
    for (i = 0; i < arrayOfTasks.length; i++) {
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        let div = document.createElement("div");
        div.className = "task";
        if (arrayOfTasks[i].completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", arrayOfTasks[i].id);
        div.appendChild(document.createTextNode(arrayOfTasks[i].title));
        div.appendChild(span);
        tasks.appendChild(div);
    }
}

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    addingToPage();
}

let submit = document.querySelector(".add");
let input = document.querySelector(".input");
submit.onclick = function () {
    if (input.value != "") {
        let task = {
            id: Date.now(),
            title: input.value,
            completed: false
        };
        arrayOfTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
        tasks.innerHTML = "";
        addingToPage();
        input.value = "";
    }
};

tasks.addEventListener("click", function(e) {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        arrayOfTasks = arrayOfTasks.filter((el) => el.id != e.target.parentElement.getAttribute("data-id"));
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        for (let i = 0; i < arrayOfTasks.length; i++) {
            if (arrayOfTasks[i].id == e.target.getAttribute("data-id")) {
                arrayOfTasks[i].completed == false ?
                (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));        
    }
});