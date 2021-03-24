import React from "react";
import styled from "@emotion/styled";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading, Fade } from "@chakra-ui/react";
import { SetterOrUpdater } from "recoil";
import { getRandomNumber, useLab3 } from "utils";
import { Layout, Intervals, NumberInput } from "components";

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

interface DataInputProps {
  data: number[];
  setData: SetterOrUpdater<number[]>;
  title?: React.ReactNode;
}
const DataInput: React.FC<DataInputProps> = ({ data, setData, title }) => {
  const setRandomData = () => {
    const arr: number[] = [];
    let j = 10000;
    while (j > 0) {
      arr.push(getRandomNumber(1, 99));
      j = getRandomNumber(0, j - 1);
    }
    setData(arr);
  };

  const updateX = (value: number, i: number) => {
    setData((dots) => {
      const arr = [...dots];
      arr[i] = value;
      return arr;
    });
  };

  const removeDot = (i: number) => {
    setData((dots) => {
      const arr = [...dots];
      arr.splice(i, 1);
      return arr;
    });
  };

  const addDot = () => {
    let i = 0;
    while (data.hasOwnProperty(i)) {
      i++;
    }
    setData((dots) => {
      const arr = [...dots];
      arr.push(i);
      return arr;
    });
  };

  return (
    <>
      {title && (
        <Heading as="h2" size="md" mb="1rem" fontWeight="600">
          {title}
        </Heading>
      )}
      <List>
        {data.map((x, i) => {
          const numX = Number(x);
          return (
            <li key={i}>
              <NumberInput value={numX} setValue={(newX) => updateX(newX, i)} />
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
        mb="1.5rem"
      >
        Random
      </Button>
    </>
  );
};

const Lab3 = () => {
  const { data1, setData1, data2, setData2, ranges1, setRanges1, ranges2, setRanges2 } = useLab3();

  const sidebar = (
    <Fade in>
      <DataInput data={data1} setData={setData1} title="Array 1" />
      <DataInput data={data2} setData={setData2} title="Array 2" />
    </Fade>
  );

  return (
    <Layout title="Лабораторна 3" sidebar={sidebar} layoutRows="auto auto">
      <Intervals title="Array 1 Ranges" data={data1} values={ranges1} setValues={setRanges1} />
      <Intervals title="Array 2 Ranges" data={data2} values={ranges2} setValues={setRanges2} />
    </Layout>
  );
};

export default Lab3;
