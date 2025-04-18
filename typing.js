const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const wpm = document.querySelector('.wpm span b')
const cpm = document.querySelector('.cpm span b')
const btn = document.querySelector('button')
const mistakes = document.querySelector('.Mistakes span')


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex  = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
        "If you don't like a test prompt you can get a different (random) prompt with the change test button  or select a",
        "Specific paragraph to type from the list below. To find out how fast you type", 
        "You will see your progress, including errors on the left side as you type. In order to complete the test and save your score, you need to get 100% accuracy", 
        "You can fix errors as you go, or correct them at the end with the help of the spell checker"
    ];
    const random = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[random]){
        console.log(char);
    typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',() => input.focus());

    typingText.addEventListener('click',() =>{ input.focus()});
}

// Handle User Input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex); 
    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping=true;
        }


    if(char[charIndex].innerText === typedChar){
        (char[charIndex].classList.add('correct'))
            console.log("correct");
    }
        else{
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
            mistake++;
    }
    charIndex++;

    char[charIndex].classList.add('active');
    mistakes.innerText = mistake;
    cpm.innerText = charIndex- mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft; 
        let wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }

    else{
        clearInterval(timer);
    }
}


function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();