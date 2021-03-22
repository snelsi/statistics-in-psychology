import React from "react";
import { useImmer } from "use-immer";
import styled from "@emotion/styled";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Button, IconButton, Heading, Input } from "@chakra-ui/react";
import { uid } from "uid";
import { Layout, DataTableAlt, Goodman, Mode, FrequencyCard, NumberInput } from "components";
import { getRandomNumber } from "utils";

const toKey = (prop1: string, prop2: string) => `${prop1.trim()}-//-${prop2.trim()}`.toLowerCase();

const toProp1 = (prop1: number) => {
  if (prop1 === 4) return "Very Light";
  if (prop1 === 3) return "Light";
  if (prop1 === 2) return "Dark";
  return "Very Dark";
};
const toProp2 = (prop: number) => {
  if (prop === 3) return "High";
  if (prop === 2) return "Medium";
  return "Low";
};

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

const initialData = [
  { prop1: "Black pants", prop2: "White shirt", value: 3, id: "1" },
  { prop1: "Blue pants", prop2: "Pink shirt", value: 2, id: "2" },
  { prop1: "Black pants", prop2: "Pink shirt", value: 1, id: "3" },
  { prop1: "Shorts", prop2: "White shirt", value: 1, id: "4" },
  { prop1: "Blue pants", prop2: "White shirt", value: 2, id: "5" },
  { prop1: "Black pants", prop2: "White shirt", value: 1, id: "6" },
];

interface IData {
  prop1: string;
  prop2: string;
  value: number;
  id: string;
}
const Lab1 = () => {
  const [data, setData] = useImmer<IData[]>(initialData);

  const filteredData = data
    .map(({ prop1, prop2, ...c }) => ({ ...c, prop1: prop1?.trim(), prop2: prop2?.trim() }))
    .filter(({ prop1, prop2 }) => !!prop1 && !!prop2);

  const props1: string[] = React.useMemo(
    () => [...new Set(filteredData.map((d) => d.prop1?.trim()).filter(Boolean))],
    [filteredData],
  );
  const props2: string[] = React.useMemo(
    () => [...new Set(filteredData.map((d) => d.prop2?.trim()).filter(Boolean))],
    [filteredData],
  );

  const pairs = React.useMemo(() => {
    const pairs = new Map<
      string,
      {
        prop1: string;
        prop2: string;
        value: number;
      }
    >();

    for (let prop1 of props1) {
      for (let prop2 of props2) {
        const key = toKey(prop1, prop2);
        pairs.set(key, { prop1, prop2, value: 0 });
      }
    }

    filteredData.forEach(({ prop1, prop2, value }) => {
      const key = toKey(prop1, prop2);
      const obj = pairs.get(key);
      obj.value += value;
      pairs.set(key, obj);
    });

    return Array.from(pairs.values());
  }, [filteredData]);

  const sortedData = React.useMemo(
    () =>
      props1
        .map((prop) => {
          const filteredData = pairs
            .filter((p) => p.prop1 === prop)
            .sort((a, b) => a.prop2.localeCompare(b.prop2));
          return {
            prop1: prop,
            data: filteredData,
            nyj: filteredData.reduce((acc, d) => acc + d.value, 0),
          };
        })
        .sort((a, b) => a.prop1.localeCompare(b.prop1)),
    [filteredData],
  );

  const setRandomData = () => {
    setData((dots) => {
      dots.length = 0;
      let i = 5000;
      while (i > 0) {
        dots.push({
          prop1: toProp1(getRandomNumber(1, 4)),
          prop2: toProp2(getRandomNumber(1, 3)),
          value: getRandomNumber(8, 32),
          id: uid(),
        });
        i = getRandomNumber(0, i - 1);
      }
    });
  };

  const updateDot = (value: number, i: number) => {
    setData((dots) => {
      dots[i].value = value;
    });
  };
  const updateDotProp = (value: string, i: number, prop: "prop1" | "prop2") => {
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
      dots.push({ prop1: "", prop2: "", value: 1, id: uid() });
    });
  };

  const sidebar = (
    <>
      <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
        Goodman coefficient
      </Heading>
      <List>
        {data.map((dot, i) => (
          <li key={dot.id}>
            <Input
              value={dot.prop1}
              onChange={(e) => updateDotProp(e.target.value, i, "prop1")}
              placeholder="Property"
            />
            <Input
              value={dot.prop2}
              onChange={(e) => updateDotProp(e.target.value, i, "prop2")}
              placeholder="Value"
            />
            <NumberInput
              value={dot.value}
              setValue={(newY) => updateDot(newY, i)}
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
    </>
  );

  const xData = sortedData.map((row) => row.data.map((d) => ({ x: d.value })));

  return (
    <Layout title="Лабораторна 1" sidebar={sidebar} sidebarWidth="440px">
      <Goodman data={xData.map((row) => row.map((c) => c.x))} />
      <DataTableAlt data={sortedData} />
      <Mode data={xData.flat()} />
      <FrequencyCard data={xData.flat()} />
    </Layout>
  );
};

export default Lab1;
