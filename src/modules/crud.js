
const taskInput = document.querySelector(".addtolist");
const taskBox = document.querySelector(".task-box");

let completed = false,
    index = 0;
let todoList = [];


function showTodo() {
    let liTag = "";
    todoList.forEach((element) => {
        liTag += `<li class="task">
                                <input type="checkbox" class="checkme">
                                <input type="text" value="${element.description}" class="listitem" id="item${element.index}" readonly>

                                <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}" onclick="editItem(${element.index});"></i>
                                <i class="fa-solid fa-floppy-disk save hide" id="save${element.index}" onclick="saveItem(${element.index});"></i>
                           <i id="removeicon" onclick="removeItem(${element.index});" class="fa-solid fa-trash"></i>
                        </li>`;

    });

    taskBox.innerHTML = liTag || `<p class="empty">You don't have any task here</p>`;
    taskInput.value = ''
}


taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && taskInput.value.length != 0) {
        let storedList = localStorage.getItem("todo-list");

        if (storedList === null) {
            todoList = [];
        } else {
            todoList = JSON.parse(storedList);
            index = todoList.length === 0 ? 0 : todoList.length;
        }

        const LocalStore = {
            index: index,
            description: taskInput.value,
            completed: completed,
        };
        todoList.push(LocalStore);
        localStorage.setItem("todo-list", JSON.stringify(todoList));
        showTodo();
    }
});


window.onload = () => {
    if (localStorage.getItem("todo-list")) {
        todoList = JSON.parse(localStorage.getItem("todo-list"));
    }
    showTodo()
};


window.editItem = (index) => {
    const editBtn = document.getElementById("edit" + index + "");
    const saveBtn = document.getElementById("save" + index + "");

    saveBtn.style.display = "block";
    editBtn.style.display = "none";
    const mainItem = document.getElementById("item" + index + "");
    mainItem.removeAttribute("readonly");
    const length = mainItem.value.length;
    mainItem.setSelectionRange(length, length);
    mainItem.focus();
    return mainItem;
};

window.saveItem = (index) => {
    const editBtn = document.getElementById("edit" + index + "");
    const saveBtn = document.getElementById("save" + index + "");

    saveBtn.style.display = "none";
    editBtn.style.display = "block";

    const mainItem = document.getElementById("item" + index + "");
    let storedData = localStorage.getItem("todo-list");
    todoList = JSON.parse(storedData);
    todoList[index].description = mainItem.value;

    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTodo()
};

window.removeItem = (index) => {
    let storedData = localStorage.getItem("todo-list");
    todoList = JSON.parse(storedData);
    todoList.splice(index, 1);
    for (let i = 0; i < todoList.length; i++) {
        todoList[i].index = i;
    }
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    showTodo()
};