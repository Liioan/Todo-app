const form = document.querySelector('form');
const userToDo = document.querySelector('.user-to-do');
const ul = document.querySelector('ul');
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
    }
    // console.log(liArr)
});

//* adds new li element, removes hidden class
form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(userToDo.value.length)

    //* tests if value is empty
    let result = pattern.test(userToDo.value);
    // console.log(result);

    if(result){
        //* checks if user used color for li
        const important = /[!]/;
        const uncertain = /[?]/;
        const optional = /[.]/;
        const normal = /[*]/;
        let usedColor = ``;
        
        if(important.test(userToDo.value)){
            usedColor = `<span class="important">`;
        } else if(uncertain.test(userToDo.value)){
            usedColor = `<span class="uncertain">`;
        } else if(optional.test(userToDo.value)){
            usedColor = `<span class="optional">`;
        } else if(normal.test(userToDo.value)){
            usedColor = `<span class="normal">`;
        } else {
            usedColor = `<span>`;
        }
        console.log(usedColor);
        
        
        //* adds li
        ul.innerHTML += `<li><div class ="todo">${usedColor}${userToDo.value}</span></div><button>X</button></li>`;
        ul.classList.remove('hidden');
    }

    //* clears input field
    userToDo.value = '';

    //* clears classes 
    form.userValue.classList.remove('error');
    form.userValue.classList.remove('valid');
    
});

//* live feedback
userToDo.addEventListener('keyup', () => {
    //* tests user value 
    let result = pattern.test(userToDo.value);
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
