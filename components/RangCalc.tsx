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
import { useLab2 } from "utils";

const GraphWrapper = styled.div`
  overflow: auto;
  height: clamp(240px, 35vw, 600px);
`;

interface RangCalcProps {}
const RangCalc: React.FC<RangCalcProps> = () => {
  const { data, calcData } = useLab2();

  const dots = React.useMemo(
    () =>
      [...data].map((dot, i) => ({ ...dot, i, name: `x: ${dot.x}` })).sort((a, b) => a.x - b.x) ||
      [],
    [data],
  );

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
