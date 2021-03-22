import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "components";
import { useRange } from "./Rangs";

const GraphWrapper = styled.div`
  overflow: hidden;
  height: clamp(240px, 35vw, 600px);
`;

export const calcRang = (r1: number, r2: number) => {
  if (r2 > r1) return 1;
  if (r2 < r1) return -1;
  return 0;
};

interface RelationTagProps {
  t: number;
}
const RelationTag: React.FC<RelationTagProps> = ({ t }) => {
  if (t >= 0.7) {
    return <StatHelpText color="teal.400">Very High relation</StatHelpText>;
  }
  if (t >= 0.5) {
    return <StatHelpText color="green.400">High relation</StatHelpText>;
  }
  if (t >= 0.3) {
    return <StatHelpText color="yellow.400">Medium relation</StatHelpText>;
  }
  if (t >= 0.2) {
    return <StatHelpText color="orange.400">Low relation</StatHelpText>;
  }
  if (t > 0) {
    return <StatHelpText color="red.500">Very Low relation</StatHelpText>;
  }
  return <StatHelpText color="red.400">No dependency</StatHelpText>;
};

interface RangCalcProps {
  data: { x: number; y: number }[];
}
const RangCalc: React.FC<RangCalcProps> = ({ data }) => {
  const rangedData = useRange(data);

  const dots = React.useMemo(
    () =>
      [...data].map((dot, i) => ({ ...dot, i, name: `x: ${dot.x}` })).sort((a, b) => a.x - b.x) ||
      [],
    [data],
  );

  const calcData = rangedData.map((range, i) => {
    const calc = [...rangedData].slice(i + 1).map((d) => ({
      ...d,
      cx: calcRang(range.rang1, d.rang1),
      cy: calcRang(range.rang2, d.rang2),
    }));
    const r = calc.reduce((acc, d) => acc + d.cx * d.cy, 0);

    return {
      ...range,
      calc,
      r,
    };
  });

  const sum = calcData.reduce((acc, d) => acc + d.r, 0);
  const n = calcData.length;

  const t = (2 * sum) / (n * n - n);

  return (
    <>
      <Card>
        <StatGroup>
          <Stat>
            <StatLabel>Kendall coefficient</StatLabel>
            <StatNumber>{t}</StatNumber>
            <RelationTag t={t} />
            <StatHelpText>{`(2 * ${sum}) / (${n}^2 - ${n})`}</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Sum</StatLabel>
            <StatNumber>{sum}</StatNumber>
            <StatHelpText>
              {calcData
                .slice(0, -1)
                .map((d) => d.r)
                .join(" + ")}
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Card>

      <Card title="Data Plot">
        <GraphWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              width={400}
              height={400}
              margin={{
                top: 20,
                right: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="x" />
              <YAxis type="number" dataKey="y" name="y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={dots} fill="#0070f3" line={{ stroke: "#0070f3" }} lineType="fitting" />
            </ScatterChart>
          </ResponsiveContainer>
        </GraphWrapper>
      </Card>

      <Card title="Calculations">
        {calcData.slice(0, -1).map(({ calc, r }, i) => (
          <Box mb="1rem" key={i}>
            <Flex align="center">
              <Box mr="1rem">{i + 1})</Box>
              <Table variant="simple" width="fit-content" mr="1rem">
                <Tbody>
                  <Tr>
                    {calc.map(({ cy }, i) => (
                      <Td key={i} isNumeric>
                        {cy}
                      </Td>
                    ))}
                  </Tr>
                  <Tr>
                    {calc.map(({ cx }, i) => (
                      <Td key={i} isNumeric>
                        {cx}
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
              <Box ml="auto">{r}</Box>
            </Flex>
          </Box>
        ))}
      </Card>
    </>
  );
};

export default RangCalc;
