import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Statistics = ({ labels, pedidos, dinero, dependencie }) => {
  useEffect(() => {
    const chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [...labels],
        datasets: [
          {
            label: '# de pedidos',
            data: [...pedidos],
            borderWidth: 2,
          },
          {
            label: '$ en total',
            data: [...dinero],
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
