import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import _ from "lodash";

import bgChart from "../source/bg-chart.jpeg";
import path from "../ultis/path";
import { RankItem } from "../components";
import icons from "../ultis/icons";
const { BsPlayFill } = icons;

function Analysis() {
  const { rankItem, chart } = useSelector((state) => state.app);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
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
        min: chart?.minScore,
        max: chart?.maxScore,
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
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item?.hour % 2 === 0)
                ?.map((item) => item?.counter),
              encodeId: Object.keys(chart?.items)[i],
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
    const labels = chart?.times
      ?.filter((item) => +item?.hour % 2 === 0)
      ?.map((item) => `${item?.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
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
  }, [chart]);

  return (
    <div className="relative rounded-md overflow-hidden mt-10 w-full max-h-[450px]">
      <img src={bgChart} alt="bg-chart" className="w-full object-cover" />
      <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#2d1a4c] to-[#740091] opacity-[.95]"></div>
      <div className="absolute z-20 top-0 left-0 right-0 bottom-0 flex p-3">
        <div className="flex-4">
          <Link
            to={path.ZING_CHART}
            className="flex items-center gap-2 text-white mb-4"
          >
            <h3 className="text-2xl font-bold hover:text-[#c273ed]">
              #zingchart
            </h3>
            <span className="p-1 bg-white rounded-full">
              <BsPlayFill size={20} color="#740091" />
            </span>
          </Link>
          <div className="flex flex-col gap-2">
            {rankItem
              ?.filter((x, index) => index < 3)
              .map((item, i) => {
                return <RankItem data={item} i={i + 1} key={i} />;
              })}
          </div>
          <Link
            to={path.ZING_CHART}
            className="block w-max mx-auto mt-4 text-sm text-white border px-[25px] py-[5px] rounded-full"
          >
            Xem thêm
          </Link>
        </div>
        <div className="flex-6 w-full h-full relative">
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
            <RankItem data={rankItem?.find((i) => i.encodeId === selected)} c />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Analysis);
