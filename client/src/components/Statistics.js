import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bảng thống kê",
    },
  },
};

const handleData = (data, labels) => {
  if (!data) return;
  return labels
    .reduce((acc, curr, index) => {
      return [...acc, { name: curr, value: 0 }];
    }, [])
    ?.map((itemlb, index) => {
      data.map((item) => {
        if (item._id - 1 === index) {
          return (itemlb = { value: item.tongtien });
        }
      });
      return itemlb.value;
    });
};

const labels  = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const labelDays = [...Array(new Date().getDate()).keys()].map(item=> item+1);
// console.log(labelDays)
const Statistics = () => {
  const [dataProfitMonth, setDataProfitMonth] = React.useState();
  const [dataProfitByDay, setDataProfitByDay] = React.useState();
  const newXData = handleData(dataProfitMonth, labels);
  const daysDataProfit = handleData(dataProfitByDay, labelDays);
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data:newXData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
  
      },
    ],
  };
  const dataDay = {
    labels:labelDays,
    datasets: [
      {
        label: "Doanh thu theo ngày",
        data:daysDataProfit,
        backgroundColor: "rgba(155, 199,232, 0.5)",
  
      },
    ],
  };
  useEffect(() =>{
    axios.get("/api/order/getProfitNowMonth").then((res) =>{
      setDataProfitMonth(res.data);
    });
    axios.get("/api/order/getProfitNowDay").then((res) => {
      setDataProfitByDay(res.data);
    });
  },[])
  return(<>
 <Bar  options={options} data={dataDay}/>;
 <Bar options={options} data={data} />;
 </>
  )
};

export default Statistics;
