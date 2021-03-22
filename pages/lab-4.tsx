import React from "react";
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
import { Button, IconButton, Heading } from "@chakra-ui/react";
import { Layout, NTable, NumberInput } from "components";
import { getRandomNumber } from "utils";

const List = styled.ul`
  list-style: none;
  & li {
    display: grid;
    margin-bottom: 0.4rem;
    grid-template-columns: 1fr 1fr auto;
    gap: 0.4rem;
    width: 100%;
    & .chakra-checkbox__control {
      border-radius: var(--chakra-radii-md);
      height: 36px;
      margin: 2px;
      width: 36px;
    }
  }
`;
const Graphs = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  height: auto;
  padding: 1rem;
  overflow: hidden;
`;
const GraphWrapper = styled.div`
  overflow: hidden;
`;

const initialData = [
  { x: 8, y: 12, id: 1 },
  { x: 9, y: 7, id: 2 },
  { x: 13, y: 23, id: 3 },
  { x: 16, y: 37, id: 4 },
  { x: 32, y: 45, id: 5 },
  { x: 41, y: 52, id: 6 },
  { x: 48, y: 34, id: 7 },
  { x: 49, y: 38, id: 8 },
];

const CustomShape = () => null;

interface Dot {
  x: number;
  y: number;
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
      let i = 10000;
      while (i > 0) {
        dots.push({ x: getRandomNumber(1, 99), y: getRandomNumber(1, 99), id: uid() });
        i = getRandomNumber(0, i - 1);
      }
    });
  };

  const updateDot = (value: number, i: number, prop: "x" | "y") => {
    setData((dots) => {
      dots[i][prop] = value;
    });
  };

  const removeDot = (i: number) => {
    setData((dots) => {
      dots.splice(i, 1);
    });
  };

  const addDot = () => {
    setData((dots) => {
      dots.push({ x: 1, y: 1, id: uid() });
    });
  };

  const averageLine = React.useMemo(() => {
    if (!data || data.length === 0) return null;
    const stats = new Map<number, number[]>();
    data.forEach(({ x, y }) => {
      const statsX = stats.get(x);
      if (statsX) {
        stats.set(x, [...statsX, y]);
      } else {
        stats.set(x, [y]);
      }
    });
    return Array.from(stats.entries()).map(([x, values]) => ({
      x,
      id: x,
      y: values.reduce((acc, v) => acc + v, 0) / values.length,
    }));
  }, [data]);

  const sidebar = (
    <>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Data
      </Heading>
      <List>
        {data.map((dot, i) => (
          <li key={dot.id}>
            <NumberInput value={dot.x} setValue={(newX) => updateDot(newX, i, "x")} />
            <NumberInput value={dot.y} setValue={(newY) => updateDot(newY, i, "y")} />
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

  return (
    <Layout sidebar={sidebar}>
      <Graphs>
        <GraphWrapper>
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
        <NTable data={dots} />
      </Graphs>
    </Layout>
  );
};

export default Lab1;
