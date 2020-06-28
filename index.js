const textElement = document.getElementById('text');
const optionElement = document.getElementById('options');

let state = {};

function startGame() {
    state  = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode  = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionElement.firstChild) { 
        optionElement.removeChild(optionElement.firstChild)
}

textNode.options.forEach(option => {
    if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionElement.appendChild(button)
    }
});
}

function showOption(option) {
    return option.requiredState == null  || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    // if (nextTextNode <= 0 ){
    //     return startGame()
    // }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: `After a long day camping with your best friends Alex and Kyle, you build a campfire and sit around talking. The sun has set, and you bask in the warmth and glow of the fire. You're starting to feel hungry.
        
        "Let's make s'mores," Kyle says.
        "Let's roast hot dogs,"  Alex says.`,
        options: [
            {
                text: `Make s'mores.`,
                setState: {sticky: true},
                nextText: 2
            },
            {
                text: `Make hot dogs.`,
                setState: {isFull: true},
                nextText: 3
            },
            {
                text:  `Let's tell scary stories first, that always makes me very hungry.`,
                setState: {isHungry: true},
                nextText: 4
            }
        ]    
    },
    {
        id: 2,
        text: `You look near-by and find a sharp stick for roasting marshmallows. You eat s'mores. You get sticky. You keep the stick by you, it's a nice stick.`,
        options: [
            {
                text: `Let's tell scary stories now!`,
                setState: {hasStick: true},
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: `"Alright, hot dogs!" Alex says. You find a sharp stick for cooking hot dogs. You eat hot dogs. You are no longer hungry. You keep the stick by you, it's a nice stick.`,
        options: [
            {
                text: `Let's tell scary stories now!`,
                setState: {hasStick: true},
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: `Right, let's tell a scary story!
        "I know a scary story," Kyle says.
        "I know a really scary story," Alex says.
        You have a scary story to share too.
        Who should go first?`,
        options: [
            {
                text: `Let Alex go first.`,
                setState: {isScared:true, alexFirst:true},
                nextText: 5
            },
            {
                text: `Let Kyle go first.`,
                nextText: 6
            },
            {
                text: `I'll go first.`,
                nextText: 8

            }
        ]
    },
    {
        id:  5,
        text: `Alex tells a scary story about the deep dark woods. You can't help but notice you're already in the deep dark woods. It makes you very scared.`,
        options: [
            {
                text: `Ask Kyle to tell a less scary story.`,
                requiredState: (currentState) => currentState.alexFirst,
                setState: {alexFirst: false},
                nextText: 6
            },
            {
                text: `Ask Alex to tell another scary story.`,
                requiredState: (currentState) => currentState.isScared,
                setState: {isScared: false, isVeryScared:true},
                nextText:  7
            },
            {
                text: `Tell a story of your own.`,
                nextText:  8
            }
        ]
    },
    {
        id: 6,
        text: `Kyle tells a story, but it's really the plot of a bad scary movie. The movie might have been scary, but Kyle's re-telling is not.`,
        options: [
            {
                text: `Ask Alex to tell a scary story.`,
                nextText: 5
            },
            {
                text: `Tell a story of your own.`,
                nextText: 8
            }
        ]
    },
    {
        id: 7,
        text: `Alex tells another scary story. This one even scarier than the first. You are very scared`,
        options: [
            {
                text: `Tell a story of your own.`,
                nextText: 8
            },
            {
                text:  `You're too scared to tell a story. Maybe we should do something else.`,
                nextText: 9
            }
        ]
    }
]

startGame();

/* option for restarting the game at game end

id:  ,
text:  ,
options: [
    {
        text: 'Restart',
        nextText: -1
    }
]


if you have a requiredstate:

(this is inside options array)
text: 'text here',
requiredState: (currentState) => currentState.nameofstateuwant,
setState: { nameofstateuwant: false, newState: true},
nextText: number */