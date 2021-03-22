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
  StatGroup,
} from "@chakra-ui/react";
import { Card } from "components";
import { roundTo } from "utils";

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
const StyledStatGroup = styled(StatGroup)`
  align-items: center;
  background: var(--chakra-colors-gray-50);
  border-radius: 8px;
  flex-wrap: wrap;
  padding: 1rem;
  & .chakra-stat {
    min-width: 120px;
    @media (max-width: 800px) {
      min-width: 100%;
      margin-right: 0;
    }
  }
`;

const getRange = (data: { x: number; y: number }[], sortProp: "x" | "y", rangeProp: string) => {
  const sortedData: { x: number; y: number; [x: string]: number }[] = [...data]
    .sort((a, b) => a[sortProp] - b[sortProp])
    .map((d) => ({ ...d }));

  for (let i = 0; i < sortedData.length; i++) {
    const cur = sortedData[i][sortProp];
    let j = i;
    while (j + 1 < sortedData.length && sortedData[j + 1][sortProp] === cur) {
      j++;
    }
    for (let k = i; k <= j; k++) {
      sortedData[k][rangeProp] = 1 + (i + j) / 2;
    }
    i = j;
  }

  return sortedData;
};

export const useRange = (data: { x: number; y: number }[]) => {
  const rangedData = React.useMemo(() => {
    let rangedData = getRange(data, "x", "rang1");
    rangedData = getRange(rangedData, "y", "rang2");
    rangedData = [...rangedData].sort((a, b) => a.x - b.x);

    return rangedData;
  }, [data]);

  return rangedData;
};

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

interface RangsProps {
  data: { x: number; y: number; id: string | number }[];
}
const Rangs: React.FC<RangsProps> = ({ data }) => {
  const rangedData = useRange(data);

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
    <Card title="Rangs" wide>
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
  );
};

export default Rangs;
