let player1_name = document.getElementById("player1")
let player2_name = document.getElementById("player2")
let player1_score = document.getElementById("score-x")
let player2_score = document.getElementById("score-y")
let winner = document.getElementById("winner")
let box = Array.from(document.getElementsByClassName("box")) 
let game = document.getElementsByClassName("game")[0]

const X ="x"
const O ="o"

let current_player = X
let free_boxes = Array(9).fill(null)

const winning =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let player1_name_in =false
let player2_name_in =false
player1_name.addEventListener('change', function (e) {
    player1_name_in =true
    if(player1_name_in && player2_name_in){
        game.style.pointerEvents ="auto"
        winner.innerText = player1_name.value + " turn"
        player1_name.style.pointerEvents="none"
    }
})
player2_name.addEventListener('change', function (e) {
    player2_name_in =true
    if(player1_name_in && player2_name_in){
        game.style.pointerEvents ="auto"
        winner.innerText = player1_name.value + " turn"
        player1_name.style.pointerEvents="none"
    }
})

function start(){
    for(let i =0; i<box.length;i++){
        box[i].addEventListener('click', boxClicked)
    }
}

function boxClicked(e){
    const id = e.target.id
    if(!free_boxes[id]){
        free_boxes[id] = current_player
        e.target.innerText = current_player
        current_player = changePlayer(current_player,X,O)
    }
    if(checkFull()){
        winner.innerText = "Draw! "
        restart()  
    }
    let winner_value = playerWon()
    if(winner_value == X){
        winner.innerText = player1_name.value+" Wons!"
        player1_score.value++
        restart()
    }
    else if(winner_value == O){
        winner.innerText=player2_name.value+ " Wons!"
        player2_score.value++
        restart()
    }
}

function changePlayer(current,first, second){
    if(current === first){
        winner.innerText= player2_name.value + " turn"
        current = second
    }
    else{
        winner.innerText= player1_name.value + " turn"
        current=first
    }
    return current
}
function checkFull(){
    for(let i =0;i<free_boxes.length;i++){
        if(!free_boxes[i]){
            return false
        }
    }
    return true
}
function restart(){
    free_boxes.fill(null)
    for(let i =0; i<box.length;i++){
        box[i].innerText =""
    }
    current_player = X
    
}
function playerWon(){
    for(let i =0;i<winning.length;i++){
        let first_box = winning[i][0]
        let second_box = winning[i][1]
        let third_box = winning[i][2]
        if(free_boxes[first_box] && (free_boxes[first_box] == free_boxes[second_box] && free_boxes[first_box] == free_boxes[third_box] )){
            return free_boxes[first_box]
        }
    }
    return -1;
}
start()

