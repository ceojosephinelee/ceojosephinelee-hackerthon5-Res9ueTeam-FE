import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function MoneyDashboard() {
  // ✅ 리네이밍
  const [filtered, setFiltered] = useState([]);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return `${percent}%`;
        },
        font: {
          weight: 'bold',
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value}원 (${percent}%)`;
          }
        }
      }
    }
  };
  
  const aggregateByCategoryGroup = (moneyrecord) => {
    const grouped = {
      식비: 0,
      쇼핑: 0,
      교통비: 0,
      기타: 0,
      저축: 0
    };
  
    moneyrecord.forEach((e) => {
      if (e.category_name === '월급' || e.category_name === '보너스') {
        grouped['저축'] += Number(e.amount);
      } else if (grouped.hasOwnProperty(e.category_name)) {
        grouped[e.category_name] += Number(e.amount);
      }
    });
  
    return grouped;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moneyrecord") || "[]");

    setFiltered(stored);
  }, []);

  const groupedData = aggregateByCategoryGroup(filtered);
  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: '카테고리별 지출',
        data: Object.values(groupedData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66D99F', '#BA8CF1'],
        borderWidth: 1,
      },
    ],
  };



 



  return (
    <div>
      <h2>📊 대시보드</h2>

      

      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p>📭 데이터가 없습니다. 필터를 확인해보세요.</p>
        )}
      </div>
    </div>
  );
}

export default MoneyDashboard;
