import * as React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Table, Tbody, Tr, Td, Fade } from "@chakra-ui/react";
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
  overflow: auto;
  height: clamp(240px, 35vw, 600px);
`;

const calcRang = (r1: number, r2: number) => {
  if (r2 > r1) return 1;
  if (r2 < r1) return -1;
  return 0;
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

  return (
    <>
      <Fade in>
        <Card title="Calculations">
          <GraphWrapper>
            {calcData.slice(0, -1).map(({ calc, r }, i) => (
              <Flex align="center" mb="1rem" key={i} width="fit-content">
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
            ))}
          </GraphWrapper>
        </Card>
      </Fade>
      <Fade in>
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
                <Scatter
                  data={dots}
                  fill="#0070f3"
                  line={{ stroke: "#0070f3" }}
                  lineType="fitting"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>
      </Fade>
    </>
  );
};

export default RangCalc;
