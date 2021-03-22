import * as React from "react";
import styled from "@emotion/styled";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Tfoot } from "@chakra-ui/react";
import { Card } from "components";

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

interface RangsProps {
  data: { x: number; y: number; id: string | number }[];
}
const Rangs: React.FC<RangsProps> = ({ data }) => {
  const rangedData = useRange(data);

  return (
    <Card title="Rangs">
      <Box overflow="auto">
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
    </Card>
  );
};

export default Rangs;
