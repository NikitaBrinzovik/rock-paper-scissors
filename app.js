import {CHOICES, ERRORS, RESULTS} from "./consts/consts.js";
import {capitalizeFirstChar, logWinner, writeRoundResult} from "./helpers/helpers.js";

/** How many rounds will player play before game will be over */
const roundsCounts = 5;

/*** Plays a 'roundsCounts' rounds and reports the winner. */
(function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 1; i <= roundsCounts; i++) {
        let result = playRound(playerPlay(i), computerPlay());

        console.log(`Round ${i}: ${result}`);

        if (result.startsWith(RESULTS.win)) playerScore++;
        if (result.startsWith(RESULTS.lose)) computerScore++;
        if (result.startsWith(ERRORS.inputError)) i--;
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
    return  prompt(`Round ${roundNumber}: Rock, Paper, or Scissors?`);
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
    playerSelection = playerSelection?.trim().toLowerCase();

    if (!Object.values(CHOICES).includes(playerSelection)) {
        return ERRORS.inputError;
    }

    if (playerSelection === computerSelection) {
        return RESULTS.tie;
    }

    if (
        (playerSelection === CHOICES.Rock && computerSelection === CHOICES.Scissors) ||
        (playerSelection === CHOICES.Paper && computerSelection === CHOICES.Rock) ||
        (playerSelection === CHOICES.Scissors && computerSelection === CHOICES.Paper)
    ) {
        return writeRoundResult(RESULTS.win, capitalizeFirstChar(playerSelection), computerSelection);
    }

    return writeRoundResult(RESULTS.lose, capitalizeFirstChar(computerSelection), playerSelection);
}
