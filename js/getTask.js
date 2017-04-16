var getNewTask = {
    getTask: function() {
        var inputTask = document.getElementById("new-task");
        var inputButton = document.getElementById("add-button");
        
        inputTask.addEventListener("keydown", function(e) {
            var code = (e.keycode ? e.keycode : e.which);
            if(code == 13) {
                var newTask = inputTask.value;
                /* remove focus from input task 
                 * after pressing the Enter key
                 */
                inputTask.blur();
                //console.log(newTask);
                taskAction.addTask(newTask);
                inputTask.value = "";
            }
        });
        inputButton.addEventListener("click", function() {
            var newTask = inputTask.value;
            //console.log(newTask);
            taskAction.addTask(newTask);
            inputTask.value = "";
        });
    } 
}

getNewTask.getTask();
