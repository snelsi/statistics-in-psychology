import * as React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Fade,
} from "@chakra-ui/react";
import { Card, StyledStatGroup } from "components";
import { roundTo, useLab2 } from "utils";

const StyledTable = styled(Table)`
  & th,
  & td {
    &:first-child {
      background-color: #fff;
      border-right: var(--chakra-borders-1px) var(--chakra-colors-gray-100);
      position: sticky;
      left: 0;
    }
  }
`;

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

const wideStyled = { gridColumn: "1 / -1" };

interface RangsProps {}
const Rangs: React.FC<RangsProps> = () => {
  const { rangedData, calcData } = useLab2();

  const sum = calcData.reduce((acc, d) => acc + d.r, 0);
  const n = calcData.length;

  const t = (2 * sum) / (n * n - n);

  return (
    <Fade in style={wideStyled}>
      <Card title="Rangs">
        <Box overflow="auto" marginBottom="1rem">
          <StyledTable variant="simple" mb="1rem">
            <Thead>
              <Tr>
                <Th>Y rang</Th>
                {rangedData.map((d, i) => (
                  <Th key={i} isNumeric>
                    {d.rang2}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Th>Y</Th>
                {rangedData.map(({ y, id }) => (
                  <Td key={id} isNumeric>
                    {y}
                  </Td>
                ))}
              </Tr>
              <Tr>
                <Th>X</Th>
                {rangedData.map(({ x, id }) => (
                  <Td key={id} isNumeric>
                    {x}
                  </Td>
                ))}
              </Tr>
            </Tbody>

            <Tfoot>
              <Tr>
                <Th>X Rang</Th>
                {rangedData.map((d, i) => (
                  <Th key={i} isNumeric>
                    {d.rang1}
                  </Th>
                ))}
              </Tr>
            </Tfoot>
          </StyledTable>
        </Box>

        <StyledStatGroup>
          <Stat>
            <StatLabel>Kendall coefficient</StatLabel>
            <StatNumber title={`(2 * ${sum}) / (${n}^2 - ${n})`}>{roundTo(t, 7)}</StatNumber>
            <RelationTag t={t} />
          </Stat>

          <Stat>
            <StatLabel>Sum</StatLabel>
            <StatNumber>{roundTo(sum, 7)}</StatNumber>
            <StatHelpText>
              {calcData
                .slice(0, -1)
                .map((d) => d.r)
                .join(" + ")}
            </StatHelpText>
          </Stat>
        </StyledStatGroup>
      </Card>
    </Fade>
  );
};

export default Rangs;
