

// Instancing variables
let turn = 'x';
let audio = new Audio('music.mp3');
let clickSound = new Audio('ting.mp3');
let gameOver = new Audio('gameover.mp3');
let isgameover = false;

const mediaQueryCondition = window.matchMedia('(max-width: 950px)')


//Code to change turn using ternary opertaor
const changeTurn =() =>{
    return turn === 'x' ? 'O':'x';
}


//Code to check who is won
const checkWin = () =>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0] ,
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90 ],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + ' Won';
            isgameover = true;
            audio.pause()
            gameOver.play()
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px';
            document.querySelector('.line').style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector('.line').style.width = '20vw';
            if(mediaQueryCondition.matches){
                document.querySelector('.line').style.width = '72vw';
            }
        }
        
    })
}

//click the options and changing as per the turn 
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audio.play()
            clickSound.play()
            checkWin();
            if(!gameOver){
                document.getElementsByClassName('info')[0].innerText = "Turn for "+turn;            }

        }
    })
})

//reset the whole options
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>[
        element.innerText = ' '
        
    ]);
    audio.pause()
    gameOver.play()
    turn = 'x';
    isgameover = false;
    document.querySelector('.line').style.width = '0vw';
    document.getElementsByClassName('info')[0].innerText = "Turn for "+turn;   
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';         
})