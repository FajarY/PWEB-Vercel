const mainElement = document.getElementById('main');

const winElement = document.getElementById('win');
const loseElement = document.getElementById('lose');
const retryElement = document.getElementById('retry');

const enterAKeyElement = document.getElementById('enter-key');
const wordElement = document.getElementById('word');

var words = [];
var loadFinished = false;

var currentStage = 0;
const LOSE = 1;
const WIN = 2;
var rows = [];
var currentRow;
var choosenWord;
var wordLength;

var inputs = [];

const maxTries = 5;

main();
document.addEventListener('keydown', handleKeyPress);
retryElement.addEventListener('click', retryLevel);

async function main()
{
    await loadWords();
    startGame();
}

async function loadWords()
{
    try
    {
        const response = await fetch('./data.json');
        const data = await response.json();

        words = data.words;
        console.log(`Words loaded with size : ${words.length}`);

        loadFinished = true;
    }
    catch(error)
    {
        console.error(`Error loading words : ${error}`);
    }
}

function startGame()
{
    currentRow = 0;
    currentStage = 0;

    clear();
    clearInput();

    const randomIndex = Math.floor(Math.random() * (words.length - 1));

    choosenWord = words[randomIndex];
    wordLength = choosenWord.length;

    console.log(`Choosed ${choosenWord} with length of ${wordLength}`);

    if(!winElement.classList.contains('inactive'))
    {
        winElement.classList.add('inactive');
    }
    if(!loseElement.classList.contains('inactive'))
    {
        loseElement.classList.add('inactive');
    }
    if(!retryElement.classList.contains('inactive'))
    {
        retryElement.classList.add('inactive');
    }
    if(!wordElement.classList.contains('inactive'))
    {
        wordElement.classList.add('inactive');
    }

    for(var i = 0; i < maxTries; i++)
    {
        const parent = document.createElement('div');
        parent.classList.add('word-input-row');

        var items = [];
        for(var j = 0; j < wordLength; j++)
        {
            var item = document.createElement('div');
            parent.appendChild(item);

            items.push(item);
        }

        var row =
        {
            parent:parent,
            items:items
        };

        rows.push(row);

        mainElement.appendChild(parent);
    }
}
function clear()
{
    var len = rows.length;
    for(var i = 0; i < len; i++)
    {
        var row = rows[i];
        if(row && row.parent && row.items)
        {
            for(var j = 0; j < row.items.length; j++)
            {
                row.items[j].remove();
            }
            row.parent.remove();
        }
    }

    rows = [];
}
function clearInput()
{
    for(var i = 0; i < maxTries; i++)
    {
        inputs[i] = '';
    }
}
function updateItems()
{
    for(var i = 0; i < maxTries; i++)
    {
        var current = inputs[i];
        var len = current.length;
        var data = rows[i];

        for(var j = 0; j < data.items.length; j++)
        {
            var item = data.items[j];
            var content = item.textContent;
            var currentChar = '';
            if(j < len)
            {
                currentChar = current[j];
            }
            if(content != currentChar)
            {
                item.textContent = currentChar;
            }
        }
    }
}
function submitWord()
{
    if(currentStage != 0)
    {
        return;
    }

    var current = inputs[currentRow];
    var len = current.length;
    if(len != wordLength)
    {
        return;
    }

    var row = rows[currentRow];
    var items = row.items;
    for(var i = 0; i < wordLength; i++)
    {
        var currentChar = items[i].textContent;
        if(currentChar == choosenWord[i])
        {
            items[i].classList.add('correct');
        }
        else
        {
            var found = false;
            for(var j = 0; j < wordLength; j++)
            {
                if(currentChar == choosenWord[j])
                {
                    found = true;
                }
            }

            if(found)
            {
                items[i].classList.add('maybe');
            }
            else
            {
                items[i].classList.add('wrong');
            }
        }
    }

    if(current == choosenWord)
    {
        currentStage = WIN;

        winElement.classList.remove('inactive');
        retryElement.classList.remove('inactive');

        wordElement.textContent = `The correct word is ${choosenWord}`;
        wordElement.classList.remove('inactive');
        return;
    }

    currentRow++;

    if(currentRow >= maxTries)
    {
        currentStage = LOSE;

        loseElement.classList.remove('inactive');
        retryElement.classList.remove('inactive');

        wordElement.textContent = `The correct word is ${choosenWord}`;
        wordElement.classList.remove('inactive');
    }
}

function enterKeyFirst()
{
    if(!enterAKeyElement.classList.contains('inactive'))
    {
        enterAKeyElement.classList.add('inactive');
    }
}

function handleKeyPress(event)
{
    if(currentStage != 0)
    {
        return;
    }

    const key = event.key;
    if(key.length === 1 && key.match(/[a-z]/i))
    {
        var current = inputs[currentRow];

        var len = current.length;
        if(len >= wordLength)
        {
            return;
        }

        current += key;

        inputs[currentRow] = current;

        updateItems();

        enterKeyFirst();
    }
    else if(key === 'Backspace')
    {
        var current = inputs[currentRow];

        var len = current.length;
        len--;
        if(len < 0)
        {
            len = 0;
        }
        current = current.substring(0, len);
        inputs[currentRow] = current;

        updateItems();
    }
    else if(key === 'Enter')
    {
        submitWord();
    }
}

function retryLevel()
{
    startGame();
}