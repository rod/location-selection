console.log('#100DaysOfCode: Day 2');

var ctx = document.body.querySelector('#wave');
var ctx2 = document.body.querySelector('#donut');

var ascii = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var name = 'Muhammad'.replace(/\W+/g, '').toUpperCase();
var nameArr = name.split('');
var namePts = [];

var vowels = [];
var consos = [];

nameArr.forEach(function(ltr, i, nums) {
  namePts.push(ascii.indexOf(ltr) + 1);

  if (ltr === 'A' || ltr === 'E' || ltr === 'I' || ltr === 'O' || ltr === 'U') {
    vowels.push(ltr);
  } else {
    consos.push(ltr);
  }
});

console.log(vowels, consos);

var myPieChart = new Chart(ctx2,{
    type: 'doughnut',
    labels: ['Vowels', 'Consonants'],
    data: {
      datasets: [{
        data: [3, 5],
      }],
    },
});


var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: nameArr,
    datasets: [
      {
        data: namePts,
      },
    ]
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{ display: false }],
    },
    maintainAspectRatio: false,
  },
});
