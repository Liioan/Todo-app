const form = document.querySelector('.add');
const ul = document.querySelector('ul');
const pattern = /^.{1,52}$/;
const clearAllButton = document.querySelector('.clear-all');


//- local storage 1

//. saves to local storage
const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos, ["innerHTML"]));
}




//- deleting todos 

//. deletes todo 
const deleteTodo = (element) => {
    element.remove();
    if(!ul.children.length){
        ul.classList.add('hidden');
        clearAllButton.classList.add('hidden');
    }
    saveToLocalStorage(Array.from(ul.children));
};

//. listens for an event 
ul.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        deleteTodo(e.target.parentElement);
    }
});



//- adding todos 

//. check for color used 
const checkForClass = (value) => {
    const important = /[!]/;
    const uncertain = /[?]/;
    const optional = /[.]/;
    const normal = /[*]/;

    if(important.test(value)){
        return 'important';
    } else if(uncertain.test(value)){
        return 'uncertain';
    } else if(optional.test(value)){
        return 'optional';
    } else if(normal.test(value)){
        return 'normal';
    }
};


//. adds new todo
const addNewTodo = (newTodo) =>{
    let usedClass = checkForClass(newTodo);
    ul.innerHTML += `
         <li>
            <div class="todo">
                <span class="${usedClass}">${newTodo}</span> 
            </div>
            <button class="delete-button">X</button>
        </li>
    `
    if(ul.classList.contains('hidden')){
        ul.classList.remove('hidden');
        clearAllButton.classList.remove('hidden');
    }
    saveToLocalStorage(Array.from(ul.children));
};

//. listens for an event 
form.addEventListener('submit', e => {
    e.preventDefault();

    const newTodo = form.userValue.value.trim();
    if(pattern.test(newTodo)){
        addNewTodo(newTodo);
        form.reset();
    }
});




//- live feedback

//. adds classes for live feedback
const giveLiveFeedback = (value) => {
    let result = pattern.test(value);

    if(result){
        userValue.classList.remove('error');
        userValue.classList.add('valid');
    } else {
        userValue.classList.remove('valid');
        userValue.classList.add('error');
    }
};

//. listens for event
form.userValue.addEventListener('keyup', () => {
    const value = form.userValue.value.trim();
    giveLiveFeedback(value);
});




//-clearing all todos 

//. hides elements when triggered
const hideElements = () =>{
    ul.classList.add('hidden');
    clearAllButton.classList.add('hidden');
}

//. listens for an event
clearAllButton.addEventListener('click', () => {
    ul.innerHTML = ``;
    hideElements();
    localStorage.clear();
});




//- searching for todos 

//. filters todos
const searchTodos = (value) => {
    Array.from(ul.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(value))
        .forEach(todo => todo.classList.add('hidden'));

    Array.from(ul.children)
        .filter(todo => todo.textContent.toLowerCase().includes(value))
        .forEach(todo => todo.classList.remove('hidden'));
        
    if(value.length){
        clearAllButton.classList.add('hidden');
    } else {
         clearAllButton.classList.remove('hidden');
    }
} ;

//.listens for an event
form.search.addEventListener('keyup', () => {
    const searchedTodo = search.value.trim().toLowerCase();
    searchTodos(searchedTodo);
});




//- local storage 2

//. adds items
const addOldTodos = (values) =>{
    values.forEach(value => {
        ul.innerHTML += `<li>${value.innerHTML}</li>`;
    });
    ul.classList.remove('hidden');
    clearAllButton.classList.remove('hidden');
}

//. checks for local storage
if(localStorage.getItem('todos')){
    const values = JSON.parse(localStorage.getItem('todos'));
    addOldTodos(values);
}

//- hides ul if empty 
if(!ul.children.length){
    hideElements();
}
