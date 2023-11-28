'use client';
import { JobSalaryEntryType } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
defaults.font.family = "'Manrope', 'Arial', sans-serif";
defaults.color = '#92929D';

export function DarkSalariesChart({
  estimatedSalaries,
}: {
  estimatedSalaries: JobSalaryEntryType[];
}) {
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#21212B',
        },
        ticks: {
          callback: function (value: number) {
            return (
              new Intl.NumberFormat().format(value) +
              ' ' +
              estimatedSalaries[0].salary_currency
            );
          },
        },

        grace: '10%',
      },
    },
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        callbacks: {
          label: ({
            label,
            formattedValue,
          }: {
            label: any;
            formattedValue: any;
          }) =>
            ` ${label}: ${formattedValue} ${estimatedSalaries[0].salary_currency}/${estimatedSalaries[0].salary_period}`,
        },
      },
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true,
          pointStyleWidth: 10,
          boxHeight: 7,
          pointStyle: 'circle',
          font: function (context: any) {
            const width = context.chart.width;
            const size = Math.min(Math.round(width / 32), 13);
            return {
              size,
              weight: 500,
            };
          },
        },
        position: 'top' as const,
        align: 'start' as const,
      },
    },
  };

  const labels = estimatedSalaries.map((salary) => salary.publisher_name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Minimum Salary',
        data: estimatedSalaries.map((salary) => salary.min_salary),
        backgroundColor: ['#FDDD8C'],
        borderColor: ['rgba(253,221,140,0)'],
        borderWidth: 3,
        borderRadius: 100,
        barThickness: 15,
      },
      {
        label: 'Maximum Salary',
        data: estimatedSalaries.map((salary) => salary.max_salary),
        backgroundColor: ['rgba(11, 171, 124, 0.70)'],
        borderColor: ['rgba(11, 171, 12,0)'],
        borderWidth: 3,
        borderRadius: 100,
        barThickness: 15,
      },
      {
        label: 'Median Salary',
        data: estimatedSalaries.map((salary) => salary.median_salary),
        backgroundColor: ['#FFBBD7'],
        borderColor: ['rgba(255,187,215,0)'],
        borderWidth: 3,
        borderRadius: 100,
        barThickness: 15,
      },
    ],
  };
  return (
    <Bar
      className='h-[250px]'
      // @ts-ignore
      options={options}
      data={data}
      plugins={[
        {
          id: 'increase-legend-spacing',
          beforeInit(chart) {
            // Get reference to the original fit function
            const originalFit = (chart.legend as any).fit;
            // Override the fit function
            (chart.legend as any).fit = function fit() {
              // Call original function and bind scope in order to use `this` correctly inside it
              originalFit.bind(chart.legend)();
              this.height += 20;
            };
          },
        },
      ]}
    />
  );
}
