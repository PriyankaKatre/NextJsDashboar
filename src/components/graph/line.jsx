import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Line = () => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
            datasets: [
              {
                label: "Active Users",
                data: [12, 19, 3, 5, 2, 3, 7],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "User Activity",
              },
            },
            scales: {
              y: {
                min: 2,
                max: 20,
                ticks: {
                  stepSize: 2,
                },
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} className="w-full md:w-1/2"></canvas>;
};

export default Line;
