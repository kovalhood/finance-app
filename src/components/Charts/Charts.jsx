import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';

const data2 = [
  { sum: 1154, category: 'FIFA' },
  { sum: 2321, category: 'Gym' },
  { sum: 3443, category: 'Ball' },
  { sum: 4421, category: 'Football' },
  { sum: 125, category: 'Soccer' },
];

const data3 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
  { quarter: 5, earnings: 19000 },
  { quarter: 6, earnings: 19000 },
  { quarter: 7, earnings: 19000 },
];

const Charts = ({ data }) => {
  const Mobile = isMobile(useMediaQuery);
  const axisX = Object.keys(...data)[1];
  const axisY = Object.keys(...data)[0];
  console.log(axisX, 'axisX');
  console.log(axisY, 'axisY');

  // console.log(data, 'data============data');

  // const values = data.map(item => item.sum);
  // const format = data.map(item => item.category);

  // console.log(values, 'values===values');

  return (
    <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
      <VictoryAxis
        horizontal={Mobile}
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis

        // tickValues={[1, 2, 3, 4, 5]}
        // tickFormat={[
        //   'Quarter 1',
        //   'Quarter 2',
        //   'Quarter 3',
        //   'Quarter 4',
        //   'Quarter 5',
        // ]}
      />
      <VictoryAxis
        // horizontal
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        // tickFormat={x => `${x} uah`}
        // tickFormat={x => x + ' uah'}
      />
      <VictoryBar
        data={data}
        x={axisX}
        y={axisY}
        style={{ data: { fill: 'tomato' } }}
      />
    </VictoryChart>
  );
};

export default Charts;
