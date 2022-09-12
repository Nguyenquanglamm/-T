import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colorArray = ["#277BC0","#7FB77E"]

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Giá theo thời gian',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = (data)=> ({
  labels: new Array(4).fill(""),
  datasets: [
    ...data.map((item,index)=> {
        return {
            label:item.dungLuong,
            data:[...item.price],
            borderColor: colorArray[index],
            backgroundColor: colorArray[index],
        }
    })
  ],
}) ;
const ChartPriceByTime = ({options,data}) => {
    return (
        <Bar options={options} data={data} />
    );
};

export default ChartPriceByTime;