import * as React from "react";
import styled from "@emotion/styled";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Tfoot, Fade } from "@chakra-ui/react";
import { Card, Mode } from "components";

const StyledTable = styled(Table)`
  & tr,
  & th,
  & td {
    border: none;
  }
  & th,
  & td {
    &:first-child {
      border-right: var(--chakra-borders-1px) var(--chakra-colors-gray-100);
    }
    &:last-child {
      background-color: #fff;
      border-left: var(--chakra-borders-1px) var(--chakra-colors-gray-100);
      position: sticky;
      right: 0;
    }
  }
  & thead {
    border-bottom: var(--chakra-borders-1px) var(--chakra-colors-gray-100);
  }
  & tfoot {
    border-top: var(--chakra-borders-1px) var(--chakra-colors-gray-100);
  }
`;

interface IData {
  prop2: string;
  value: number;
}
interface DataTableProps {
  data: { prop1: string; data: IData[]; nyj: number }[];
}
const DataTableAlt: React.FC<DataTableProps> = ({ data }) => {
  const nxi = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < (data?.[0]?.data?.length || 0); i++) {
      let n = 0;
      for (let row of data) {
        n += row.data?.[i]?.value || 0;
      }
      arr.push(n);
    }
    return arr;
  }, [data]);

  const n = React.useMemo(() => data.reduce((acc, d) => acc + d.nyj, 0), [data]);
  const xData = data.map((row) => row.data.map((d) => ({ x: d.value })));

  return (
    <Fade in>
      <Card title="Data">
        <Box overflow="auto" mb="1rem">
          <StyledTable variant="simple" mb="1rem">
            <Thead>
              <Tr>
                <Th />
                {data?.[0]?.data?.map(({ prop2 }) => (
                  <Th key={prop2} isNumeric>
                    {prop2}
                  </Th>
                ))}
                <Th isNumeric>
                  n<sub>yj</sub>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((row) => (
                <Tr key={row.prop1}>
                  <Th>{row.prop1}</Th>

                  {row.data.map((dot) => (
                    <Td key={dot.prop2} isNumeric>
                      {dot.value}
                    </Td>
                  ))}

                  <Td isNumeric>{row.nyj}</Td>
                </Tr>
              ))}
            </Tbody>

            <Tfoot>
              <Tr>
                <Th isNumeric>
                  n<sub>xi</sub>
                </Th>

                {nxi.map((nx, i) => (
                  <Td isNumeric key={i}>
                    {nx}
                  </Td>
                ))}
                <Td isNumeric fontWeight={600}>
                  {n}
                </Td>
              </Tr>
            </Tfoot>
          </StyledTable>
        </Box>

        <Mode data={xData.flat()} />
      </Card>
    </Fade>
  );
};

export default DataTableAlt;
