import React from "react";
import styled from "@emotion/styled";
import { useImmer } from "use-immer";
import { uid } from "uid";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Checkbox, Heading } from "@chakra-ui/react";
import { getRandomNumber, getRandomBool } from "utils";
import { Layout, DichotomyTable, NumberInput } from "components";

const List = styled.ul`
  list-style: none;
  & li {
    display: grid;
    margin-bottom: 0.4rem;
    grid-template-columns: 1fr auto auto;
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
  { x: 9, dichotomy: false, id: 1 },
  { x: 11, dichotomy: true, id: 2 },
  { x: 12, dichotomy: false, id: 3 },
];

interface Dot {
  x: number;
  dichotomy: boolean;
  id: string | number;
}

const Lab3 = () => {
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
      let x = getRandomNumber(1, 99);
      let j = 10000;
      while (j > 0) {
        dots.push({ x, dichotomy: getRandomBool(), id: uid() });
        j = getRandomNumber(0, j - 1);
        x += getRandomNumber(1, getRandomNumber(1, 12));
      }
    });
  };

  const updateX = (value: number, i: number) => {
    setData((dots) => {
      dots[i].x = value;
    });
  };
  const updateDichotomy = (value: boolean, i: number) => {
    setData((dots) => {
      dots[i].dichotomy = value;
    });
  };

  const removeDot = (i: number) => {
    setData((dots) => {
      dots.splice(i, 1);
    });
  };

  const addDot = () => {
    let i = 0;
    while (data.hasOwnProperty(i)) {
      i++;
    }
    setData((dots) => {
      dots.push({ x: i, dichotomy: false, id: uid() });
    });
  };

  const sidebar = (
    <>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Data
      </Heading>
      <List>
        {data.map(({ x, dichotomy, id }, i) => {
          const numX = Number(x);
          return (
            <li key={id}>
              <NumberInput value={numX} setValue={(newX) => updateX(newX, i)} />
              <Checkbox
                isChecked={dichotomy}
                onChange={(e) => updateDichotomy(e.target.checked, i)}
                size="lg"
              />
              <IconButton
                onClick={() => removeDot(i)}
                type="button"
                aria-label="delete"
                icon={<FiTrash2 />}
              />
            </li>
          );
        })}
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
    <Layout title="Лабораторна 3" sidebar={sidebar}>
      <DichotomyTable data={dots} />
    </Layout>
  );
};

export default Lab3;
