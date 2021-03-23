import * as React from "react";
import styled from "@emotion/styled";
import {
  Button,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Heading,
  Fade,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { Card, NumberInput, Mode } from "components";
import { getRandomNumber } from "utils";

const StyledFlex = styled(Flex)`
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;

    & h3 {
      margin-bottom: 1rem;
    }
    & button,
    & input {
      margin-bottom: 0.5rem;
    }
  }
`;
const StyledTable = styled(Table)`
  & tr,
  & th,
  & td {
    border: none;
  }
  & th,
  & td {
    &.cell-input {
      padding: 10px;
      & input {
        min-width: 60px;
      }
    }
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

interface DataTableProps {
  data: number[][];
  setData: (f: (draft: number[][]) => any) => void;
}
const DataTable: React.FC<DataTableProps> = ({ data, setData }) => {
  const rows = data?.length || 1;
  const columns = data?.[0]?.length || 1;

  const setRows = (newRows: number) => {
    if (newRows < rows) {
      setData((data) => {
        data.length = newRows;
      });
    } else {
      setData((data) => {
        for (let i = rows; i < newRows; i++) {
          data.push(new Array(columns).fill(0));
        }
      });
    }
  };

  const setColumns = (newColumns: number) => {
    if (newColumns < columns) {
      setData((data) => {
        for (let row of data) {
          row.length = newColumns;
        }
      });
    } else {
      setData((data) => {
        for (let row of data) {
          for (let i = columns; i < newColumns; i++) {
            row.push(0);
          }
        }
      });
    }
  };

  const setRandomData = () => {
    setData((data) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          data[i][j] = getRandomNumber(0, getRandomNumber(0, 40));
        }
      }
    });
  };

  const resetData = () => {
    setData((data) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          data[i][j] = i === j ? 1 : 0;
        }
      }
    });
  };

  const updateDot = (value: number, i: number, j: number) => {
    setData((dots) => {
      dots[i][j] = value;
    });
  };

  const nxi = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < data[0].length; i++) {
      let n = 0;
      for (let row of data) {
        n += row[i];
      }
      arr.push(n);
    }
    return arr;
  }, [data]);

  const n = React.useMemo(() => nxi.reduce((acc, value) => acc + value, 0), [nxi]);
  const xData = React.useMemo(() => data.map((row) => row.map((x) => ({ x }))).flat(), [data]);

  return (
    <Fade in>
      <Card>
        <StyledFlex align="center" justify="space-between" mb="1.5rem">
          <Heading as="h3" size="lg" fontWeight="600" mr="1rem">
            Data
          </Heading>
          <Flex align="center" flexWrap="wrap">
            <NumberInput
              value={rows}
              setValue={setRows}
              min={1}
              step={1}
              precision={0}
              variant="filled"
              mr="4"
              maxW="120px"
            />

            <NumberInput
              value={columns}
              setValue={setColumns}
              min={1}
              step={1}
              precision={0}
              variant="filled"
              mr="4"
              maxW="120px"
            />

            <Button onClick={setRandomData} type="button" leftIcon={<span>🎲</span>} mr="4">
              Random
            </Button>
            <Button onClick={resetData} type="button" leftIcon={<FiRefreshCw />}>
              Reset
            </Button>
          </Flex>
        </StyledFlex>

        <Box overflow="auto" mb="1rem">
          <StyledTable variant="simple" mb="1rem">
            <Thead>
              <Tr>
                <Th />
                {data[0].map((_, i) => (
                  <Th key={i} isNumeric>
                    {i + 1}
                  </Th>
                ))}
                <Th isNumeric>
                  n<sub>yj</sub>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((row, i) => (
                <Tr key={i}>
                  <Th isNumeric>{i + 1}</Th>

                  {row.map((dot, j) => (
                    <Td key={`${i}-${j}`} className="cell-input">
                      <NumberInput
                        value={dot}
                        setValue={(newX) => updateDot(newX, i, j)}
                        key={`${i}-${j}`}
                      />
                    </Td>
                  ))}

                  <Td isNumeric>{row.reduce((acc, value) => acc + value, 0)}</Td>
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

export default DataTable;
