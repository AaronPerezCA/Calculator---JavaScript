// Pseudocode
// --Shopping List--
// We will need 10 buttons of numbers 0-9
// We will also need the buttons for our operators +-/* 
// We will need a clear button AND a equals button =
// We will need a display area

// --The Process--
// First Number:  We press number keys to build our first number, be it one or several digits
// Select an operator, telling us what kind of math we will be doing before selecting our second number
// Second Number:  We press number keys to build our second number, be it one or several digits
// Typically, this is the point where we would click the equals button to complete our math
// --However, if we want to chain more mathematics together with more operators, clicking an operator should complete the math equation we set, and then carry the result over as the first number for a new equation
// --Also, if you hit equals, it will complete the equation, but THEN we can hit another operator in order to use the result as the first number of a new equation
// After an equation has happened, hitting a number key clears out the previous equation and starts building a new first number for a new equation 
// The clear button can be pressed at any time to clear out the previous math and clear the display, starting us back at building a new first number. 
// This application should LOOK like a calculator layout= this means a display on top and a square grid of keys down below. 
// Pressing 'Enter' on your keyboard should fire off the equals button
// ADD BACK BUTTON
// What it must do is you press the back button and it erases the last character of the display area, erasing the last number appended to the number that is being created so it will need to be in both number creations 
// we will need an event listener  like  btnBackspace.addEventListener("click", function(){ backspaceCalc }
// we will need a function -  function backspaceCalc(){}

// Get references to all the calculator buttons and display
// This allows us to add event listeners and update the display later
let btn0 = document.getElementById("btn0");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn7 = document.getElementById("btn7");
let btn8 = document.getElementById("btn8");
let btn9 = document.getElementById("btn9");
let btnPlus = document.getElementById("btnPlus");
let btnMinus = document.getElementById("btnMinus");
let btnMulti = document.getElementById("btnMulti");
let btnDivide = document.getElementById("btnDivide");
let btnClear = document.getElementById("btnClear");
let btnBack = document.getElementById("btnBack");
let btnEqual = document.getElementById("btnEqual");
let displayArea = document.getElementById("displayArea");
// Variables to track the input numbers, operator, and result
// stringNumber - tracks what number is currently being typed
let stringNumber = "";
// operatorSaved - saves the last operator pressed
let operatorSaved = "";
// num1, num2 - the numbers in the calculation
let num1 = 0;
let num2 = 0; 
// result - the result of the calculation
let result = 0; 


// The following is the function that dictates the behaviour of our number keys!
// numberPress function - handles when a number key is pressed
function numberPress(btnNum){
    // alert("You pressed the " + btnNum + " key!"); 
    if(result != 0){
        resetCalc();
    }
    // Updates stringNumber and the display
    stringNumber += btnNum; 
    console.log(stringNumber);
    
    //call function to display numbers pressed
    updateDisplay(); 

}

// opPress function - handles when an operator is pressed
function opPress(op){
    // if our result is NOT 0, we can assume we are trying to continue doing math with our current result as the first number
    // Saves the operator, updates num1 and/or calls doMath()
    if(result != 0){
        operatorSaved = op; 
        num1 = result;
        stringNumber = "";
        result = 0;
    }
    // if we have our first number and have NOT started building our second number, change the operator
    else if(num1 != 0 && stringNumber == ""){
        operatorSaved = op;
    }
    // if we have our first number and we HAVE started building the second number, we want to "do math" and then continue on with our new equation
    else if(num1 != 0 && stringNumber != ""){
        doMath();
        operatorSaved = op; 
        num1 = result; 
        stringNumber = "";
        result = 0;
    }
    // by process of elimination we know that we were just building our 1st number and need to save it to continue on to building our second number
    else{
        operatorSaved = op; 
        num1 = Number(stringNumber);
        stringNumber = "";
    }
    // Updates the display
    updateDisplay(); 
}


// updateDisplay shared function - displays stringNumber or full equation
function updateDisplay(){
    if(operatorSaved == ""){
        displayArea.innerText = stringNumber;
    }
    else{
        displayArea.innerText = num1 + " " + operatorSaved + " " + stringNumber
    }

}

// resetCalc function - clears all the variables, resets calculator
function resetCalc(){
     stringNumber = "";
     operatorSaved = "";
     num1 = 0;
     num2 = 0; 
     result = 0; 
     updateDisplay();
}

// doMath function - does the actual math calculation based on operatorSaved
function doMath(){
    num2 = Number(stringNumber);
    stringNumber = "";
    switch(operatorSaved){
        case "+": 
            result = num1 + num2; 
            break; 
        
        case "-":
            result = num1 - num2;
            break; 
    
        case "X":
            result = num1 * num2;
            break; 
        
        case "÷": 
            result = num1 / num2;
            break;
    }
}


// Event listeners: 
// Equals key calls doMath() then updates display with result
btnEqual.addEventListener("click", function(){
    doMath();
    displayArea.innerText = result;
    stringNumber = "";
    operatorSaved = "";
    num1 = "0";
    num2 = "0";
});

// Clear key calls resetCalc()
btnClear.addEventListener("click", function(){
    resetCalc();
});

btnBack.addEventListener("click", function(){
    // Check if there is anything to backspace
    if (stringNumber.length > 0) {
        // Remove the last character from the string
        stringNumber = stringNumber.slice(0, -1);
        updateDisplay();
    }
    else{
       display.innerText = display.innerText.slice(0, -1);
       updateDisplay();
    }
});



// Number keys call numberPress() with the number
// Button number, add Event Listener, for a click, a number press - (in string)
// parameter("") that is passed into function
// Overall this allows button presses to update the variables tracking the equation,
// call the math functions when needed, and update the display.
// The events are handled to build an equation out of the button presses and evaluate it.
btn0.addEventListener("click", function(){
    numberPress("0");
});
btn1.addEventListener("click", function(){
    numberPress("1");
});
btn2.addEventListener("click", function(){
    numberPress("2");
});
btn3.addEventListener("click", function(){
    numberPress("3");
});
btn4.addEventListener("click", function(){
    numberPress("4");
});
btn5.addEventListener("click", function(){
    numberPress("5");
});
btn6.addEventListener("click", function(){
    numberPress("6");
});
btn7.addEventListener("click", function(){
    numberPress("7");
});
btn8.addEventListener("click", function(){
    numberPress("8");
});
btn9.addEventListener("click", function(){
    numberPress("9");
});

// Operator keys call opPress() with the operator
btnPlus.addEventListener("click", function(){
    opPress("+");
});
btnMinus.addEventListener("click", function(){
    opPress("-");
});
btnMulti.addEventListener("click", function(){
    opPress("X");
});
btnDivide.addEventListener("click", function(){
    opPress("÷");
});


