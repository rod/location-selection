let noise = "A leaky celsius is a great-grandmother of the mind. A knife is an eight from the right perspective. One cannot separate toothpastes from lusty swisses. However, some inboard whorls are thought of simply as bacons. A double is a profit's soccer. What we don't know for sure is whether or not those states are nothing more than romanias. The rains could be said to resemble flaxen planes. Turnips are gardant batteries. A musing indonesia's soil comes with it the thought that the oaten offer is a ferryboat. We know that we can assume that any instance of a canvas can be construed as a rodlike sign. We can assume that any instance of a disgust can be construed as a windburned sandwich. Crowded fields show us how hoses can be vaults. A sandra is a college's deer. In ancient times the windswept kamikaze comes from a scarcest whale. In ancient times the dragonfly of a condor becomes an unstressed booklet. Some posit the pointless alibi to be less than rheumy.";

let body = noise.toUpperCase().split(' ');

function encrypt(msg) {
  let msgArr = msg.toUpperCase().split(' ');
  let positions = []; // random positions

  msgArr.forEach(function(val, i, msgArr) {
    msgArr[i] = `<span>${val}</span>`;
    const randomNum = getRandomIntInclusive(0, body.length);
    positions.push(randomNum);
  });

  positions.sort((a,b) => {
    return a - b;
  });

  positions.forEach((val, i, pos) => {
    body[val] = msgArr[i];
  });

  body = body.join(' ');

  console.log(body);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const form = document.querySelector('form');
let codedMessage = document.querySelector('#codedMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let message = document.querySelector('#message').value;
  encrypt(message);

  codedMessage.innerHTML = body;
})

const toggle = document.querySelector('#toggle');

toggle.addEventListener('click', () => {
  codedMessage.classList.toggle('hidden');
})

//# sourceMappingURL=main.js.map
