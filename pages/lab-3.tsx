import React from "react";
import styled from "@emotion/styled";
import { useImmer } from "use-immer";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading } from "@chakra-ui/react";
import { getRandomNumber } from "utils";
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
  setData: (f: (dots: number[]) => void) => void;
  title?: React.ReactNode;
}
const DataInput: React.FC<DataInputProps> = ({ data, setData, title }) => {
  const setRandomData = () => {
    setData((dots) => {
      dots.length = 0;
      let j = 10000;
      while (j > 0) {
        dots.push(getRandomNumber(1, 99));
        j = getRandomNumber(0, j - 1);
      }
    });
  };

  const updateX = (value: number, i: number) => {
    setData((dots) => {
      dots[i] = value;
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
      dots.push(i);
    });
  };

  return (
    <>
      {title && (
        <Heading as="h3" size="md" mb="1rem" fontWeight="600">
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
const initialData1 = [20, 50, 80];
const initialData2 = [25, 40, 55];

const Lab3 = () => {
  const [data1, setData1] = useImmer<number[]>(initialData1);
  const [ranges1, setRanges1] = useImmer<number[]>(data1);
  const [data2, setData2] = useImmer<number[]>(initialData2);
  const [ranges2, setRanges2] = useImmer<number[]>(data2);

  const sidebar = (
    <>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Data
      </Heading>

      <DataInput data={data1} setData={setData1} title="Array 1" />
      <DataInput data={data2} setData={setData2} title="Array 2" />
    </>
  );

  return (
    <Layout title="Лабораторна 3" sidebar={sidebar} layoutRows="auto auto">
      <Intervals
        title="Array 1 Ranges"
        data={data1}
        values={ranges1}
        setValues={(values) => {
          setRanges1((d) => {
            d.length = 0;
            d.push(...values);
          });
        }}
        key={`1-${data1.length}-${ranges1.length}`}
      />
      <Intervals
        title="Array 2 Ranges"
        data={data2}
        values={ranges2}
        setValues={(values) => {
          setRanges2((d) => {
            d.length = 0;
            d.push(...values);
          });
        }}
        key={`2-${data2.length}-${ranges2.length}`}
      />
    </Layout>
  );
};

export default Lab3;
