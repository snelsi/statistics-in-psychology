import React from "react";
import styled from "@emotion/styled";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading, Fade } from "@chakra-ui/react";
import { useLab2 } from "utils";
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

const Lab2 = () => {
  const { data, updateDot, addDot, removeDot, setRandomData } = useLab2();

  const sidebar = (
    <Fade in>
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
    </Fade>
  );

  return (
    <Layout title="Лабораторна 2" sidebar={sidebar} layoutColumns="minmax(0, 1fr) minmax(0, 1fr)">
      <Rangs />
      <RangCalc />
    </Layout>
  );
};

export default Lab2;
