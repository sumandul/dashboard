import React, { useState, useEffect } from "react";
const Chart = ({ children, height, width }) => (
  <>
    <svg
      viewBox={`-30 0 ${width} ${height}`}
      height="50%"
      width="100%"
      preserveAspectRatio="xMaxYMid meet"
    >
      {children}
    </svg>
  </>
);

const Bar = ({
  fill = "#000",
  x,
  y,
  y1,
  height,
  width,
  height1,
  shouldAnimate,
  colors,
  name,
  watchedrevenues,
  minmaxdata,
  barHeight,
  i,
}) => {
  let scale = barHeight - 7;
  return (
    <>
      <text
        x={0}
        y={scale - minmaxdata[i]}
        className=" font-medium  "
        fontSize="5"
        textAnchor="end"
        fill={colors.black}
      >
        {i === 0 ? minmaxdata[i] : minmaxdata[i] + `k`}
      </text>
      <rect x="0" y="0" height={height - 7} width="0.4" fill="#f5f5f5" />
      <rect
        className={`transition-all duration-700 ${
          shouldAnimate && "  transition-all duration-700"
        } `}
        fill={fill}
        x={x}
        y={y}
        height={height - 7}
        width={width}
      />
      <rect
        fill={colors.secondary}
        x={x + width}
        y={y1}
        height={height1 - 7}
        width={width}
      />
      <rect x="0" y={104} height="0.2" width={200} fill="#f5f5f5" />
      <text
        x={x}
        y={108}
        fontSize="4"
        className=" font-semibold capitalize"
        textAnchor="start"
        fill={colors.black}
      >
        {name}
      </text>
    </>
  );
};

const greatestValue = (values) =>
  values.reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
const BarChart = ({ data, shouldAnimate, colors }) => {
  const barWidth = 10;
  const barMargin = 15;
  const width = data.length * (barWidth + barMargin);
  const height = greatestValue(data.map((datum) => datum.income));
  var minmaxdata = [];
  for (var i = 0; i < 200; i += 20) {
    minmaxdata.push(i);
  }
  return (
    <Chart height={height} width={width}>
      {data.map((datum, index) => (
        <>
          <Bar
            name={datum.name}
            key={datum.name}
            i={index}
            watchedrevenues={datum.income}
            fill={colors.primary}
            x={index * (barWidth + barMargin)}
            y={height - datum.income}
            width={barWidth}
            colors={colors}
            minmaxdata={minmaxdata}
            height={datum.income}
            height1={datum.revenue}
            barHeight={height}
            y1={height - datum.revenue}
            shouldAnimate={shouldAnimate}
          />
        </>
      ))}
    </Chart>
  );
};

const Bargraph = ({ data, colors }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    setShouldAnimate(true);
  }, []);
  return (
    <div className=" w-full">
      <BarChart data={data} shouldAnimate={shouldAnimate} colors={colors} />
    </div>
  );
};
export default Bargraph;
