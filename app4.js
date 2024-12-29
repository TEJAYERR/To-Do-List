input = document.querySelector('.create');
btn = document.querySelector('.btn');
tasks = document.querySelector('.tasks');
cancelTask = document.querySelector('.cancel-task')




//save tasks to local storage
function saveTasksToLocalStorage(){
    let tasks =[];
    document.querySelectorAll('.task p').forEach((task) =>{
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//load tasks from local storage
function loadTasksFromLocalStorage(){
    let storedTasks = localStorage.getItem('tasks');
    if(storedTasks){
        JSON.parse(storedTasks).forEach((task)=>{
            addTaskToDom(task);
        });
    }
}


input.addEventListener('keypress',(e)=>{
    console.log(e);
    if(e.key === 'Enter'){
        let task = input.value.trim();
        if(task.length > 0){
            addTaskToDom(task);
            saveTasksToLocalStorage();
            input.value = '';
        }
    }
})


btn.addEventListener('click',()=>{
    let task = input.value.trim();
    if(task.length > 0){
        addTaskToDom(task);
        saveTasksToLocalStorage();
        input.value = '';
    }
});



function addTaskToDom(task){
    const charsPerLine = 30;
    const formattedText = task.replace(new RegExp(`(.{${charsPerLine}})`,'g'),'$1<br>');
    tasks.innerHTML+=`<li class="task"> <div class="task-comp"><input type="radio"> <p>${formattedText}</p></div> <div><i class="fa-solid fa-xmark cancel-task"></i></div> </li>`;
}


tasks.addEventListener('click', (e) => {
    // console.log(e.target); // Debugging: see what is clicked
    if (e.target.classList.contains('cancel-task')) {
        const taskItem = e.target.closest('.task');
        taskItem.remove();
        saveTasksToLocalStorage();
    }

    //toggle radio button

    if(e.target.type === 'radio'){
        const radio = e.target;
        if(radio.dataset.checked === 'true'){
            radio.checked = false;
            radio.dataset.checked = 'false';
            const taskItem = e.target.closest('.task');
            const taskText = taskItem.querySelector('p');
            taskText.innerHTML=taskText.innerText;
            taskText.style.color='white';
        }
        else{
            radio.checked = true;
            radio.dataset.checked = 'true';
            const taskItem = e.target.closest('.task');
            const taskText = taskItem.querySelector('p');
            taskText.innerHTML="<strike>"+taskText.innerHTML+"</strike>";
            taskText.style.color='gray';
        }
    }
});



//load tasks on page load -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded',()=>{
    loadTasksFromLocalStorage();
})



