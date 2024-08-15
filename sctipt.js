'use strict';

const rangeInput = document.querySelector('.range__input');
const rangeValueBlock = document.querySelector('.range__value');

function chasgeRangeValue(parent, valueContentBlock) {
    let clientWidth = parent.clientWidth - 30;
    let leftValue = +parent.value * (clientWidth / +parent.max);

    valueContentBlock.textContent = parent.value;
    valueContentBlock.style.left = `${leftValue}px`;
}

rangeInput.addEventListener('input', e => chasgeRangeValue(e.target, rangeValueBlock));

chasgeRangeValue(rangeInput, rangeValueBlock);

// const headerTitle = document.querySelector('.header__title');

// function typeTextAnimation(parent) {
//     let textArr = [...parent.textContent];
//     let n = 0;
//     parent.textContent = '';

//     console.log(textArr);

//     const interval = setInterval(function(){
//         parent.textContent += textArr[n++];
//         if(n >= textArr.length){
//             clearInterval(interval);
//         }
//     }, 150);
   
// }

// typeTextAnimation(headerTitle);