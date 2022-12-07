import './style.css';

const todoList = document.querySelector(".todoList");
const tasks= [
    {
    description: 'task 1',
    completed: false,
    index: 0
    },
    {
    description: 'task 2',
    completed: false,
    index: 1
    },
    {
    description: 'task 3',
    completed: false,
    index: 3
    },
    {
        description: 'task 4',
        completed: false,
        index: 2
        },
]

tasks.sort((a, b) => a.index - b.index);

tasks.forEach((element) =>{
    todoList.innerHTML += ` <li class="list">
    <input type="checkbox"/>
    <span class="task">${element.description}</span>
    <i class="uil uil-ellipsis-v"></i>
</li>`;
});