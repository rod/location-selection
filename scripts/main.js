var form = document.body.querySelector('form');
var codedMessage = document.body.querySelector('#codedMessage');
var toggle = document.body.querySelector('#toggle');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var noise = document.body.querySelector('textarea').value;
  var message = document.body.querySelector('#message').value;

  codedMessage.innerHTML = encodeMessage(message, noise);
});

toggle.addEventListener('click', function () {
  codedMessage.classList.toggle('hideNoise');
});

function encodeMessage(message, noise) {
  // Lower case the strings and split into arrays
  var noiseArray = noise.toLowerCase().split(' ');
  var messageArray = message.toLowerCase().split(' ');

  // Wrap each secret word in <span> tags
  messageArray.forEach(function (val, i, messageArray) {
    messageArray[i] = '<span>' + val + '</span>';
  });

  // Init array to hold random indexes of noise array
  // to replace with words from secret message
  var spotsToSwap = [];
  while (spotsToSwap.length < messageArray.length) {
    var secretSpot = randomNum(noiseArray.length);
    var found = false;

    for (var i = 0; i < spotsToSwap.length; i++) {
      if (spotsToSwap[i] === secretSpot) {
        found = true;
        break;
      }
    }

    if (!found) {
      spotsToSwap[spotsToSwap.length] = secretSpot;
    }
  }

  // Sort numbers in ascending order so the secret
  // still message reads correctly
  spotsToSwap.sort(sortAscending);

  spotsToSwap.forEach(function (val, i) {
    // Replace the words in the secret spots with the
    // words from the secret message
    noiseArray[val] = messageArray[i];
  });

  var codedMessage = noiseArray.join(' ');

  console.log(codedMessage);

  return codedMessage;
}

// Generate random number up to value of max
function randomNum(max) {
  return Math.ceil(Math.random() * max);
}

// Sort numbers in ascending order
function sortAscending(a, b) {
  return a - b;
}
