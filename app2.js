const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 99999999999999999999999999999999;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];
let lastLoggedEntry;

let chosenMaxLife = 100;
let monsterHealtha = 9999999999999999999999;


let currentMonsterHealth = monsterHealtha;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val, 
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch(ev) {
        case LOG_EVENT_PLAYER_ATTACK: 
            logEntry.target = "MONSTER";
            break;
            case LOG_EVENT_PLAYER_STRONG_ATTACK:
                logEntry = {
                    event: ev,
                    value: val,
                    terget: "MONSTER", 
                    finalMonsterHealth: monsterHealth,
                    finalPlayerHealth: playerHealth
            };
            break;
            case LOG_EVENT_MONSTER_ATTACK:
                logEntry = {
                    event: ev,
                    value: val,
                    terget: "PLAYER", 
                    finalMonsterHealth: monsterHealth,
                    finalPlayerHealth: playerHealth
            };
            break;
            case LOG_EVENT_PLAYER_HEAL:
                logEntry = {
                    event: ev,
                    value: val,
                    terget: "PLAYER", 
                    finalMonsterHealth: monsterHealth,
                    finalPlayerHealth: playerHealth
            };
            break;
            case LOG_EVENT_GAME_OVER:
                logEntry = {
                    event: ev,
                    value: val,
                    finalMonsterHealth: monsterHealth,
                    finalPlayerHealth: playerHealth
            };
            break;
            default:
                logEntry = {}


    };
    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         terget: "MONSTER", 
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    // };
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         terget: "PLAYER", 
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    // };
    // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         terget: "PLAYER", 
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    // };
    // } else if (ev === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    // };
    // }
   battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = monsterHealtha;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("Mai ai o viata bonus!!");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("Ai castigat! Cum e posibil asa ceva?");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "Ai castigat",
            currentMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <=0 && currentMonsterHealth > 0) {
        alert("Ai pierdut! Chiar credeai ca il poti infrange pe marele KOOSALAGOOPAGOOP?")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "KOOSALAGOOPAGOOP a castigat!",
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("Egalitate!");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "EGALITATE!",
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
         {
            reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function onAttack() {
    attackMonster("ATTACK");
}

function onStrongAttack () {
    attackMonster("STRONG_ATTACK");
}

function onHeal() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("Nu te poti vindeca mai mult decat 100%!")
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function printLog() {
    for (let i = 0; i < 3; i++) {
        console.log("--------");
    }
    let j = 0;
    do {
        console.log("--------");
        j++;
    } while (j < 3);   
    // for(let i = 10; i > 0; i--) {
    //     console.log(i);
    // }
    // for (let i = 0; i < battleLog,length; i++) {
    //     console.log(battleLog[i]);
    // }
    let i = 0;
    for (const logEntry of battleLog) {
        if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
        console.log(`#${i}`);
        for (const key in logEntry) {
            console.log(`${key} => ${logEntry[key]}`);
        }
        lastLoggedEntry = i;
        break;
        };
        i++;
    };
}

attackBtn.addEventListener("click", onAttack);
strongAttackBtn.addEventListener("click", onStrongAttack);
healBtn.addEventListener("click", onHeal);
logBtn.addEventListener("click", printLog)