import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';

const data2 = [
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

  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis
        horizontal={Mobile}
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis

        tickValues={[1, 2, 3, 4, 5, 6, 7]}
        tickFormat={[
          'Quarter 1',
          'Quarter 2',
          'Quarter 3',
          'Quarter 4',
          'Quarter 5',
          'Quarter 6',
          'Quarter 7',
        ]}
      />
      <VictoryAxis
        // horizontal
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x => `$${x / 1000}k`}
      />
      <VictoryBar
        data={data2}
        x="quarter"
        y="earnings"
        style={{ data: { fill: 'tomato' } }}
      />
    </VictoryChart>
  );
};

export default Charts;
