const formAdd = document.querySelector('.add');
const searchInput = document.querySelector('.search-input');
const userToDo = document.querySelector('.user-to-do');
const ul = document.querySelector('ul');
const clearAllButton = document.querySelector('.clear-all');
const pattern = /^.{1,}$/;

//* removes targeted li, adds hidden class if ul is empty
ul.addEventListener('click', e => {
    //* checks if delete acction was triggered 
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    }

    //*checs if ul is empty 
    const li = ul.querySelectorAll('li');
    let liArr = Array.from(li);
    if(liArr.length === 0){
        ul.classList.add('hidden');
        clearAllButton.classList.add('hidden');
    }
    // console.log(liArr)
});

//* adds new li element, removes hidden class
formAdd.addEventListener('submit', e => {
    e.preventDefault();
    const todo = userToDo.value.trim();

    //* tests if value is empty
    let result = pattern.test(todo);
    // console.log(result);

    if(result){
        //* checks if user used color for li
        const important = /[!]/;
        const uncertain = /[?]/;
        const optional = /[.]/;
        const normal = /[*]/;
        let usedColor = ``;
        
        if(important.test(todo)){
            usedColor = `<span class="important">`;
        } else if(uncertain.test(todo)){
            usedColor = `<span class="uncertain">`;
        } else if(optional.test(todo)){
            usedColor = `<span class="optional">`;
        } else if(normal.test(todo)){
            usedColor = `<span class="normal">`;
        } else {
            usedColor = `<span>`;
        }
        // console.log(usedColor);
        
        
        //* adds li
        ul.innerHTML += `<li><div class ="todo">${usedColor}${todo}</span></div><button class="delete-button">X</button></li>`;

        //* shows li and clear-all button
        ul.classList.remove('hidden');
        clearAllButton.classList.remove('hidden');
    }

    //* clears input field
    formAdd.reset();

    //* clears classes 
    formAdd.userValue.classList.remove('error');
    formAdd.userValue.classList.remove('valid');
});

//* live feedback
userToDo.addEventListener('keyup', () => {
    //* tests user value 
    const todo = userToDo.value.trim();
    let result = pattern.test(todo);
    // console.log(result);

    //* adds classes for feedback
    if(result){
        userToDo.classList.remove('error');
        userToDo.classList.add('valid');
    } else {
        userToDo.classList.remove('valid');
        userToDo.classList.add('error');
    }
});

//* deletes all li tags if button is pressed
clearAllButton.addEventListener('click', () => {
    const items = document.querySelectorAll('li');
    items.forEach(item => {
        item.remove();
    })

    //* hides ul and button itself
    ul.classList.add('hidden');
    clearAllButton.classList.add('hidden');
});

//* search for todos

const filterTodos = (term) => {
    Array.from(ul.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('hidden'));

    Array.from(ul.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('hidden'));
}

searchInput.addEventListener('keyup', () => {
   const term = searchInput.value.trim().toLowerCase(); 
   filterTodos(term);
    
   //* hides clear all button while serching for todo
   if(term.length){
    clearAllButton.classList.add('hidden');
   } else {
    clearAllButton.classList.remove('hidden');
   }
});