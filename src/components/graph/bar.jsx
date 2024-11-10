import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Bar = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
            datasets: [
              {
                label: "Sales Performance",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: "rgb(195,167,255)",
                borderColor: "rgb(195,167,255)",
                borderWidth: 1,
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
                text: "Sales Performance",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} className="w-full md:w-1/2"></canvas>;
};

export default Bar;
