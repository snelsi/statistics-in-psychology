import * as React from "react";
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Alert,
  AlertIcon,
  Heading,
  SimpleGrid,
  StatHelpText,
} from "@chakra-ui/react";
import { Card, StyledStatGroup } from "components";
import { roundTo } from "utils";

const student025Coefficients: number[] = [
  12.706,
  4.303,
  3.182,
  2.776,
  2.571,
  2.447,
  2.365,
  2.306,
  2.262,
  2.228,
  2.201,
  2.179,
  2.16,
  2.145,
  2.131,
  2.12,
  2.11,
  2.101,
  2.093,
  2.086,
  2.08,
  2.074,
  2.069,
  2.064,
  2.06,
  2.056,
  2.052,
  2.048,
  2.045,
  2.042,
];
const student05Coefficients: number[] = [
  6.314,
  2.92,
  2.353,
  2.132,
  2.015,
  1.943,
  1.895,
  1.86,
  1.833,
  1.812,
  1.796,
  1.782,
  1.771,
  1.761,
  1.753,
  1.746,
  1.74,
  1.734,
  1.729,
  1.725,
  1.721,
  1.717,
  1.714,
  1.711,
  1.708,
  1.706,
  1.703,
  1.701,
  1.699,
  1.697,
];

const getCoeff = (a: number, i: number) => {
  if (a === 0.025) return student025Coefficients[i] ?? null;
  if (a === 0.05) return student05Coefficients[i] ?? null;
  return null;
};

export interface IData {
  data: number[];
  ranges: number[];
}

export const useRanges = (data: [IData, IData]) => {
  const ranges = React.useMemo(
    () =>
      data.map(({ data, ranges }) => {
        const xmin = Math.min(...data);
        const xmax = Math.max(...data);

        const sum = data.reduce((acc, v) => acc + v, 0);
        const n = data.length;

        const points = [...new Set(ranges)].sort((a, b) => a - b);

        const r = [];
        let total = 0;
        for (let i = 0; i + 1 < points.length; i++) {
          const left = points[i];
          const right = points[i + 1];
          const dots = data.filter(
            (d) => d >= left && (i === points.length - 2 ? d <= right : d < right),
          );
          const xi = (left + right) / 2;
          const ni = dots.length;

          const xmin = Math.min(...dots);
          const xmax = Math.max(...dots);

          total += ni;
          r.push({
            left,
            right,
            xi,
            ni,
            dots,
            total,
            xmin,
            xmax,
          });
        }

        const avg = r.reduce((acc, { xi, ni }) => acc + xi * ni, 0) / n;
        const avgSum = r.reduce((acc, { xi, ni }) => acc + ni * (xi - avg) ** 2, 0);
        const dispers = avgSum / (data.length - 1);

        return { ranges: r, avg, n, sum, xmin, xmax, dispers };
      }),
    [data],
  );

  return ranges;
};

interface CoordinateProps {
  alpha: number;
  temp: number;
  k: number;
}
const Coordinate: React.FC<CoordinateProps> = ({ alpha, temp, k }) => {
  const t_kr = getCoeff(alpha, k);
  return (
    <div>
      <Heading as="h4" size="md" mb="0.75rem" fontWeight="600">
        Alpha: {alpha}
      </Heading>

      <StyledStatGroup mb="0.75rem">
        <Stat>
          <StatLabel>Required coefficient</StatLabel>
          <StatNumber title={String(t_kr)}>{roundTo(t_kr, 3)}</StatNumber>
        </Stat>
      </StyledStatGroup>

      <div>
        {Math.abs(temp) < t_kr ? (
          <Alert status="warning">
            <AlertIcon />
            General averages are similar. The differences are most likely random.
          </Alert>
        ) : (
          <Alert status="success">
            <AlertIcon />
            General averages are different. The differences are most likely meaningful.
          </Alert>
        )}
      </div>
    </div>
  );
};

interface HypothesesProps {
  data: [IData, IData];
}
const Hypotheses: React.FC<HypothesesProps> = ({ data }) => {
  const ranges = useRanges(data);

  const x_m = ranges[0].avg;
  const y_m = ranges[1].avg;
  const nx = ranges[0].n;
  const ny = ranges[1].n;
  const s2x = ranges[0].dispers;
  const s2y = ranges[1].dispers;

  const sq1 = Math.sqrt((nx - 1) * s2x + (ny - 1) * s2y);
  const sq2 = Math.sqrt((nx * ny * (nx + ny - 2)) / (nx + ny));
  const temp = ((x_m - y_m) / sq1) * sq2;
  const k = nx + ny - 2;

  return (
    <Card title="Hypotheses">
      <Divider my="1rem" />

      <StatGroup>
        <Stat mb="1rem">
          <StatLabel>Student&apos;s coefficient</StatLabel>
          <StatNumber title={String(temp)}>{roundTo(temp, 3)}</StatNumber>
          <StatHelpText>{`${roundTo(sq2)} * (${roundTo(x_m)} - ${roundTo(y_m)}) / ${roundTo(
            sq1,
          )}`}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>k</StatLabel>
          <StatNumber>{k}</StatNumber>
          <StatHelpText>{`${nx} + ${ny} - 2`}</StatHelpText>
        </Stat>
      </StatGroup>

      <Divider my="1rem" />

      <SimpleGrid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="1rem">
        <Coordinate alpha={0.025} temp={temp} k={k} />
        <Coordinate alpha={0.05} temp={temp} k={k} />
      </SimpleGrid>
    </Card>
  );
};

export default Hypotheses;
