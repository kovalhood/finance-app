import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';
import { formatSum } from '../../utils';

const Charts = ({ data }) => {
  const { t } = useTranslation();
  const Mobile = isMobile(useMediaQuery);
  const axisX = Object.keys(...data)[1];
  const axisY = Object.keys(...data)[0];

  return (
    <VictoryChart
      domainPadding={40}
      height={Mobile ? 400 : 700}
      width={Mobile ? 300 : 600}
      theme={VictoryTheme.material}
    >
      <VictoryAxis horizontal={Mobile} />
      {Mobile ? (
        <VictoryAxis />
      ) : (
        <VictoryAxis
          dependentAxis
          tickFormat={x => `${formatSum(x)} ${t('hrn')}`}
        />
      )}

      <VictoryBar
        data={data}
        x={axisX}
        y={axisY}
        style={{ data: { fill: '#FF751D' } }}
      />
    </VictoryChart>
  );
};

export default Charts;
