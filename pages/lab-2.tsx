import React from "react";
import styled from "@emotion/styled";
import { useImmer } from "use-immer";
import { uid } from "uid";

import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading } from "@chakra-ui/react";
import { getRandomNumber } from "utils";
import { Layout, NumberInput, Rangs, RangCalc } from "components";

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

interface Dot {
  x: number;
  y: number;
  id: string | number;
}

const Lab2 = () => {
  const [data, setData] = useImmer<Dot[]>(initialData);

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
    <Layout title="Лабораторна 2" sidebar={sidebar}>
      <Rangs data={data} />
      <RangCalc data={data} />
    </Layout>
  );
};

export default Lab2;
