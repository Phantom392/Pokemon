let playerTurn = true;
let attacks = document.getElementById("menu").children;
let gameStart = false;
let gameContainer = document.getElementById("game-container");
let startScreenContainer = document.getElementById("startScreen");
let choosePokemonContainer = document.getElementById("choosePokemonContainer");
let playerOnePokemon;
let playerTwoPokemon;
let healthBars = document.getElementsByClassName("healthBar");
let upBars = document.getElementsByClassName("upBar");
let playerOneHeals = 3;
let playerTwoHeals = 3;
let typing = false;
let idleDX = 0;
let idleDY = 0;
let idling = true;
let fainted = false;
let animating = false;

let playerOneHP;
let playerTwoHP;
let onePlayer;

gameContainer.style.display = "none";
choosePokemonContainer.style.display = "none";
function getRand(min, max) {
    let rand = Math.floor((Math.random() * (max - min)) + min);
    return rand;
}

function intailEventListeners() {

    for (let i = 0; i < attacks.length; i++) {
        let button = attacks[i];
        let innerHTML = button.innerHTML;

        let boundAttack = attack.bind(null, innerHTML)

        button.addEventListener("click", boundAttack);
    }
}

function typeText(text, faint = false){
    if(!fainted || faint){
        let message = document.getElementById("message");
        message.innerHTML = "";
        typing = true;
        setInterval(function(){
            message.innerHTML += text.charAt(0);
            text = text.substring(1);
            if (text.length == 0){
                typing = false;
                clearInterval();
            }
        }, 40);
    }
    
}

function checkHealth() {
    document.getElementById("opponent-hp").innerHTML = playerTwoHP;
    document.getElementById("player-hp").innerHTML = playerOneHP;

    if (playerTwoHP <= 0) {
        document.getElementById("opponent-hp").innerHTML = 0;
        playerTwoHP = 0;
        healthBars[1].src = "Images/bars/NoHealth.png";
        faint(playerTwoPokemon[0]);
    } else if (playerOneHP <= 0) {
        document.getElementById("player-hp").innerHTML = 0;
        playerOneHP = 0;
        healthBars[0].src = "Images/bars/NoHealth.png";
        faint(playerOnePokemon[0]);
    }

    if (playerOneHP > playerOnePokemon[8]) {
        playerOneHP = playerOnePokemon[8];
        checkHealth();
    } else if (playerTwoHP > playerTwoPokemon[8]) {
        playerTwoHP = playerTwoPokemon[8];
        checkHealth();
    }

    if (0 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.125) {
        healthBars[1].src = "Images/bars/VeryLowHealth.png";
    } else if (0.125 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.250) {
        healthBars[1].src = "Images/bars/AlmostVeryLowHealth.png";
    } else if (0.250 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.375) {
        healthBars[1].src = "Images/bars/JustUnderHalfHealth.png";
    } else if (0.375 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.500) {
        healthBars[1].src = "Images/bars/HalfHealth.png";
    } else if (0.500 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.625) {
        healthBars[1].src = "Images/bars/HalfHealth.png";
    } else if (0.625 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.750) {
        healthBars[1].src = "Images/bars/JustOverHalfHealth.png";
    } else if (0.750 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.875) {
        healthBars[1].src = "Images/bars/AlmostVeryHighHealth.png";
    } else if (0.875 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 0.999) {
        healthBars[1].src = "Images/bars/VeryHighHealth.png";
    } else if (0.999 < playerOneHP / playerOnePokemon[8] && playerOneHP / playerOnePokemon[8] <= 1) {
        healthBars[1].src = "Images/bars/FullHealth.png";
    } else if (playerOneHP == 0) {
        healthBars[1].src = "Images/bars/NoHealth.png";
    }

    if (0 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.125) {
        healthBars[0].src = "Images/bars/VeryLowHealth.png";
    } else if (0.125 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.250) {
        healthBars[0].src = "Images/bars/AlmostVeryLowHealth.png";
    } else if (0.250 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.375) {
        healthBars[0].src = "Images/bars/JustUnderHalfHealth.png";
    } else if (0.375 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.500) {
        healthBars[0].src = "Images/bars/HalfHealth.png";
    } else if (0.500 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.625) {
        healthBars[0].src = "Images/bars/HalfHealth.png";
    } else if (0.625 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.750) {
        healthBars[0].src = "Images/bars/JustOverHalfHealth.png";
    } else if (0.750 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.875) {
        healthBars[0].src = "Images/bars/AlmostVeryHighHealth.png";
    } else if (0.875 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 0.999) {
        healthBars[0].src = "Images/bars/VeryHighHealth.png";
    } else if (0.999 < playerTwoHP / playerTwoPokemon[8] && playerTwoHP / playerTwoPokemon[8] <= 1) {
        healthBars[0].src = "Images/bars/FullHealth.png";
    } else if (playerTwoHP == 0) {
        healthBars[0].src = "Images/bars/NoHealth.png";
    }
}

function checkUltiBar() {
    if (0 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.125) {
        upBars[1].src = "Images/bars/VeryLowUP.png";
    } else if (0.125 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.250) {
        upBars[1].src = "Images/bars/AlmostVeryLowUP.png";
    } else if (0.250 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.375) {
        upBars[1].src = "Images/bars/JustUnderHalfUP.png";
    } else if (0.375 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.500) {
        upBars[1].src = "Images/bars/HalfUP.png";
    } else if (0.500 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.625) {
        upBars[1].src = "Images/bars/HalfUP.png";
    } else if (0.625 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.750) {
        upBars[1].src = "Images/bars/JustOverHalfUP.png";
    } else if (0.750 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.875) {
        upBars[1].src = "Images/bars/AlmostVeryHighUP.png";
    } else if (0.875 < playerOnePokemon[10] / 100 && playerOnePokemon[10] / 100 <= 0.999) {
        upBars[1].src = "Images/bars/VeryHighUP.png";
    } else if (0.999 < playerOnePokemon[10] / 100) {
        upBars[1].src = "Images/bars/FullUP.png";
    } else if (playerOnePokemon[10] == 0) {
        upBars[1].src = "Images/bars/NoUP.png";
    }

    if (0 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.125) {
        upBars[0].src = "Images/bars/VeryLowUP.png";
    } else if (0.125 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.250) {
        upBars[0].src = "Images/bars/AlmostVeryLowUP.png";
    } else if (0.250 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.375) {
        upBars[0].src = "Images/bars/JustUnderHalfUP.png";
    } else if (0.375 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.500) {
        upBars[0].src = "Images/bars/HalfUP.png";
    } else if (0.500 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.625) {
        upBars[1].src = "Images/bars/HalfUP.png";
    } else if (0.625 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.750) {
        upBars[0].src = "Images/bars/JustOverHalfUP.png";
    } else if (0.750 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.875) {
        upBars[0].src = "Images/bars/AlmostVeryHighUP.png";
    } else if (0.875 < playerTwoPokemon[10] / 100 && playerTwoPokemon[10] / 100 <= 0.999) {
        upBars[0].src = "Images/bars/VeryHighUP.png";
    } else if (0.999 < playerTwoPokemon[10] / 100) {
        upBars[0].src = "Images/bars/FullUP.png";
    } else if (playerTwoPokemon[10] == 0) {
        upBars[0].src = "Images/bars/NoUP.png";
    }
}

function attack(move) {
    if(!fainted){
        let pOneTwoMultiplier = 1.5;
        let pTwoOneMultiplier = 1.5;

        if (playerOnePokemon[9] == 'life' && playerTwoPokemon[9] == 'fire') {
            pTwoOneMultiplier = 2;
        } else if (playerOnePokemon[9] == 'fire' && playerTwoPokemon[9] == 'water') {
            pTwoOneMultiplier = 2;
        } else if (playerOnePokemon[9] == 'water' && playerTwoPokemon[9] == 'electric') {
            pTwoOneMultiplier = 2;
        } else if (playerOnePokemon[9] == 'magic' && playerTwoPokemon[9] == 'electric') {
            pTwoOneMultiplier = 2;
        } else if (playerOnePokemon[9] == 'life' && playerTwoPokemon[9] == 'fire') {
            pTwoOneMultiplier = 2;
        } else if (playerOnePokemon[9] == 'magic' && playerTwoPokemon[9] == 'life') {
            pTwoOneMultiplier = 2;
        }

        if (playerTwoPokemon[9] == 'life' && playerOnePokemon[9] == 'fire') {
            pOneTwoMultiplier = 2;
        } else if (playerTwoPokemon[9] == 'fire' && playerOnePokemon[9] == 'water') {
            pOneTwoMultiplier = 2;
        } else if (playerTwoPokemon[9] == 'water' && playerOnePokemon[9] == 'electric') {
            pOneTwoMultiplier = 2;
        } else if (playerTwoPokemon[9] == 'magic' && playerOnePokemon[9] == 'electric') {
            pOneTwoMultiplier = 2;
        } else if (playerTwoPokemon[9] == 'life' && playerOnePokemon[9] == 'fire') {
            pOneTwoMultiplier = 2;
        } else if (playerTwoPokemon[9] == 'magic' && playerOnePokemon[9] == 'life') {
            pOneTwoMultiplier = 2;
        }

        //Primary
        if (move == attacks[0].innerHTML || move == attacks[4].innerHTML) {
            if (playerTurn) {
                playerTwoHP -= pOneTwoMultiplier * (getRand(playerOnePokemon[2][0], playerOnePokemon[2][1]));
                animate("primary", playerOnePokemon[0]);
                playerOnePokemon[10] += getRand(10, 20);
                checkUltiBar();
                checkHealth();
            } else if (!playerTurn && !onePlayer) {
                playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[2][0], playerTwoPokemon[2][1]));
                animate("primary", playerTwoPokemon[0]);
                playerTwoPokemon[10] += getRand(10, 20);
                checkUltiBar();
                checkHealth();
            }
            //Secondary
        } else if (move == attacks[1].innerHTML || move == attacks[5].innerHTML) {
            if (playerTurn) {
                if (playerOneHP <= 35) {
                    playerTwoHP -= 6 + (pOneTwoMultiplier * (getRand(playerOnePokemon[4][0], playerOnePokemon[4][1])));
                } else {
                    playerTwoHP -= pOneTwoMultiplier * (getRand(playerOnePokemon[4][0], playerOnePokemon[4][1]));
                }
                animate("secondary", playerOnePokemon[0]);
                playerOnePokemon[10] += getRand(10, 20);
                checkUltiBar();
                checkHealth();
            } else if (!playerTurn && !onePlayer) {
                playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[4][0], playerTwoPokemon[4][1]));
                animate("secondary", playerTwoPokemon[0]);
                playerTwoPokemon[10] += getRand(10, 20);
                checkUltiBar();
                checkHealth();
            }
            //Ulitmate
        } else if (move == attacks[2].innerHTML || move == attacks[6].innerHTML) {
            if (playerTurn) {
                if (playerOnePokemon[10] >= 100) {
                    playerTwoHP -= pOneTwoMultiplier * (getRand(playerOnePokemon[6][0], playerOnePokemon[6][1]));
                    animate("ultimate", playerOnePokemon[0]);
                    playerOnePokemon[10] = 0;
                    checkUltiBar();
                    checkHealth();
                } else {
                    document.getElementById("menu").style.display = "none";
                    document.getElementById("message").style.width = "100%";
                    typeText("Not enough energy!");

                    setTimeout(function () {
                        document.getElementById("message").style.width = '35%';
                        document.getElementById("menu").style.display = 'grid';
                        document.getElementById("menu").style.gridTemplateColumns = "28% 22% 30% 20%";
                    }, 2000);
                    return;
                }
            } else if (!playerTurn && !onePlayer) {
                if (playerOnePokemon[10] >= 100) {
                    playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[6][0], playerTwoPokemon[6][1]));
                    animate("ultimate", playerTwoPokemon[0]);
                    playerTwoPokemon[10] = 0;
                    checkUltiBar();
                    checkHealth();
                } else {
                    document.getElementById("menu").style.display = "none";
                    document.getElementById("message").style.width = "100%";
                    typeText("Not enough energy!");

                    setTimeout(function () {
                        document.getElementById("message").style.width = '35%';
                        document.getElementById("menu").style.display = 'grid';
                        document.getElementById("menu").style.gridTemplateColumns = "28% 22% 30% 20%";
                    }, 2000);
                    return;
                }
            }
            //Heal
        } else if (move == attacks[3].innerHTML || move == attacks[7].innerHTML) {
            if (playerTurn) {
                if (playerOneHeals > 0) {
                    playerOneHP += getRand(10, 20);
                    playerOneHeals -= 1;
                    animate("heal", playerOnePokemon[0]);
                    playerOnePokemon[10] += getRand(10, 20);
                    checkUltiBar();
                    checkHealth();
                } else {
                    document.getElementById("menu").style.display = "none";
                    document.getElementById("message").style.width = "100%";
                    typeText(playerOnePokemon[0] + " doesn't have any more heals");

                    setTimeout(function () {
                        document.getElementById("message").style.width = '35%';
                        document.getElementById("menu").style.display = 'grid';
                        document.getElementById("menu").style.gridTemplateColumns = "28% 22% 30% 20%";
                    }, 2000);
                    return;
                }

            } else if (!playerTurn && !onePlayer) {
                if (playerTwoHeals > 0) {
                    playerTwoHP += getRand(10, 20);
                    playerTwoHeals -= 1;
                    animate("heal", playerTwoPokemon[0]);
                    playerTwoPokemon[10] += getRand(10, 20);
                    checkUltiBar();
                    checkHealth();
                } else {
                    document.getElementById("menu").style.display = "none";
                    document.getElementById("message").style.width = "100%";
                    typeText(playerTwoPokemon[0] + " doesn't have any more heals");

                    setTimeout(function () {
                        document.getElementById("message").style.width = '35%';
                        document.getElementById("menu").style.display = 'grid';
                        document.getElementById("menu").style.gridTemplateColumns = "28% 22% 30% 20%";
                    }, 2000);
                    return;
                }

            }
        }
        //ONEPLAYER 
        if (!playerTurn && onePlayer) {
            console.log("turned");
            let autoMove;
            document.getElementById("menu").style.display = "none";
            document.getElementById("message").style.width = "100%";
            setTimeout(function(){
                if(playerTwoPokemon[10] >= 100){
                        playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[6][0], playerTwoPokemon[6][1]));
                        animate("ultimate", playerTwoPokemon[0]);
                        playerTwoPokemon[10] = 0;
                        checkUltiBar();
                        checkHealth();
                        autoMove = "ultimate";
                }else if(playerTwoHP > 40){
                    playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[4][0], playerTwoPokemon[4][1]));
                    animate("primary", playerTwoPokemon[0])
                    playerTwoPokemon[10] += getRand(10, 20);
                    checkHealth();
                    checkUltiBar();
                    autoMove = "primary";
                } else if(playerTwoHP <= 40){
                    if(playerTwoHeals != 0){
                        playerTwoHP += getRand(10, 20);
                        playerTwoHeals -= 1;
                        animate("heal", playerTwoPokemon[0]);
                        playerTwoPokemon[10] += getRand(10, 20);
                        checkUltiBar();
                        checkHealth();
                        autoMove = "heal";
                    } else {
                        playerOneHP -= pTwoOneMultiplier * (getRand(playerTwoPokemon[4][0], playerTwoPokemon[4][1]));
                        animate("secondary", playerTwoPokemon[0]);
                        playerTwoPokemon[10] += getRand(10, 20);
                        checkUltiBar();
                        checkHealth();
                        autoMove = "secondary";
                    }
                }
            }, 2000);
            setTimeout(function(){
                if(autoMove == "primary"){
                    typeText(playerTwoPokemon[0] + " used " + playerTwoPokemon[1] + "!");
                    autoMove = playerTwoPokemon[1];
                } else if(autoMove == "secondary"){
                    typeText(playerTwoPokemon[0] + " used " + playerTwoPokemon[3] + "!");
                    autoMove = playerTwoPokemon[3];
                } else if(autoMove == "ultimate"){
                    typeText(playerTwoPokemon[0] + " used " + playerTwoPokemon[5] + "!");
                    autoMove = playerTwoPokemon[5];
                } else if(autoMove == "heal"){
                    typeText(playerTwoPokemon[0] + " used " + playerTwoPokemon[7] + "!");
                    autoMove = playerTwoPokemon[7];
                }   
            }, 3000);

            setTimeout(function(){
                if (pTwoOneMultiplier != 1.5) {
                    veryEffective(autoMove);
                } else if(pOneTwoMultiplier != 1.5){
                    typeText("\n" + autoMove + " was  not effective!");
                }

            }, 5000);
        }
        document.getElementById("menu").style.display = "none";
        document.getElementById("message").style.width = "100%";
        if (playerTurn) {
            typeText(playerOnePokemon[0] + " used " + move + "!");
            if(pTwoOneMultiplier == 1.5 && pOneTwoMultiplier == 1.5){
                setTimeout(changeTurn, 3000)
                return;
            }
            setTimeout(function(){
                if (pOneTwoMultiplier != 1.5) {
                    veryEffective(move);
                } else if(pTwoOneMultiplier != 1.5){
                    typeText("\n" + move + " was  not effective!");
                }

            }, 2000);
            setTimeout(changeTurn, 7000);
            return;

        } else if (!playerTurn && !onePlayer) {
            typeText(playerTwoPokemon[0] + " used " + move + "!");
            setTimeout(function(){
                if (pTwoOneMultiplier != 1.5) {
                    veryEffective(move);
                } else if(pOneTwoMultiplier != 1.5){
                    typeText("\n" + move + " was  not effective!");
                }

            }, 2500);
            setTimeout(changeTurn, 5500);
            return;

        } 

        if (move == "Heal") {
            if (playerTurn) {
                typeText(playerOnePokemon[0] + " has " + playerOneHeals + " heals left!");
            } else {
                typeText(playerTwoPokemon[0] + " has " + playerTwoHeals + " heals left!");
            }
        }


        setTimeout(changeTurn, 10000);

    }
    
}

function veryEffective(move) {
    typeText("\n" + move + " was very effective!");
}

function checkImages() {
    let sprites = document.getElementsByClassName("sprite");
    sprites[1].setAttribute("src", "Images/" + playerOnePokemon[0] + ".png");
    sprites[0].setAttribute("src", "Images/" + playerTwoPokemon[0] + ".png");
}

function changeTurn() {
    if (playerTurn) {
        attacks[0].style.display = 'none';
        attacks[1].style.display = 'none';
        attacks[2].style.display = 'none';
        attacks[3].style.display = 'none';
        attacks[4].style.display = 'block';
        attacks[5].style.display = 'block';
        attacks[6].style.display = 'block';
        attacks[7].style.display = 'block';
        typeText("What will " + playerTwoPokemon[0] + " do?");
        //document.getElementById("message").innerHTML = ;
    } else if (!playerTurn) {
        attacks[0].style.display = 'block';
        attacks[1].style.display = 'block';
        attacks[2].style.display = 'block';
        attacks[3].style.display = 'block';
        attacks[4].style.display = 'none';
        attacks[5].style.display = 'none';
        attacks[6].style.display = 'none';
        attacks[7].style.display = 'none';
        typeText("What will " + playerOnePokemon[0] + " do?");
    }
    document.getElementById("message").style.width = '35%';
    document.getElementById("menu").style.display = 'grid';
    document.getElementById("menu").style.gridTemplateColumns = "28% 22% 30% 20%";
    playerTurn = !playerTurn;
    checkHealth();
    if(onePlayer && !playerTurn){
        attack();
    }
}

function faint(pokemon) {
    fainted = true;
    idling = false;
    document.getElementById("menu").style.display = "none";
    document.getElementById("message").style.width = "100%";
    typeText(pokemon + " fainted!", true);
    setInterval(function(){
        if(!animating){
            animate('faint', pokemon);
            clearInterval();
        }
    })
}

function animate(animation, pokemon) {
    let dx = 0;
    let dy = 0;
    let rotation = 0;
    let moving;
    animating = true;
    idling = false;
    if (animation == "primary"){
        console.log('animating primary');
        moving = setInterval(function(){
            moveObject(dx, dy, pokemon, rotation);
            dx -= 4;
            dy += 1;
            rotation -= 1;
            if (dx <= -160){
                clearInterval(moving);
                moving = setInterval(function(){
                    moveObject(dx, dy, pokemon, rotation);
                    dx += 4;
                    dy -= 1;
                    rotation += 1;
                    if (dx > 0){
                        clearInterval(moving);
                        idling = true;
                        animating = false;
                        idleAnimation();
                    }
                }, 30);
            }
        }, 30);
    } else if(animation == 'secondary'){
        console.log('animating secondary');
        moving = setInterval(function(){
            moveObject(dx, dy, pokemon, rotation);
            dx -= 4;
            dy += 1;
            rotation +=1;
            if (dx <= -160){
                clearInterval(moving);
                moving = setInterval(function(){
                    moveObject(dx, dy, pokemon, rotation);
                    dx += 4;
                    dy -= 1;
                    rotation -= 1;
                    if (dx > 0){
                        clearInterval(moving);
                        idling = true;
                        animating = false;
                        idleAnimation();
                    }
                }, 30);
            }
        }, 30);
    } else if(animation == 'ultimate'){
        console.log('animating ultimate');
        moving = setInterval(function(){
            moveObject(dx, dy, pokemon, rotation);
            dx -= 4;
            dy += 1;
            rotation -= 8;
            if (dx <= -160){
                clearInterval(moving);
                moving = setInterval(function(){
                    moveObject(dx, dy, pokemon, rotation);
                    dx += 4;
                    dy -= 1;
                    rotation += 8;
                    if (dx > 0){
                        clearInterval(moving);
                        idling = true;
                        animating = false;
                        idleAnimation();
                    }
                }, 30);
            }
        }, 30);
    } else if(animation == 'heal'){
        console.log('animating heal');
        moving = setInterval(function(){
            moveObject(dx, dy, pokemon, rotation);
            dx -= 0;
            dy += 3;
            rotation -= 9;
            if (dy >= 60){
                clearInterval(moving);
                moving = setInterval(function(){
                    moveObject(dx, dy, pokemon, rotation);
                    dx += 0;
                    dy -= 3;
                    rotation -= 9;
                    if (dy < 0){
                        clearInterval(moving);
                        idling = true;
                        animating = false;
                        idleAnimation();
                    }
                }, 30);
            }
        }, 30);
    } else if (fainted){
        console.log('animating faint');
        runningfaint = true;
        rotation = 0;
        console.log(runningfaint);
        console.log(playerTurn);

        moving = setInterval(function(){
            moveObject(0, 0, pokemon, rotation);
            rotation -=9;
            if(rotation == -180){
                console.log('done');
                moveObject(0, 0, pokemon, rotation);
                rotation -=9;
                clearInterval(moving);
            }
        }, 30);
    }
}
let runningfaint = false;
let movingplayer;
function moveObject(dx, dy, pokemon, rotation){
    let sprites = document.getElementsByClassName("sprite");

    if(playerOnePokemon[0] == playerTwoPokemon[0]){
        if(playerTurn && !runningfaint){
            movingplayer = 'one';
            console.log('1');
        } else if(!playerTurn && !runningfaint){
            movingplayer = 'two';
            console.log('2');
        } else if (playerTurn && runningfaint){
            if(playerTurn){
                movingplayer = 'two';
                console.log('3');
            }else{
                movingplayer = 'one';
                console.log('4');
            }
        }
    }
    if(playerOnePokemon[0] != playerTwoPokemon[0]){
        if(playerOnePokemon[0] == pokemon){
            movingplayer = 'one';
        } else if(playerTwoPokemon[0] == pokemon){
            movingplayer = 'two';
        }
    }
    if(movingplayer == 'one'){
        sprites[1].style.transform = "translate(" + (80 - dx - idleDX) + "px, " + (0 - dy - idleDY) + "px) rotate(" + rotation + "deg)";
    } else if (movingplayer == 'two'){
        sprites[0].style.transform = "translate(" + (250 + dx + idleDX) + "px, " + (40 + dy + idleDY) + "px) rotate(" + (-rotation) + "deg)";
    }
    
}

function idleAnimation(){
    let sprites = document.getElementsByClassName("sprite");
    let idlemovingOne;
    if(idling && !fainted){
        idlemovingOne = setInterval(function(){
            sprites[1].style.transform = "translate(" + (80 - idleDX) + "px, " + (0 - idleDY) + "px)";
            sprites[0].style.transform = "translate(" + (250 + idleDX) + "px, " + (40 + idleDY) + "px)";
            idleDX += 1;
            if(idleDX >= 50){
                let idlemovingTwo = setInterval(function(){
                idleDX -=1;
                if(idleDX <= -50){
                    clearInterval(idlemovingTwo);
                }
                }, 30);
            }
        }, 30);
    }

    setInterval(function(){
        if(!idling){
            clearInterval(idlemovingOne);
        }
        if(fainted){
            clearInterval(idlemovingOne);
        }
    }, 30);
}

function choosePokemon() {
    let pokemonList = Array.from(document.querySelectorAll('#Pokemon button'));
    startScreenContainer.style.display = "none";
    choosePokemonContainer.style.display = "inline";
    let playersChosen = 1;
    for (let i = 0; i < 8; i++) {
        pokemonList[i].addEventListener("click", function () {
            if (onePlayer) {
                playerOnePokemon = pokemonList[i].querySelector('img').alt;
                let randomPokemon = Math.floor(Math.random() * 8);
                playerTwoPokemon = pokemonList[randomPokemon].querySelector('img').alt;
                startGame();
            } else if (!onePlayer && playersChosen == 2) {
                playerTwoPokemon = pokemonList[i].querySelector('img').alt;
                startGame();
            } else if (!onePlayer && playersChosen == 1) {
                playerOnePokemon = pokemonList[i].querySelector('img').alt;
                playersChosen++;
                document.getElementById('playerchoose').innerHTML = 'Player Two: Choose your character!';
            }

        });
    }
}

function assignPokemonArrays() {
    console.log("ONE: " + playerOnePokemon);
    console.log("TWO: " + playerTwoPokemon);
    for (let i = 0; i < fullPokemonList.length; i++) {
        if (playerOnePokemon == fullPokemonList[i][0]) {
            playerOnePokemon = fullPokemonList[i];
        }
        if (playerTwoPokemon == fullPokemonList[i][0]) {
            playerTwoPokemon = fullPokemonList[i];
        }
    }
    console.log("ONE: " + playerOnePokemon);
    console.log("TWO: " + playerTwoPokemon);
    playerOneHP = playerOnePokemon[8];
    playerTwoHP = playerTwoPokemon[8];
}

function startGame() {
    choosePokemonContainer.style.display = "none";
    gameContainer.style.display = "block";
    assignPokemonArrays();
    document.getElementById("playerName").innerHTML = playerOnePokemon[0];
    document.getElementById("playerFullHP").innerHTML = "/" + playerOnePokemon[8];
    document.getElementById("opponentName").innerHTML = playerTwoPokemon[0];
    document.getElementById("opponentFullHP").innerHTML = "/" + playerTwoPokemon[8];
    attacks[0].innerHTML = playerOnePokemon[1];
    attacks[1].innerHTML = playerOnePokemon[3];
    attacks[2].innerHTML = playerOnePokemon[5];
    attacks[3].innerHTML = playerOnePokemon[7];
    attacks[4].innerHTML = playerTwoPokemon[1];
    attacks[5].innerHTML = playerTwoPokemon[3];
    attacks[6].innerHTML = playerTwoPokemon[5];
    attacks[7].innerHTML = playerTwoPokemon[7];
    checkImages();
    checkHealth();
    intailEventListeners();
    playerTurn = false;
    changeTurn();
    idling = true;
    idleAnimation();
}



let bulbasaur = ['Bulbasaur', 'Charge', [4, 7], 'Whip', [7, 9], 'Poison Cloud', [14, 19], 'Heal', 70, 'life', 0, ''];
let charmander = ['Charmander', 'Blaze', [6, 9], 'Smack', [7, 13], 'Flamethrower', [16, 25], 'Heal', 60, 'fire', 0, ''];
let pikachu = ['Pikachu', 'Slap', [6, 7], 'Blast', [7, 13], 'Electric Bolt', [20, 21], 'Heal', 65, 'electric', 0, ''];
let gengar = ['Gengar', 'Tackle', [5, 7], 'Claw', [6, 7], 'Shadow Bomb', [20, 27], 'Heal', 65, 'magic', 0, ''];
let nidorino = ['Nidorino', 'Fury', [3, 5], 'Kick', [7, 8], 'Toxic Spikes', [14, 16], 'Heal', 74, 'normal', 0, ''];
let squirtle = ['Squirtle', 'Water Gun', [6, 7], 'Ram', [7, 9], 'Aqua Jet', [16, 20], 'Heal', 70, 'water', 0, ''];
let eevee = ['Eevee', 'Scratch', [4, 4], 'Ram', [5, 6], 'Tail Whip', [13, 16], 'Heal', 68, 'normal', 0, ''];
let magikarp = ['Magikarp', 'Slap', [3, 4], 'Splash', [4, 5], 'Squirt', [15, 18], 'Heal', 60, 'water', 0, ''];
let fullPokemonList = [bulbasaur, charmander, pikachu, gengar, nidorino, squirtle, eevee, magikarp];

let players = document.getElementById("startScreen").children;
players[3].addEventListener("click", function () {
    onePlayer = true;
    choosePokemon();
});
players[4].addEventListener("click", function () {
    onePlayer = false;
    choosePokemon();
});
