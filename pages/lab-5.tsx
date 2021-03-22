import * as React from "react";
import styled from "@emotion/styled";
import { useImmer } from "use-immer";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { uid } from "uid";
import { FiTrash2, FiPlus } from "react-icons/fi";
import {
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { getRandomNumber } from "utils";
import { Layout, Card, FrequencyCard, Mode, NTable } from "components";

const List = styled.ul`
  list-style: none;
  & li {
    display: grid;
    margin-bottom: 0.4rem;
    grid-template-columns: 1fr auto;
    gap: 0.4rem;
    width: 100%;
  }
`;

const GraphWrapper = styled.div`
  overflow: hidden;
`;

const initialData = [
  [
    { x: 8, id: 1 },
    { x: 9, id: 2 },
    { x: 13, id: 3 },
  ],
  [
    { x: 16, id: 4 },
    { x: 32, id: 5 },
    { x: 41, id: 6 },
  ],
  [
    { x: 48, id: 7 },
    { x: 49, id: 8 },
    { x: 49, id: 9 },
  ],
];

interface Dot {
  x: number;
  id: string | number;
}

const Lab1 = () => {
  const [data, setData] = useImmer<Dot[]>(initialData);

  const dots = React.useMemo(
    () =>
      [...data].map((dot, i) => ({ ...dot, i, name: `x: ${dot.x}` })).sort((a, b) => a.x - b.x) ||
      [],
    [data],
  );

  const setRandomData = () => {
    setData((dots) => {
      dots.length = 0;
      let x = getRandomNumber(0, getRandomNumber(0, 99));
      let j = 10000;
      while (j > 0) {
        dots.push({ x, id: uid() });
        j = getRandomNumber(0, j - 1);
        x += getRandomNumber(0, getRandomNumber(0, 4));
      }
    });
  };

  const updateDot = (value: number, i: number) => {
    setData((dots) => {
      dots[i].x = value;
    });
  };

  const removeDot = (i: number) => {
    setData((dots) => {
      dots.splice(i, 1);
    });
  };

  const addDot = () => {
    setData((dots) => {
      dots.push({ x: 1, id: uid() });
    });
  };

  const sidebar = (
    <>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Data
      </Heading>
      <List>
        {data.map((dot, i) => (
          <li key={dot.id}>
            <NumberInput value={dot.x} onChange={(_, newX) => updateDot(newX, i)}>
              <NumberInputField />
            </NumberInput>
            <IconButton
              onClick={() => removeDot(i)}
              type="button"
              aria-label="delete"
              icon={<FiTrash2 />}
            />
          </li>
        ))}
      </List>
      <Button
        onClick={addDot}
        type="button"
        className="button-create"
        isFullWidth
        leftIcon={<FiPlus />}
      >
        Add
      </Button>
      <Button
        onClick={setRandomData}
        type="button"
        className="button-create"
        isFullWidth
        leftIcon={<span>🎲</span>}
      >
        Random
      </Button>
    </>
  );

  const stats: { [x: number]: number } = {};
  data.forEach(({ x }) => {
    if (stats[x]) {
      stats[x] += 1;
    } else {
      stats[x] = 1;
    }
  });

  return (
    <Layout title="Лабораторна 1" sidebar={sidebar} layoutRows="auto auto minmax(0, 1fr) auto">
      {/* <Card title="Keys">
        <Wrap>
          {Array.from(Object.keys(stats)).map((key) => (
            <WrapItem key={key}>{key}</WrapItem>
          ))}
        </Wrap>
      </Card> */}
      <FrequencyCard data={dots} />
      <Mode data={dots} />

      {/* <GraphWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            width={400}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="x" />
            <YAxis type="number" dataKey="y" name="y" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={dots} fill="#0070f3" line={{ stroke: "#0070f3" }} lineType="fitting" />
            {averageLine && (
              <Scatter
                data={averageLine}
                shape={<CustomShape />}
                line
                lineType="fitting"
                fill="#ff4e42"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </GraphWrapper>
      <NTable data={dots} /> */}
    </Layout>
  );
};

export default Lab1;
