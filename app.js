import {CHOICES, ERRORS, RESULTS} from "./consts/consts.js";
import {
    capitalizeFirstChar,
    logWinner,
    trimAndLowercase,
    writeRoundResult
} from "./helpers/helpers.js";

/** How many rounds will player play before game will be over */
const roundsCounts = 5;

/*** Plays a 'roundsCounts' rounds and reports the winner. */
(function game() {
    let playerScore = 0;
    let computerScore = 0;
    let score;

    for (let i = 1; i <= roundsCounts; i++) {
        score = playRound(playerPlay(i), computerPlay());

        if (score.startsWith(RESULTS.abort)) return;

        console.log(`Round ${i}: ${score}`);

        if (score.startsWith(RESULTS.win)) playerScore++;
        if (score.startsWith(RESULTS.lose)) computerScore++;
        if (score.startsWith(RESULTS.continue) ||score.startsWith(ERRORS.inputError)) i--;
    }

    if (playerScore > computerScore) {
        return logWinner(RESULTS.win, playerScore, computerScore);
    }

    if (playerScore < computerScore) {
        return logWinner(RESULTS.lose, computerScore, playerScore);
    }

    return logWinner(RESULTS.tie, playerScore, computerScore);
})()

/**
 * Returns a player input selection of Rock, Paper, or Scissors.
 * @return {string} A player chosen selection.
 */
function playerPlay(roundNumber) {
    const playersChoice =  prompt(`Round ${roundNumber}: Rock, Paper, or Scissors?`);
    return  playersChoice !== null ? playersChoice : abortGame();
}

/**
 * Returns a random selection of Rock, Paper, or Scissors.
 * @return {string} A randomly chosen selection.
 */

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * Object.keys(CHOICES).length);
    return Object.values(CHOICES)[randomIndex];
}

/**
 * Plays a single round of Rock Paper Scissors.
 * @param  {string} playerSelection - The player's selection.
 * @param  {string} computerSelection - The computer's selection.
 * @return {string} declaring the winner of the round.
 */
function playRound(playerSelection, computerSelection) {
    playerSelection = trimAndLowercase(playerSelection);

    if (playerSelection.startsWith(RESULTS.abort)) return RESULTS.abort;
    if (playerSelection.startsWith(RESULTS.continue)) return RESULTS.continue;
    if (!Object.values(CHOICES).includes(playerSelection)) return ERRORS.inputError;

    if (playerSelection === computerSelection) return RESULTS.tie;
    if (
        (playerSelection === CHOICES.Rock && computerSelection === CHOICES.Scissors) ||
        (playerSelection === CHOICES.Paper && computerSelection === CHOICES.Rock) ||
        (playerSelection === CHOICES.Scissors && computerSelection === CHOICES.Paper)
    ) {
        return writeRoundResult(RESULTS.win, capitalizeFirstChar(playerSelection), computerSelection);
    }

    return writeRoundResult(RESULTS.lose, capitalizeFirstChar(computerSelection), playerSelection);
}

/** Call new prompt-window to abort the game or return playing. */
function  abortGame() {
    const isAbort = prompt('Well, well, well, do you desire to conclude this amusingly' +
        ' entertaining activity? Please type "no" to continue indulging in this fascinating game,' +
        ' or type "yes" to abandon this magnificent creation of the almighty megabrain!')

    if(isAbort !== null &&  trimAndLowercase(isAbort) !== 'no'){
        console.log("Oh! That's your choice - you will regret!")
        return RESULTS.abort;
    }

    return RESULTS.continue
}
