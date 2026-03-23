import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CurveType } from 'recharts/types/shape/Curve';
import { useWindowSize } from 'usehooks-ts';

import type { UserWeightData } from '@/api/types';
import WaveIcon from '@/assets/icons/WaveIcon';
import text from '@/locales/translation.json';
import { type WeightData } from '@/screens/Progress/TabsContent/ProgressTab';
import theme from '@/styles/theme/theme';

import Box from '../Box/Box';
import { Row } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';
interface TooltipProps {
  active?: boolean;
  label?: string;
  payload?: {
    chartType: undefined;
    color: string;
    dataKey: string;
    fill: string;
    hide: boolean;
    name: string;
    payload: WeightData;
    stroke: string;
    strokeWidth: number;
    value: string;
  }[];
}

interface ChartProps {
  legendText: string;
  data: WeightData[] | UserWeightData[] | Record<string, string | number>[];
  yAxisValues: number[];
  yAxisUnit: string;
  dataKey: string;
  monthName: string;
  variant: 'current' | 'yearly' | 'analytics';
  lineColor?: string;
  lineWidth?: number;
  lineType?: CurveType;
  hasDot?: boolean;
}

export function CustomLineChart({
  legendText,
  data,
  yAxisValues,
  yAxisUnit,
  dataKey,
  monthName,
  variant,
  lineColor,
  lineWidth,
  lineType = 'natural',
  hasDot = true,
}: ChartProps) {
  const { units } = text;
  const [kilos] = units;

  const screenSize = useWindowSize();

  const getXTickInterval = () => {
    const interval = screenSize.width < 1400 && data.length > 20 ? 1 : 0;
    return interval;
  };

  /*
  TODO scale for analytics
  var1: remove ticks={yAxisValues}
  var2: var1 + change 'sqrt' to 'linear' +  interval="preserveStartEnd"
  */

  const getScale = () => {
    return Number(yAxisValues[yAxisValues.length - 1]) -
      Number(yAxisValues[yAxisValues.length - 2]) >
      50
      ? 'sqrt'
      : 'auto';
  };

  const renderLegend = () => {
    return (
      <Row
        $justifyContent="center"
        width="100%"
        gap={theme.gapSizes.gap8}
        padding={`${theme.gapSizes.gap16} 0 0`}
      >
        <WaveIcon />
        <Typography fontSize={theme.fontSizes.fontSize14}>
          {variant === 'current' ? `${legendText} - ${monthName}` : `${legendText}`}
        </Typography>
      </Row>
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (!active && !payload) {
      return null;
    }

    if (active && Array.isArray(payload)) {
      return (
        <Box padding={theme.gapSizes.gap4}>
          {payload.map(item => (
            <Box key={item.dataKey}>
              {item.payload.colors && (
                <Box
                  flexdirection="column"
                  background={item.payload.colors.background}
                  $borderRadius={theme.borderRadius.radius12}
                >
                  <Box
                    flexdirection="column"
                    gap={theme.gapSizes.gap4}
                    width="100%"
                    padding={`${theme.gapSizes.gap4} ${theme.gapSizes.gap8}`}
                  >
                    <Typography
                      fontSize={theme.fontSizes.fontSize12}
                      color={item.payload.colors.text}
                    >
                      {variant === 'current' ? item.payload.dateString : item.payload.month}
                    </Typography>
                    <Typography
                      fontSize={theme.fontSizes.fontSize12}
                      color={item.payload.colors.text}
                    >
                      {item.payload.weight}
                      {kilos}
                    </Typography>
                    {item.payload.difference && (
                      <Typography
                        fontSize={theme.fontSizes.fontSize12}
                        color={item.payload.colors.text}
                      >
                        {item.payload.difference} {kilos}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    }
  };

  const left = variant === 'analytics' ? -15 : -10;

  return (
    <ResponsiveContainer width="100%" height={variant === 'analytics' ? 350 : 300} minWidth={310}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 22,
          left: left,
          bottom: 5,
        }}
      >
        <CartesianGrid
          syncWithTicks
          vertical={variant === 'analytics'}
          stroke={theme.colors.lightGray}
        />
        <XAxis
          allowDataOverflow
          dataKey={variant === 'yearly' ? 'month' : 'day'}
          tickLine={false}
          axisLine={false}
          interval={getXTickInterval()}
          dy={5}
          tick={{ fontSize: `${theme.fontSizes.fontSize12}`, letterSpacing: '-1px' }}
        />
        <YAxis
          type="number"
          width={55}
          domain={[yAxisValues[0] as number, yAxisValues[yAxisValues.length - 1] as number]}
          tickCount={yAxisValues.length}
          ticks={yAxisValues}
          tick={{ fontSize: `${theme.fontSizes.fontSize12}` }}
          unit={yAxisUnit}
          tickLine={false}
          axisLine={false}
          interval={0}
          scale={getScale()}
        />
        {variant !== 'analytics' && (
          <>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </>
        )}
        <Line
          type={lineType}
          name={legendText}
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={lineWidth}
          dot={hasDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
