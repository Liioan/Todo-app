const form = document.querySelector('form');
const userToDo = document.querySelector('.user-to-do');
const ul = document.querySelector('ul');
const pattern = /^[a-zA-z0-9_.,*+-/\sąęćśżźóńł'")(;]{1,}$/;

//* removes targeted li, adds hidden class if ul is empty
ul.addEventListener('click', e => {
    //* checks if delete acction was triggered 
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.parentElement.remove();
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
        ul.innerHTML += `<li><div class ="todo">${userToDo.value}<button>X</button></div></li>`;
        ul.classList.remove('hidden');
    } else {
       alert('error: incorrect value \ntype in correct value');
    }

    //* clears input field
    userToDo.value = '';

    //* clears classes 
    form.userValue.classList.remove('error');
    form.userValue.classList.remove('valid');
    
});

//* live feedback
form.userValue.addEventListener('keyup', e => {
    //* tests user value 
    let result = pattern.test(userToDo.value);
    // console.log(result);

    //* adds classes for feedback
    if(result){
        form.userValue.classList.remove('error');
        form.userValue.classList.add('valid');
    } else {
        form.userValue.classList.remove('valid');
        form.userValue.classList.add('error');
    }
});