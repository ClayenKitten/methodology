import readlineSync from "readline-sync";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function game1(name) {
    function NOK(A)
    {   
        let  n = A.length, a = Math.abs(A[0]);
        for (let i = 1; i < n; i++)
        {
            let b = Math.abs(A[ i ]), c = a;
            while (a && b){ a > b ? a %= b : b %= a; } 
            a = Math.abs(c*A[ i ])/(a+b);
        }
        return a;
    }

    console.log("Find the smallest common multiple of given numbers.");
    for (let i = 0; i < 3; i++) {
        const a = getRandomInt(20) + 2;
        const b = getRandomInt(20) + 2;
        const c = getRandomInt(20) + 2;
        const answer = readlineSync.question(`Question: ${a} ${b} ${c}\nAnswer: `);
        const correct = NOK([a, b, c]);
        if (answer == correct) {
            console.log("Correct!")
        } else {
            console.log(`'${answer}' is wrong answer ;(. Correct answer was '${correct}'.`)
            console.log(`Let's try again, ${name}!`)
        }
    }
    console.log(`Congratulations, ${name}!`);
}

function game2(name) {
    console.log("What number is missing in the progression?");
    for (let i = 0; i < 3; i++) {
        const length = getRandomInt(3) + 5;
        const offset = getRandomInt(2);
        const r = getRandomInt(10) + 2;
        const missingIdx = getRandomInt(length);
        let output = [];
        for (let i = offset; i < length + offset; i++) {
            output.push(Math.pow(r, i).toFixed());
        }
        const correct = output[missingIdx];
        output[missingIdx] = "..";
        console.log("Question: " + output.join(" "));
        const answer = readlineSync.question(`Answer: `);
        if (answer != correct) {
            console.log(`'${answer}' is wrong answer ;(. Correct answer was '${correct}'.`);
            console.log(`Let's try again, ${name}!`);
            return;
        }
        console.log("Correct!")
    }
    console.log(`Congratulations, ${name}!`);
}


console.log("Welcome to the Brain Games!");
let username = readlineSync.question("May I have your name?\n");
console.log(`Hello, ${username}! Choose your game:`);
const game = readlineSync.questionInt("[1] Least common multiple\n[2] Progression\n");
if (game == 1) game1(username);
else game2(username);


// Question: 5 7 15
// Your answer: 105
// Correct!
// Question: 100 50 1
// Your answer: 100
// Correct!
// Question: 3 9 27
// Your answer: 27
// Correct!
// Congratulations, Sam!
// В случае, если пользователь даст неверный ответ, необходимо вывести:
// Question: 5 10 25
// Your answer: 15
// '15' is wrong answer ;(. Correct answer was '25'.
// Let's try again, Sam!