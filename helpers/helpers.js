/** Capitalizing only first char of prop string. */
export const capitalizeFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Logging result of the game.
 * @param  {string} res - Result of the game.
 * @param  {number} winner - Winner of the game.
 * @param  {number} loser - Loser of the game.
 */
export const logWinner = (res, winner, loser) => console.log(`${res} ${winner} to ${loser}.`)

/**
 * Logging result of the round.
 * @param  {string} res - Result of the round.
 * @param  {string} winnersChoice - Winners choice.
 * @param  {string} losersChoice - Losers choice.
 */
export const writeRoundResult = (res, winnersChoice, losersChoice) => `${res} ${winnersChoice} beats ${losersChoice}.`
