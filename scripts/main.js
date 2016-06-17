var ctx = document.body.querySelector('#wave');

var wave = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['H', 'H', 'M', 'M', 'S', 'S'],
    datasets: [
      {
        borderColor: '#F5D76E',
        backgroundColor: 'rgba(245, 215, 110, 0.8)',
        borderWidth: 4,
        borderCapStyle: 'round',
        pointRadius: 0,
        lineTension: 0.4,
        data: moment().format('HHmmss').split(''),
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{
        display: false,
        ticks: {
          max: 9,
          min: 0,
        },
      }],
    },
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuint',
    },
  },
});

function refresh() {
  document.body.querySelector('#time').innerHTML = moment().format('HH:mm:ss');

  wave.data.datasets[0].data = moment().format('HHmmss').split('');
  wave.update();
}

setInterval(refresh, 1000);

document.body.querySelector('#toggle').addEventListener('click', function() {
  document.body.querySelectorAll('.target').forEach(function(el) {
    el.classList.toggle("hidden");
  });
});
