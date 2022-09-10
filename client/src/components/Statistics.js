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
import { CustomProvider, DateRangePicker } from "rsuite";
import vi from "date-fns/locale/vi";
import { startOfDay, endOfDay, addDays, subDays, formatISO } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Calendar = {
  sunday: "CN",
  monday: "T2",
  tuesday: "T3",
  wednesday: "T4",
  thursday: "T5",
  friday: "T6",
  saturday: "T7",
  ok: "OK",
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: "MMM yyyy",
  formattedDayPattern: "dd MMM yyyy",
  dateLocale: vi,
};

// /////////////////////////////////////////////////////////////////
const Ranges = [
  {
    label: "Hôm nay",
    value: [startOfDay(new Date()), endOfDay(new Date())],
  },
  {
    label: "Hôm qua",
    value: [
      startOfDay(addDays(new Date(), -1)),
      endOfDay(addDays(new Date(), -1)),
    ],
  },
  {
    label: "7 ngày trước",
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
  },
  {
    label: "30 ngày trước",
    value: [startOfDay(subDays(new Date(), 30)), endOfDay(new Date())],
  },
];
const locale = {
  Calendar,
  Ranges,
  DatePicker: {
    ...Calendar,
  },
  DateRangePicker: {
    ...Calendar,
  },
};

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

const labels = [
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

const labelDays = [...Array(new Date().getDate()).keys()].map(
  (item) => item + 1
);
// console.log(labelDays)
const Statistics = () => {
  const [dataProfitMonth, setDataProfitMonth] = React.useState();
  const [dataProfitByDay, setDataProfitByDay] = React.useState();
  const [indexChart, setIndexChart] = React.useState(1);
  const [dataRange, setDataRange] = React.useState([]);
  const [valueDate, setvalueDate] = React.useState();

  const newXData = handleData(dataProfitMonth, labels);
  const daysDataProfit = handleData(dataProfitByDay, labelDays);
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: newXData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dataDay = {
    labels: labelDays,
    datasets: [
      {
        label: "Doanh thu theo ngày",
        data: daysDataProfit,
        backgroundColor: "rgba(155, 199,232, 0.5)",
      },
    ],
  };
  useEffect(() => {
    axios.get("/api/order/getProfitNowMonth").then((res) => {
      setDataProfitMonth(res.data);
    });
    axios.get("/api/order/getProfitNowDay").then((res) => {
      setDataProfitByDay(res.data);
    });
  }, []);
  const handleChangeRageDate = async (value) => {
    if (value === null) {
      setIndexChart(1);
      return;
    }
    let startDate = formatISO(value[0]);
    let endDate = formatISO(value[1]);
    setvalueDate(value);
    await axios
      .get(
        `/api/order/getOrderByDateRange/startDate=${startDate}&endDate=${endDate}`
      )
      .then((response) => {
        setDataRange(response.data);
      });
      console.log(startDate,endDate)
    setIndexChart(2);
  };
  const dataCustom = {
    labels: dataRange.map((item) => {
      return item?._id;
    }),
    datasets: [
      {
        label: "Doanh Thu",
        data: dataRange.map((item) => {
          return item?.tongtien;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
    <CustomProvider locale={locale}>
        <DateRangePicker
          ranges={Ranges}
          onChange={handleChangeRageDate}
          placeholder="Chọn Mốc Thời Gian"
          ></DateRangePicker>
      </CustomProvider>
      {indexChart === 2 && (
        <div className=" w-[900px] mt-10 page-container">
          {dataRange && dataRange.length > 0 && (
            <Bar options={options} data={dataCustom} />
          )}
        </div>
      )}
    {
      indexChart ===1 && 
      <Bar options={options} data={data} />
    }
    </>
  );
};

export default Statistics;
