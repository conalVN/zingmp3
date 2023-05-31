import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import _ from "lodash";

import bgChart from "../../source/bg-chart.jpeg";
import { apiGetChart } from "../../apis";
import { RankSong, TabRank, LoadingPage, RankItem } from "../../components";

function ZingChart() {
  const { rankItem } = useSelector((state) => state.app);
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [num, setNum] = useState(10);
  const chartRef = useRef();
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255, 255, 255, .2)", drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [1, 4] },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[
                Object.keys(chartData?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item?.hour % 2 === 0)
                ?.map((item) => item?.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            });
          }
          const rs = counters?.find((i) => {
            let x = +tooltip.body[0]?.lines[0]?.replace(",", "");
            return i.data.some((n) => n === x);
          });
          setSelected(rs.encodeId);
          const newTooltip = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltip)) setTooltipState(newTooltip);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    (async () => {
      const res = await apiGetChart();
      if (res.data.err === 0) {
        setChartData(res?.data?.data);
      }
    })();
  }, []);
  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((i) => +i.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => +item?.hour % 2 === 0)
            ?.map((item) => item?.counter),
          borderColor: i === 0 ? "blue" : i === 1 ? "yellow" : "red",
          tension: 0.2,
          borderWidth: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: "white",
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);

  return (
    <>
      {!chartData ? (
        <LoadingPage />
      ) : (
        <div className="w-full h-full">
          <div className="relative mt-[-70px]">
            <img
              src={bgChart}
              alt="bg"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-alpha-banner"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full py-20 px-[60px]">
              {data && <Line ref={chartRef} options={options} data={data} />}
              <div
                className="tooltip"
                style={{
                  top: tooltipState.top,
                  left: tooltipState.left,
                  opacity: tooltipState.opacity,
                  position: "absolute",
                }}
              >
                <RankItem
                  data={rankItem?.find((i) => i.encodeId === selected)}
                  c
                />
              </div>
            </div>
          </div>
          <div className="px-[59px] mt-4">
            <RankSong data={chartData?.RTChart?.items} number={num} isAlbum />
            {num !== 100 && (
              <div className="flex justify-center text-[14px] font-semibold my-5">
                <button
                  className="py-2 px-[25px] text-white border rounded-full"
                  onClick={() => setNum(100)}
                >
                  Xem top 100
                </button>
              </div>
            )}
          </div>
          <div className="relative pb-[90px]">
            <img className="w-full object-cover z-0 " src={bgChart} alt="bg" />
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-alpha-banner"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 px-[59px]">
              <h1 className="text-4xl text-white font-bold my-5">
                Bảng Xếp Hạng Tuần
              </h1>
              <div className="flex justify-between">
                {chartData?.weekChart &&
                  Object.values(chartData?.weekChart)?.map((tab) => (
                    <TabRank data={tab} key={tab?.country} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ZingChart);
