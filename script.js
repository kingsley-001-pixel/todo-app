
//Getting elements from the DOM
const title = document.getElementById('title')
const allHeadingThree = document.querySelectorAll('h3')
const inputBar = document.querySelector('input')
const addBtn = document.querySelector('.addBtn')
const taskOl = document.getElementById('taskOl')
const pendingTaskHeading = document.querySelector('#taskList h3')
const completedTaskHeading = document.querySelector('#taskCompleted h3')
const completedTaskOl = document.getElementById('taskCompletedOl')
const deleteAllBtn = document.getElementById('clearAllBtn')
const completedDeleteAllBtn = document.getElementById('completedDeleteAllBtn')
const dateHeader = document.getElementById('dateHeader')
const timeHeader = document.getElementById('timeHeader')
const selectDateAndTimeDiv = document.getElementById('selectDateAndTimeDiv')
const selectDateAndTimeInput = document.getElementById('selectDateAndTimeInput')
const headingUnderTimeAndDate = document.getElementById('selectDateAndTimeInstruction')
const pickEndDateAndTimeBtn = document.querySelector('.pickEndDateAndTimeBtn')
const alertSound = document.querySelector('audio')
const toggleBtn = document.querySelector('button i')

    //Adding event listener to the toggle button
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('fa-toggle-off')
    toggleBtn.classList.toggle('fa-toggle-on')
    if (toggleBtn.className.includes('fa-toggle-on')) {
        document.body.style.backgroundColor = '#ff8552'
    } else {
        document.body.style.backgroundColor = '#090909'
    }
})

    //Display of date and time
setInterval (function getTimeAndDate() {
    var date = new Date()
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decmeber']
    const month = monthsOfTheYear[date.getMonth()]
    const day = daysOfTheWeek[date.getDay()]
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    dateHeader.innerText = `${date.getDate()} ${day}  ${month}  ${date.getFullYear()}`
    
    if (hour.toString().length === 1) {
        var hourString = hour.toString()
        hourString = `0${hourString}`
    } else {
        hourString = hour
    }
    if (minutes.toString().length === 1) {
        var minutesString = minutes.toString()
        minutesString = `0${minutesString}`
    } else {
        minutesString = minutes
    }
    if (seconds.toString().length === 1) {
        var secondsString = seconds.toString()
        secondsString = `0${seconds}`
    } else{
        secondsString = seconds
    }
    timeHeader.innerText = `${hourString} : ${minutesString} : ${secondsString}`

}, 1)
    //Adding event listeners to the input bar
    //When the input bar is beng clicked upon
inputBar.addEventListener('focus', (e) => {
    e.target.style.backgroundColor = '#d3ffe9'
    e.target.style.color = '#4b5043'
})
    //When the input bar is out of click
inputBar.addEventListener('blur', (e) => {
    e.target.style.backgroundColor = '#4b5043'
    e.target.style.color = '#d3ffe9'
})



//Add List Item as Task function, being called at the bottom of this script
const addListItem = () => {
    selectDateAndTimeDiv.style.display = 'none'
    const li = document.createElement('li')
    const doneBtn = document.createElement('button')
    const startTaskDate = document.createElement('h5')
    const endTaskDate = document.createElement('h5')
    const deleteBtn = document.createElement('button')
    const iDoneBtn = document.createElement('i')
    const iDeleteBtn = document.createElement('i')
    const countdown = document.createElement('h5')
            
const selectedDateAndTimeInput = document.getElementById('selectDateAndTimeInput').value
    console.log(countdown.innerHTML);
    startTaskDate.className = 'dateAndTime'
    endTaskDate.className = 'dateAndTime'
    startTaskDate.id = 'startTaskDate'
    endTaskDate.id = 'endTaskDate'
    doneBtn.className = 'doneBtn'
    deleteBtn.className = 'deleteBtn'
    iDoneBtn.className = 'fa-solid fa-check'
    iDeleteBtn.className = 'fa-solid fa-trash'
    iDeleteBtn.id = 'delete'
    doneBtn.style.marginLeft = '20px'
    doneBtn.style.fontSize = '1rem'
    deleteBtn.style.marginLeft = '10px'
    deleteBtn.style.fontSize = '1rem'
    countdown.id = 'countdown'
    iDeleteBtn.ariaHidden = 'true'
    li.innerText = inputBar.value
    startTaskDate.innerText = ` Starts: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    endTaskDate.innerText = ` To End Before/On: ${new Date(selectedDateAndTimeInput).getDate()}/${new Date(selectedDateAndTimeInput).getMonth() + 1 }/${new Date(selectedDateAndTimeInput).getFullYear()}`
    
    //Appendment
    doneBtn.appendChild(iDoneBtn)
    deleteBtn.appendChild(iDeleteBtn)
    li.appendChild(doneBtn)
    li.appendChild(deleteBtn)
    li.appendChild(startTaskDate)
    li.appendChild(endTaskDate)
    li.appendChild(countdown)
    
    //Getting all task list in the pending section
    const allTask = document.querySelectorAll('#taskOl li')

    
        //Countdown Function, being called at the end of this event listener
    const updateCountdown = () => {
        const now = new Date()
        const endDate = new Date(selectedDateAndTimeInput)
        const differenceInDateAndTime = endDate - now

        if (differenceInDateAndTime <= 0) {
            countdown.innerText = "Time's Up"
            countdown.style.color = 'red'
            countdown.style.fontSize = '1rem'
            li.style.border = '1px solid red'
            li.style.paddingTop = '10px'
            li.style.paddingLeft = '10px'
            li.style.paddingRight = '5px'
            li.style.paddingBottom = '15px'
            countdown.style.marginTop = '-10px'
            countdown.style.marginBottom = '-5px'
            alertSound.play()
            clearInterval(timer)
            return;
        }
    }


    
            //Display of heading
    if (allTask.length >= 0){
        pendingTaskHeading.style.display = 'block'

            //Saving task in both local and session storage
        localStorage.setItem(li.innerText, JSON.stringify({
            'State': 'Pending'
        }))
        sessionStorage.setItem(li.innerText, JSON.stringify({
            'State': 'Pending'
        }))
        taskOl.appendChild(li)
            //Display of 'Delete All' Button
        deleteAllBtn.style.display = 'block' 
        deleteAllBtn.style.textAlign = 'center' 
    } 
            //Omission of adding heading when length of task is gretaer than 1
    else {
        localStorage.setItem(li.innerText, JSON.stringify({
            'State': 'Pending'
        }))
        sessionStorage.setItem(li.innerText, JSON.stringify({
            'State': 'Pending'
        }))
        taskOl.appendChild(li)
    }
            //Setting the input bar to no text 
    inputBar.value = ''

    if (allTask.length >= 1) {
        li.style.marginTop = '70px'
    }



            //Adding event listener for 'Delete' Button for Pending Tasks
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (confirm('Are you sure you want to delete this task')) {
            localStorage.removeItem(li.innerText)
            sessionStorage.removeItem(li.innerText)
        li.remove()
        }
        
        if (taskOl.children.length == 0) {
            pendingTaskHeading.style.display = 'none'
            deleteAllBtn.style.display = 'none'
        }
    })

    //Adding event Listener to the done button
    doneBtn.addEventListener('click', () => {
        if (taskOl.children.length === 1) {
            deleteAllBtn.style.display = 'none'
        } 
            //Completed Tasks Section
        const completedLi = document.createElement('li')
        const completedDeleteBtn = document.createElement('button')
        const completedI = document.createElement('i')
        //Removing the startTaskDate and EndTaskDate
        li.removeChild(startTaskDate)
        li.removeChild(endTaskDate)
        //Setting attributes of the button
        completedI.id = 'delete'
        completedI.ariaHidden = 'true'
        completedI.className = 'fa-solid fa-trash'
        completedDeleteBtn.className = 'completedDeleteBtn'
        // const allCompletedLis = document.querySelectorAll('#taskCompleted li')
        completedLi.innerText = `${li.textContent} - Completed`
        completedDeleteBtn.appendChild(completedI)
        completedLi.appendChild(completedDeleteBtn)
        completedDeleteBtn.style.marginLeft = '10px'
        completedDeleteBtn.style.fontSize = '1rem'
        completedTaskHeading.style.display = 'block'
        completedDeleteAllBtn.style.display = 'block'
        
        li.remove()
        
            //Changing Status of the task in the local storage and session storage
        localStorage.setItem(completedLi.innerText, JSON.stringify({
            'State': 'Completed'
        }))
        sessionStorage.setItem(completedLi.innerText, JSON.stringify({
            'State': 'Completed'
        }))
        //Appendment
        completedTaskOl.appendChild(completedLi)
        //No display of heading when no completed task
        if (taskOl.children.length == 0) {
            pendingTaskHeading.style.display = 'none'
            
        }
            //Adding Event Listener for 'Delete' Button of Completed Task
            completedDeleteBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            localStorage.removeItem(completedLi.innerText)
            sessionStorage.removeItem(completedLi.innerText)
            completedLi.remove()            
            if (completedTaskOl.children.length == 0) {
            completedTaskHeading.style.display = 'none'
            completedDeleteAllBtn.style.display = 'none'
        }
        })
        
            //Adding Event Listener for 'Delete All' Button of Completed Task
        
    })
    //Tiimer Countdown
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000);
}





//Adding event listeners to the pick end date and time button
pickEndDateAndTimeBtn.addEventListener('click', () => {
    selectDateAndTimeDiv.style.display = 'block'
pickEndDateAndTimeBtn.addEventListener('mouseenter', () => {
        selectDateAndTimeDiv.style.display = 'none'
    }) 
})


//Adding event listener to the add task button
addBtn.addEventListener('click', () => {
    if (inputBar.value && selectDateAndTimeInput.value) {
        if (new Date(selectDateAndTimeInput.value) < new Date()) {
            alert('End date is behind. Pick date and time in the near future.')
        } else if (new Date(selectDateAndTimeInput.value) > new Date()) {
addListItem()
}
    } else {
        alert('Please input both your task and end date and time for your task.');
    }
})

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inputBar.value && selectDateAndTimeInput.value) {
            if (new Date(selectDateAndTimeInput.value) > new Date()) {
            addListItem()
}
        }
    }
})



            //Adding event listener for 'Delete All' Button for Pending Tasks
    deleteAllBtn.addEventListener('click', () => {
        
        if (confirm('Are you sure you want to delete all tasks?') === true) {
            const allTask = document.querySelectorAll('#taskOl li')
            allTask.forEach(task => {
                task.remove()
            deleteAllBtn.style.display = 'none'
            pendingTaskHeading.style.display = 'none'
        
            })
            localStorage.clear()
            sessionStorage.clear()
            
        } 
    })


completedDeleteAllBtn.addEventListener('click', () => {
    const completedLi = document.querySelectorAll('#taskCompletedOl li')
            let response = confirm('Are you sure you want to delete all tasks?')
        if (response) {
            completedLi.forEach(completedTask => {
                completedTask.remove()
                completedDeleteAllBtn.style.display = 'none'
            completedTaskHeading.style.display = 'none'
            })
            localStorage.clear()
            sessionStorage.clear()
        }
        })