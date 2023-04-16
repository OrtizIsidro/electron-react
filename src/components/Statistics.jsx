import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Statistics = ({ labels = [], label, dependencie }) => {
  useEffect(() => {
    const chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [...labels],
        datasets: [
          {
            label: '# of Votes',
            data: [...label],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => chart.destroy();
  }, [dependencie]);
  return <canvas id="myChart"></canvas>;
};

export default Statistics;
