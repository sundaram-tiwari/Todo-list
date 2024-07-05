let input_task = document.getElementById("task_input");
let buttons = document.querySelectorAll("button")
let i = 0
const getTasksFromLocalStorage = () => {
    let tasks = [];
    for (let j = 0; j < localStorage.length; j++) {
        const key = localStorage.key(j);
        if (key.startsWith('task_')) {
            tasks.push({ key: key, text: localStorage.getItem(key) });
        }
    }
    return tasks;
};

const renderTask = () => {

    getTasksFromLocalStorage().forEach(task => {
        showTask(task.text, task.key);
    });

    i = localStorage.length; 

    let buttonsArray = Array.from(buttons)
    buttonsArray.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const task_test = input_task.value.trim();
            if (e.target.innerHTML == 'Submit') {
                if (task_test != "") {
                    showTask(task_test, `task_${i}`)
                    i++;
                }
            }
            else if (e.target.innerHTML == 'Delete All'){
                let deleteAllMsg = document.querySelector(".task-container")
                deleteAllMsg.innerHTML = "";
                localStorage.clear()
                i = 0;
            }
        })
    })
}

const showTask = (task_text, key) => {
    const task_list = document.createElement("div")
    const task_msg = document.createElement("p")
    const task_btn = document.createElement("div")

    localStorage.setItem(`task_${i}`, task_text);

    task_msg.textContent = 'New Task : ' + task_text;

    const cross_btn = document.createElement("i")
    cross_btn.innerHTML = '<i class="fa-solid fa-circle-xmark cross-btn task-btn"></i>'
    cross_btn.addEventListener('click', () => {
        task_list.remove()
        removeFromLocalStorage(key)
    })

    const check_btn = document.createElement("i")
    check_btn.innerHTML = '<i class="fa-solid fa-circle-check task-btn check-btn"></i>'
    check_btn.addEventListener('click', () => {
        task_msg.style.textDecoration = 'line-through'
    })

    // task_btn.classList.add("task-btns")
    task_btn.appendChild(check_btn)
    task_btn.appendChild(cross_btn)

    task_list.appendChild(task_msg)
    task_list.appendChild(task_btn)
    task_list.classList.add("task-list");

    document.body.firstElementChild.lastElementChild.appendChild(task_list)
    input_task.value = "";
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}
renderTask()
// s