let overlayLogin = document.querySelector('.overlayLogin');
let enterBtn = document.querySelector('.headerMainMenuAccessEnter');
let html = document.querySelector('html');
let closeCross = document.querySelector('.modalClose');
// let modal = document.querySelector('.modal');
// let wrapper = document.querySelector('.wrapper');

enterBtn.addEventListener('click', function(){

    overlayLogin.style.display = 'flex';
    html.style.overflow = 'hidden';
 
});

closeCross.addEventListener('click', function() {

    overlayLogin.style.display = 'none';
    html.style.overflow = 'visible';
});

// Закрытие на esc

document.addEventListener('keydown', function(e) {

    if(e.keyCode == 27) {
    overlayLogin.style.display = 'none';
    }
});

// wrapper.addEventListener('click', function() {
    
//     // overlayLogin.style.display = 'none';
//     console.log('huik');
// })

// document.addEventListener('click', function(e) {
    
//     e.stopPropagation();

//     const test = e.composedPath().includes(modal);
    
//     if(!test.contains(modal)) {
//         overlayLogin.style.display = 'none';
//         console.log('none');
//     }
// });