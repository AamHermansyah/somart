'use client'

import ReactApexcharts from "@/components/react-apex-charts";
import { ApexOptions } from "apexcharts";
import React from "react";
import { LoaderCircle } from "lucide-react";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE", "#FF5733"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [2, 2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE", "#FF5733"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
  },
  responsive: [
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 500,
      options: {
        xaxis: {
          labels: {
            show: false,
          },
        },
      }
    }
  ],
};

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

type PropTypes = {
  isLoading: boolean;
  categories: string[];
} & ChartState;

function Chart({ series, isLoading, categories }: PropTypes) {
  const dynamicOptions: ApexOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: categories,
    },
  }

  return (
    <div id="chartOne" className="relative -ml-5">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-background/50 backdrop-blur z-[1]">
          <LoaderCircle className="w-4 h-4 animate-spin" />
        </div>
      )}
      <ReactApexcharts
        options={dynamicOptions}
        series={series}
        type="area"
        height={450}
        width={"100%"}
      />
    </div>
  );
};

export default Chart;
