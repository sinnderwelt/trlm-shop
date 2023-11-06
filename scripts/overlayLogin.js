let overlayLogin = document.querySelector('.overlayLogin');
let enterBtn = document.querySelector('.headerMainMenuAccessEnter');
let html = document.querySelector('html');
let closeCross = document.querySelector('.modalClose');

// Настройка формы tel
let phoneInput = document.querySelector('input[type="tel"]');

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

// Закрытие на область без модалки

document.addEventListener('click', function(e){

    if(e.target===overlayLogin) {
        overlayLogin.style.display = 'none';
        html.style.overflow = 'visible';
    }
});


// Настройка формы tel

// Можно вводить только цифры

phoneInput.addEventListener('keypress', (e) => {
    if (e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
  })

// Форма ввода с эстонским форматом

const phonePrefix = "+372 ";

    // При фокусировке появляется +372

phoneInput.addEventListener("focus", function() {
    this.value = phonePrefix;
});

// Предотвращает удаление +372

phoneInput.addEventListener("input", function() {
  if (!this.value.startsWith(phonePrefix)) {
    this.value = phonePrefix;
  } else if (this.value.slice(0, phonePrefix.length) !== phonePrefix) {
    const cursorPosition = this.selectionStart;
    this.value = phonePrefix + this.value.slice(phonePrefix.length);
    this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }
});

// Удаляет фиксированный префикс номера телефона, если пользователь покидает поле input без ввода номера телефона

phoneInput.addEventListener("blur", function() {
  if (this.value === phonePrefix) {
    this.value = "";
  }
});


