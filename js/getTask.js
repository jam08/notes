var getNewTask = {
    getTask: function() {
        var inputTask = document.getElementById("new-task");
        var inputButton = document.getElementById("add-button");
        
        inputTask.addEventListener("keydown", function(e) {
            var code = (e.keycode ? e.keycode : e.which);
            if(code == 13) {
                var newTask = inputTask.value; 
                if (/^\s*$/.test(newTask)) {
                    return;
                } else {
                    /* remove focus from input task 
                     * after pressing the Enter key
                     */
                inputTask.blur();
                taskAction.addTask(newTask);
                inputTask.value = "";
                }  
            }
        });
        inputButton.addEventListener("click", function() {
            var newTask = inputTask.value;
            if(/^\s*$/.test(newTask)) {
                    return;
            } else {
                taskAction.addTask(newTask);
                inputTask.value = "";
            }
        });
    },
    
    displayCompleted: function() {
        var completedBtn = document.getElementById("display-btn");
        var completedList = document.getElementById("completed-wrapper");
        completedBtn.addEventListener("click", function(e) { 
            if(completedList.style.display == "none") {
                completedList.style.display = "block";
                completedBtn.innerHTML = "Hide Completed";
                completedBtn.setAttribute("class", "shown");
            } else {
                completedList.style.display = "none";
                completedBtn.innerHTML = "Show Completed";
                completedBtn.setAttribute("class", "hidden");
            }
        });
    }  
}

getNewTask.getTask();
getNewTask.displayCompleted();
