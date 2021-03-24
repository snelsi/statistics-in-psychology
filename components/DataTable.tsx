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
import { useLab1 } from "utils";

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

interface DataTableProps {}
const DataTable: React.FC<DataTableProps> = () => {
  const {
    data,
    setRandomData,
    rows,
    columns,
    setRows,
    setColumns,
    resetData,
    updateDot,
    nxi,
    n,
    xData,
  } = useLab1();

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
              max={100}
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
              max={100}
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
                {data[0]?.map((_, i) => (
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
