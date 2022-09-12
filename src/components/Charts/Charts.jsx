import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
} from 'victory';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { isMobile } from '../../utils/mediaQuery';
import { formatSum } from '../../utils';

const CHARTS_STYLE = {
  // data: {
  //   fill: '#FF751D',
  // },
  data: {
    width: 15,
    fill: '#FF751D',
  },
};

const Charts = ({ data }) => {
  const { t } = useTranslation();
  const mobile = isMobile(useMediaQuery);
  const [axisY, axisX] = Object.keys(...data);
  const height = mobile ? 400 : 700;
  const width = mobile ? 300 : 600;

  const handleTickFormat = x => {
    return `${formatSum(x)} ${t('hrn')}`;
  };

  return (
    // <>
    //   <VictoryAxis horizontal={mobile} />
    //   {mobile ? (
    //     <VictoryAxis />
    //   ) : (
    //     <VictoryAxis dependentAxis tickFormat={handleTickFormat} />
    //   )}

    //   <VictoryBar data={data} x={axisX} y={axisY} style={CHARTS_STYLE} />
    // </>

    <VictoryChart
      domainPadding={40}
      // padding={{ left: 90, top: 50, right: 10, bottom: 50 }}
      height={height}
      width={width}
      theme={VictoryTheme.material}
    >
      <VictoryAxis horizontal={mobile} />
      {mobile ? (
        <VictoryAxis style={{ tickLabels: { angle: -60 } }} />
      ) : (
        <VictoryAxis dependentAxis tickFormat={handleTickFormat} />
      )}

      <VictoryBar
        data={data}
        x={axisX}
        y={axisY}
        style={CHARTS_STYLE}
        cornerRadius={{ topLeft: 5, topRight: 5 }}
        labelComponent={
          <VictoryLabel
            dy={-13}
            dx={1}
            style={[
              {
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: 10,
                lineHeight: 12,
                fill: '#52555F',
              },
            ]}
          />
        }
      />
    </VictoryChart>
  );
};

export default Charts;
