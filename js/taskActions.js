var taskAction = {
    ul: document.getElementById("todo-list"),
    addTask: function(task) {
        var li = document.createElement("li");
        var text = document.createTextNode(task);
        li.appendChild(text);
        li.setAttribute("onclick", "taskAction.update(event)",false);
        
        var doneButton = taskAction.addButton("Done");
        doneButton.setAttribute("onclick", "taskAction.move(event)");
        
        taskAction.ul.appendChild(li);
        taskAction.ul.appendChild(doneButton);
    },
    addButton: function(typeButton) {
        var newButton = document.createElement("input");
        newButton.setAttribute("type", "submit");
        newButton.setAttribute("class", "btn");
        newButton.setAttribute("value", typeButton);
        return newButton;
    },
    
    update: function(event) {
        var listToUpdate = event.target;
        
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "new-input");
        input.setAttribute("placeholder", listToUpdate.innerText);
        
        listToUpdate.style.display = "none";
        
        taskAction.ul.insertBefore(input, listToUpdate.nextSibling);
        
        input.focus();
        
        // Update button
        var updateBtn = taskAction.addButton("Update");
        //input.nextSibling; //Done button
        taskAction.ul.insertBefore(updateBtn, input.nextSibling);
        
        input.addEventListener("blur", function(e) {
            taskAction.delete(updateBtn);
            taskAction.delete(input);
            listToUpdate.style.display = "block";
        });
        
        input.addEventListener("keydown", function(e) {
            var code = (e.keycode ? e.keycode : e.which);
            if(code == 13) {
                listToUpdate.innerHTML = input.value;
                input.blur();
                //taskAction.delete(updateBtn);
                //taskAction.delete(input);
                listToUpdate.style.display = "block";
            }
        });
        
        updateBtn.addEventListener("click", function() {
            taskAction.updateContent(listToUpdate, input);
            listToUpdate.style.display = "block";
            taskAction.delete(updateBtn);
            taskAction.delete(input);
        }); 
    },
    
    move: function(event) {
        var completedTask = event.target.previousSibling;
        
        var ul = document.getElementById("completed");
        
        /* remove attribute onclick */
        var cloned = completedTask.cloneNode(true);
        cloned.removeAttribute("onclick");
        
        taskAction.delete(completedTask);
        taskAction.delete(event.target);
        
        ul.appendChild(cloned);
        console.log(cloned);
        
        var deleteBtn = taskAction.addButton("delete");
        ul.appendChild(deleteBtn);
        
        deleteBtn.addEventListener("click", function() {
            taskAction.delete(cloned);
            taskAction.delete(this);
        });
    },
    
    delete: function(element) {
        console.log("delete " + element);
        element.parentNode.removeChild(element);
    },
}