import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading, Input, Fade } from "@chakra-ui/react";
import { Layout, DataTableAlt, Goodman, FrequencyCard, NumberInput } from "components";
import { useLab1Alt } from "utils";

const List = styled.ul`
  list-style: none;
  & li {
    display: grid;
    margin-bottom: 0.4rem;
    grid-template-columns: 5fr 5fr 4fr auto;
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

const Lab1 = () => {
  const { data, updateDotProp, removeDot, addDot, setRandomData, sortedData } = useLab1Alt();

  const sidebar = (
    <Fade in>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Goodman coefficient
      </Heading>
      <Link href="/lab-1" passHref>
        <Button as="a" colorScheme="blue" mb="1rem" isFullWidth>
          Main View
        </Button>
      </Link>
      <List>
        {data.map((dot, i) => (
          <li key={dot.id}>
            <Input
              value={dot.prop1}
              //  @ts-ignore
              onChange={(e) => updateDotProp((e.target as HTMLInputElement).value, i, "prop1")}
              placeholder="Property"
            />
            <Input
              value={dot.prop2}
              //  @ts-ignore
              onChange={(e) => updateDotProp(e.target.value, i, "prop2")}
              placeholder="Value"
            />
            <NumberInput
              value={dot.value}
              setValue={(newY) => updateDotProp(newY, i, "value")}
              placeholder="Amount"
            />
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

  const xData = sortedData.map((row) => row.data.map((d) => d.value || 0));
  const values = xData.flat();

  return (
    <Layout title="Лабораторна 1" sidebar={sidebar} sidebarWidth="440px">
      <Goodman data={xData} />
      <DataTableAlt data={sortedData} />
      <FrequencyCard data={values} />
    </Layout>
  );
};

export default Lab1;
