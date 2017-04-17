var taskAction = {
    ul: document.getElementById("todo-list"),
    addTask: function(task) {
        var div = document.createElement("div");
        div.setAttribute("class", "list-container");
        
        var checkbox = taskAction.addCheckbox();
        
        var li = document.createElement("li");
        var text = document.createTextNode(task);
        li.appendChild(text);
        li.setAttribute("onclick", "taskAction.update(event)",false);
        
        div.appendChild(checkbox);
        div.appendChild(li);
        
        taskAction.ul.appendChild(div);
    },
    
    addButton: function(typeButton) {
        var newButton = document.createElement("button");
        var txt = document.createTextNode(typeButton);
        newButton.setAttribute("type", "submit");
        newButton.setAttribute("style", "display: none;");
        newButton.setAttribute("class", "btn");
        newButton.appendChild(txt);
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
        
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "new-input");
        input.value = listToUpdate.innerText;
        
        listToUpdate.style.display = "none";
        
        listToUpdate.parentNode.appendChild(input);
        
        input.focus();
        
        input.addEventListener("blur", function(e) {
            //updateBtn.style.display = "none";
            listToUpdate.innerHTML = input.value;
            listToUpdate.style.display = "block";
            taskAction.delete(input);
        });
        
        input.addEventListener("keydown", function(e) {
            var code = (e.keycode ? e.keycode : e.which);
            if(code == 13) {
                listToUpdate.innerHTML = input.value;
                input.blur();
            }
        });
    },
    
    move: function(event) {
        //var completedTask = event.target.previousSibling;
        var completedTask = event.target.nextSibling;
        console.log(completedTask);
        
        var ul = document.getElementById("completed");
        
        // Delete div container in section todo and its children 
        var div = completedTask.parentNode;
        
        taskAction.delete(completedTask.parentNode);
        
        div.childNodes[1].removeAttribute("onclick");
        console.log(div);
        
        var deleteBtn = taskAction.addButton("delete");
        deleteBtn.removeAttribute("style");
        event.target.setAttribute("onclick", "taskAction.undo(event)", false);
        div.appendChild(deleteBtn);

        ul.appendChild(div);
        
        deleteBtn.addEventListener("click", function() {
            taskAction.delete(div);
        });
    },
    
    undo: function(event) {
        var div = event.target.parentNode;
        
        /* Remove delete button */
        taskAction.delete(div.lastChild);
        
        /* Reset function on checkbox */
        div.firstChild.setAttribute("onclick", "taskAction.move(event)",false);
        
        /* Reset function on list */
        div.firstChild.nextSibling.setAttribute("onclick", "taskAction.update(event)",false);
        
        taskAction.ul.appendChild(div);
    },
    
    delete: function(element) {
        element.parentNode.removeChild(element);
    }   
}