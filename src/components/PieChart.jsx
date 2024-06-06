import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

const DonutChart = ({
  width = 140,
  height = 140,
  completedColor = '#600080',
  incompleteColor = '#9900cc',
  completedPercentage = 80,
  incompletePercentage = 20,
}) => {
  const radius = Math.min(width, height) / 2 - 10; // Kenarlara boşluk bırakmak için 10 ekledik
  const innerRadius = radius - 16; // İç boşluk
  const strokeWidth = 20; // Daha kalın bir stroke için
  const circumference = 2 * Math.PI * radius;
  const gap = 2; // Aradaki boşluk miktarı
  const completedStrokeDasharray =
    (completedPercentage / 100) * circumference - gap;
  const incompleteStrokeDasharray =
    (incompletePercentage / 100) * circumference - gap;

  return (
    <View>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Dış çember */}
        <Path
          fill="none"
          stroke={completedColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          d={`M ${width / 2},${
            height / 2
          } m -${radius},0 a ${radius},${radius} 0 1,1 ${
            2 * radius
          },0 a ${radius},${radius} 0 1,1 -${2 * radius},0`}
          strokeDasharray={`${completedStrokeDasharray}, ${circumference}`}
        />
        <Path
          fill="none"
          stroke={incompleteColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          d={`M ${width / 2},${
            height / 2
          } m -${radius},0 a ${radius},${radius} 0 1,1 ${
            2 * radius
          },0 a ${radius},${radius} 0 1,1 -${2 * radius},0`}
          strokeDasharray={`${incompleteStrokeDasharray}, ${circumference}`}
          strokeDashoffset={-completedStrokeDasharray - gap}
        />
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={innerRadius}
          fill="white" // İç çemberin rengi
        />
      </Svg>
    </View>
  );
};

export default DonutChart;
