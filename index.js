// JavaScript source code

let massWord = ['яблоко', 'смартфон', 'программист', 'машина', 'работа', 'отдыхает', 'компьютер', 'смузи', 'валерчик', 'вейп'];
let blackListLetter = [];
let countMistake = 0;
let randomWord;
let findingsLetter = 0;
const menImage = [".\\imgs\\1.png" , ".\\imgs\\2.png" , ".\\imgs\\3.png", ".\\imgs\\4.png" ];
const imageContainer = document.getElementById('image');
let wordDiscription = ['сочное и красное', 'современный гаджет по которому можно звонить', 'человек, который пишет код',
'четыре колеса, ездит', 'ходим туда чтоб зарабатывать деньги', 'действие, когда человек расслабляется',
'неотъемлимый инструмент любого программиста', 'что пьют javaScript разработчики?', 'Имя человека, которое очень часто использует препод js в it шаг',
'устройство для курения'];

//фуекция старта игры
const startGameGallows = function () {
    findingsLetter = 0;
    drawMen(0);
    let randomWordId = Math.round(Math.random() * massWord.length);
    randomWord = massWord[randomWordId];
    let lenghtWord = randomWord.length;
    drawDivs(lenghtWord);
    massWord.splice(randomWordId, 1);
    let discription = wordDiscription[randomWordId];
    wordDiscription.splice(randomWordId, 1);
    drawDiscription(discription);
    blackListLetter = [];
    countMistake = 0;
}

//функция рестарта игры
const restartGameGallows = function () {
    massWord = ['яблоко', 'смартфон', 'программист', 'машина', 'работа', 'отдых', 'компьютер', 'смузи', 'валерчик', 'вейп'];
    wordDiscription = ['сочное и красное', 'современный гаджет по которому можно звонить', 'человек, который пишет код',
'четыре колеса, ездит', 'ходим туда чтоб зарабатывать деньги', 'действие, когда человек расслабляется',
'неотъемлимый инструмент любого программиста', 'что пьют javaScript разработчики?', 'Имя человека, которое очень часто использует препод js в it шаг',
'устройство для курения'];
    startGameGallows();
}

// функция ввода буквы
let letterHolder = document.getElementById('input');
const enterLetter = function (){
    let letter = letterHolder.value;
    letterHolder.value = '';
    if (blackListLetter.includes(letter)) {
        alert('Вы уже вводили этот символ!');
        return;
    }
    blackListLetter.push(letter)
    let flag = false;
    for (let index = randomWord.indexOf(letter); index !== -1; index = randomWord.indexOf(letter, index + 1)) {
        flag = true;
        drawDivChar(index,letter);
        findingsLetter++;
    }
    if (!flag) {
        countMistake++;  
        drawMen(countMistake);
    }
    if (findingsLetter === randomWord.length) {
        setTimeout(()=>{showModal("Вы выиграли!",()=>{startGameGallows();});},500);
        
    }
}

// фукция отрисовки человечика
const drawMen  = function(index){
    
    imageContainer.src = menImage[index];
    if(index >2)
    {
        setTimeout(()=>{showModal("Вы проиграли, загаданное слово было : " + randomWord,()=>{startGameGallows();});},100);       
        return;
    }
}

// функция отрисовки дивов
let divHolder = document.getElementById('divHolder');
const drawDivs = function (count){   
    divHolder.innerHTML = '';
    for(let i = 0; i < count; i++){
        divHolder.innerHTML += '<div><div id=divel' + i + '>_</div></div>';
    }
}

// отрисовка описания слов
const drawDiscription = function(discription){
    document.getElementById('discriptionHolder').innerText = discription;
}

// фукция отрисовки буквы
const drawDivChar = function(index,letter){
    document.getElementById('divel' + index).innerText = letter;
}

// функция модального окна
let modal = document.getElementById('modal');
let modalFunction;
let modalText = document.getElementById('modalText');
const showModal = function (text, event){
    modal.className = 'modalOpen'
    modalText.innerText = text;
    modalFunction = event;
}

document.getElementById('buttonStart').addEventListener('click', restartGameGallows);
document.getElementById('inputForm').addEventListener('submit', enterLetter);
document.getElementById('input').addEventListener('invalid',()=>{letterHolder.value = ''});
document.getElementById('modalClose').addEventListener('click', ()=>{modalFunction()});
document.getElementById('modalClose').addEventListener('click', ()=>{modal.className = 'modalCloset';});
