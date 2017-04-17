var taskAction = {
    ul: document.getElementById("todo-list"),
    addTask: function(task) {
        var div = document.createElement("div");
        div.setAttribute("class", "list-container");
        
        var li = document.createElement("li");
        var text = document.createTextNode(task);
        li.appendChild(text);
        li.setAttribute("onclick", "taskAction.update(event)",false);

        var checkbox = taskAction.addCheckbox();
        
        div.appendChild(checkbox);
        div.appendChild(li);
        
        taskAction.ul.appendChild(div);
    },
    
    addButton: function(typeButton) {
        var newButton = document.createElement("input");
        newButton.setAttribute("type", "submit");
        newButton.setAttribute("class", "btn");
        newButton.setAttribute("value", typeButton);
        return newButton;
    },
    addCheckbox: function() {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkboxes");
        checkbox.setAttribute("onclick", "taskAction.move(event)");
        return checkbox;
    },
    
    update: function(event) {
        var listToUpdate = event.target;
        //console.log(listToUpdate.previousSibling);
        
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "new-input");
        input.setAttribute("placeholder", listToUpdate.innerText);
        
        listToUpdate.style.display = "none";
        
        listToUpdate.parentNode.appendChild(input);
        
        input.focus();
        
        // Update button
        var updateBtn = taskAction.addButton("Update");
        //input.nextSibling; //Checkbox
        listToUpdate.parentNode.appendChild(updateBtn);
        
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
                listToUpdate.style.display = "block";
            }
        });
        
        updateBtn.addEventListener("click", function() {
            listToUpdate.style.display = "block";
            taskAction.delete(updateBtn);
            taskAction.delete(input);
        }); 
    },
    
    move: function(event) {
        //var completedTask = event.target.previousSibling;
        var completedTask = event.target.nextSibling;
        
        var ul = document.getElementById("completed");
        
        // Delete div container in section todo and its children 
        var div = completedTask.parentNode;
        
        taskAction.delete(completedTask.parentNode);
        
        div.childNodes[1].removeAttribute("onclick");
        console.log(div);
        
        var deleteBtn = taskAction.addButton("delete");
        div.appendChild(deleteBtn);

        ul.appendChild(div);
        
        deleteBtn.addEventListener("click", function() {
            taskAction.delete(div);
        });
    },
    
    delete: function(element) {
        console.log("delete " + element);
        element.parentNode.removeChild(element);
    }   
}