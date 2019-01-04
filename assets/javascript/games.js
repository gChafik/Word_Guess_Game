let numberOfGuessesRemainig = 9;
let wins = 0;
let losses = 0;
let userInputList = [];
let wordArrMasked = [];
let word = '';
let wordArr = word.split('');

function randomWord(){
    let wordList = ["cat", "dog", "mouse", "elephant", "lion", "giraffe"]
    //generates a random number to use as an index 
    let indexNumber = Math.floor(Math.random() * wordList.length) + 1;
    let randomWord = wordList[indexNumber];
    return randomWord
}
// To start and reset the game after each play except for the number of wins
function reset(){
    numberOfGuessesRemainig = 9;
    userInputList = [];
    word = randomWord();
    wordArr = word.split('');
    wordArrMasked = "-".repeat(wordArr.length).split('');
    document.querySelector("#current_word").innerHTML = wordArrMasked.join('');
    document.querySelector("#letter_guessed").innerHTML = userInputList;
}
$(document).ready(function() {
    reset();
    //Populate the masked word
    document.querySelector("#current_word").innerHTML = wordArrMasked.join('');
    //Populate number of gusses
    document.querySelector("#number_of_guesses_remaining").innerHTML = numberOfGuessesRemainig;
    //Populate number of wins
    document.querySelector("#wins").innerHTML = wins;
    document.querySelector("#losses").innerHTML = losses;

    document.onkeydown = function(event){
    let userInput = event.key.toLowerCase();
    //Check to see is the letter guessed is correct
    for (let index = 0; index < wordArr.length; index++) {
        if(userInput === wordArr[index]){
            wordArrMasked[index] = userInput;
            document.querySelector("#current_word").innerHTML = wordArrMasked.join('');
            // check to see if the entire word has bee guessed correctly
            if(wordArrMasked.join('') == word){
                wins++;
                alert("You Win! Play Again!");
                document.querySelector("#wins").innerHTML = wins;
                reset();
                break;
            }
        }
        //if the letter is not correct it's added to the letters guessed array
        else if(userInput !== wordArr[index] && wordArr[index] !== '-'){
            wordArrMasked[index] = wordArrMasked[index]; 
            if(userInputList.indexOf(userInput) === -1 && wordArr.indexOf(userInput) === -1){
                userInputList.push(userInput);
                numberOfGuessesRemainig--;
                //if the number of guesses has been exhaused and the word has not been guessed
                if(numberOfGuessesRemainig === 0){
                    losses++;
                    alert("You Lose! The Animal is: " + word + "  " + "Play Again!");
                    document.querySelector("#losses").innerHTML = losses;
                    reset();
                    break;
                }
            }
        }
        else{
            wordArrMasked[index] = '-';
            userInputList.push(userInput);
        }  
        //Updates the wrong guesses list
        document.querySelector("#letter_guessed").innerHTML = userInputList;
    }      
    //Updates how many guesses remaining
    document.querySelector("#number_of_guesses_remaining").innerHTML = numberOfGuessesRemainig;
    };
});