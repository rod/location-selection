const form = document.body.querySelector('form');
const codedMessage = document.body.querySelector('#codedMessage');
const toggle = document.body.querySelector('#toggle');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const noise = document.body.querySelector('textarea').value;
  const message = document.body.querySelector('#message').value;

  codedMessage.innerHTML = encodeMessage(message, noise);
});

toggle.addEventListener('click', () => {
  codedMessage.classList.toggle('hideNoise');
});

function encodeMessage(message, noise) {
  // Lower case the strings and split into arrays
  const noiseArray = noise.toLowerCase().split(' ');
  const messageArray = message.toLowerCase().split(' ');

  // Wrap each secret word in <span> tags
  messageArray.forEach((val, i, messageArray) => {
    messageArray[i] = `<span>${val}</span>`;
  });

  // Init array to hold random indexes of noise array
  // to replace with words from secret message
  const spotsToSwap = [];
  while(spotsToSwap.length < messageArray.length) {
    const secretSpot = randomNum(noiseArray.length);
    let found = false;

    for(let i = 0; i < spotsToSwap.length; i++) {
      if(spotsToSwap[i] === secretSpot) {
        found = true;
        break;
      }
    }

    if(!found) {
     spotsToSwap[spotsToSwap.length] = secretSpot;
    }
  }

  // Sort numbers in ascending order so the secret
  // still message reads correctly
  spotsToSwap.sort(sortAscending);

  spotsToSwap.forEach((val, i) => {
    // Replace the words in the secret spots with the
    // words from the secret message
    noiseArray[val] = messageArray[i];
  });

  const codedMessage = noiseArray.join(' ');

  console.log(codedMessage);

  return codedMessage;
}

// Generate random number up to value of max
function randomNum(max) {
  return Math.ceil(Math.random()*max);
}

// Sort numbers in ascending order
function sortAscending(a, b) {
  return a - b;
}
