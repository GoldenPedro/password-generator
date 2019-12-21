const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

// Functions for the settings to generate the password.
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()[]{};',.-=_+/?`~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate EventListener
generateElement.addEventListener('click', function () {
    // Turn lengthElement from a string into a number
    const length = +lengthElement.value;
    // Check if the checkboxes are checked
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;
    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // Initialize a password variable for a string to build the password
    let generatedPassword = "";
    // Turn the array into objects with a key and then filter out any of them that are false (or 0).
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    // Loop over the length and call the generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        // Loop through the array
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunction[funcName]();
        });
    }
    // Add final password to the password variable and return it. Also slice off the extra characters attached due to typesCount.
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

    if(typesCount === 0) {
        return '';
    }
}


// Copy to Clipboard function
clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
});

