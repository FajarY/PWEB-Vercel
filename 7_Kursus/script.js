const offerButton = document.getElementById('button-offers');
const algoButton = document.getElementById('button-algo');
const webButton = document.getElementById('button-web');
const gameButton = document.getElementById('button-game');

const offerCourse = document.getElementById('course-main');
const algoCourse = document.getElementById('course-algorithms');
const webCourse = document.getElementById('course-web');
const gameCourse = document.getElementById('course-gamedevelopment');

const buttonArr = [offerButton, algoButton, webButton, gameButton];
const courseArr = [offerCourse, algoCourse, webCourse, gameCourse];

var activeIndex = 0;
const TYPE_COUNT = 4;

setActive(0);

offerButton.addEventListener('click', () => { setActive(0); });
algoButton.addEventListener('click', () => { setActive(1); });
webButton.addEventListener('click', () => { setActive(2); });
gameButton.addEventListener('click', () => { setActive(3); });

function setActive(index)
{
    activeIndex = index;

    for(var i = 0; i < TYPE_COUNT; i++)
    {
        const button = buttonArr[i];
        const courseView = courseArr[i];

        if(button.classList.contains('button-aside-choosed'))
        {
            button.classList.remove('button-aside-choosed');
        }
        if(!courseView.classList.contains('inactive'))
        {
            courseView.classList.add('inactive');
        }

        if(i == index)
        {
            button.classList.add('button-aside-choosed');
            courseView.classList.remove('inactive');
        }
    }
}