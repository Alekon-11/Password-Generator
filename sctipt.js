'use strict';

const dataPG = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~'
};

const rangeLineInput = document.querySelector('.range-line__input');
const rangeLineValue = document.querySelector('.range-line__value');
const progressLine = document.querySelector('.pass-progress-line');
const passwordInput = document.querySelector('.input-box input');
const generateBtn = document.querySelector('.create-btn');
const checkInputItems = document.querySelectorAll('.check__input');
const copyBtn = document.querySelector('.material-symbols-outlined');
const shuffleString = str => str.split('').sort(() => Math.random() - 0.5).join('');
const randomInteger = (min, max) => (Math.random() * (max - min) + min).toFixed();

function copyPassword(e) {
    navigator.clipboard.writeText(passwordInput.value)
    e.target.textContent = 'check';
    setTimeout(() => e.target.textContent = 'copy_all', 1000);
}

function savePasswordOptions() {
    const passOptions = {};
    passOptions['length'] = rangeLineInput.value;
    checkInputItems.forEach(item => {
        passOptions[item.name] = item.checked; 
    });
    localStorage.setItem('passOptions',JSON.stringify(passOptions));
}

function restorePasswordOptiions() {
    if(localStorage.getItem('passOptions')){
        const passOptions = JSON.parse(localStorage.getItem('passOptions'));
        const {length ,lowercase, uppercase, numbers, symbols} = passOptions;
        rangeLineInput.value = length;
        
        checkInputItems.forEach(item => {
            if(item.name === 'lowercase') item.checked = lowercase;
            if(item.name === 'uppercase') item.checked = uppercase;
            if(item.name === 'numbers') item.checked = numbers;
            if(item.name === 'symbols') item.checked = symbols;
        });

    }
}

function generatePassword(length) {

    let line = '';

    checkInputItems.forEach(item => {
        for(let key in dataPG){
            if(item.checked && item.name === key){
                line += dataPG[key];
            }
        }
    });

    let randomPassword = '';

    for(let i = 0; i < length; i++){
        let shuffledLine = shuffleString(line);
        let random = randomInteger(0, shuffledLine.length - 1 );
        randomPassword += shuffledLine[random];
    }

    if(length){
        passwordInput.value = randomPassword;
    } else {
        passwordInput.value = 0;
    }
}

function updateProgressLinePosition(value) {
    progressLine.classList.remove('weak', 'medium', 'strong');

    if (value > 0 && value < 10) {
        progressLine.classList.add('weak');
    } else if (value >= 10 && value <= 16) {
        progressLine.classList.add('medium');
    } else if (value > 16) {
        progressLine.classList.add('strong');
    }
}

function changeRangeLineValue(rangeLine, valueContent) {
    let rangeLineWidth = +rangeLine.clientWidth - 25;
    let leftValue = +rangeLine.value * (rangeLineWidth / +rangeLine.max);

    valueContent.textContent = rangeLine.value;
    valueContent.style.left = `${leftValue}px`;

    updateProgressLinePosition(+rangeLine.value);
    generatePassword(+rangeLine.value);
    savePasswordOptions();
}

restorePasswordOptiions(rangeLineInput);

rangeLineInput.addEventListener('input', e => changeRangeLineValue(e.target, rangeLineValue));
generateBtn.addEventListener('click', () => changeRangeLineValue(rangeLineInput, rangeLineValue));
copyBtn.addEventListener('click', e => copyPassword(e));

changeRangeLineValue(rangeLineInput, rangeLineValue);