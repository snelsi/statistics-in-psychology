import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { uid } from "uid";
import { getRandomNumber, removeItemAtIndex, replaceItemAtIndex } from "utils";

interface IData {
  prop1: string;
  prop2: string;
  value: number;
  id: string;
}

const initialData: IData[] = [
  { prop1: "Black pants", prop2: "White shirt", value: 3, id: "1" },
  { prop1: "Blue pants", prop2: "Pink shirt", value: 2, id: "2" },
  { prop1: "Black pants", prop2: "Pink shirt", value: 1, id: "3" },
  { prop1: "Shorts", prop2: "White shirt", value: 1, id: "4" },
  { prop1: "Blue pants", prop2: "White shirt", value: 2, id: "5" },
  { prop1: "Black pants", prop2: "White shirt", value: 1, id: "6" },
];

const toKey = (prop1: string, prop2: string) => `${prop1.trim()}-//-${prop2.trim()}`.toLowerCase();

const lab1AltState = atom({
  key: "lab1AltState",
  default: initialData,
});

const filteredLab1State = selector({
  key: "filteredLab1AltState",
  get: ({ get }) => {
    const data = get(lab1AltState);

    return data
      .map(({ prop1, prop2, ...c }) => ({ ...c, prop1: prop1?.trim(), prop2: prop2?.trim() }))
      .filter(({ prop1, prop2 }) => !!prop1 && !!prop2);
  },
});

const propsLab1State = selector({
  key: "propsLab1AltState",
  get: ({ get }) => {
    const filteredData = get(filteredLab1State);

    const props1: string[] = [
      ...new Set(filteredData.map((d) => d.prop1?.toLowerCase().trim()).filter(Boolean)),
    ];
    const props2: string[] = [
      ...new Set(filteredData.map((d) => d.prop2?.toLowerCase().trim()).filter(Boolean)),
    ];

    return { props1, props2 };
  },
});

const pairsLab1State = selector({
  key: "pairsLab1AltState",
  get: ({ get }) => {
    const filteredData = get(filteredLab1State);
    const { props1, props2 } = get(propsLab1State);

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
  },
});

const sortedDataLab1State = selector({
  key: "sortedDataLab1AltState",
  get: ({ get }) => {
    const pairs = get(pairsLab1State);
    const { props1 } = get(propsLab1State);
    return props1
      .map((prop) => {
        const filteredData = pairs
          .filter((p) => p.prop1?.toLowerCase().trim() === prop?.toLowerCase().trim())
          .sort((a, b) => a.prop2.localeCompare(b.prop2));
        return {
          prop1: prop,
          data: filteredData,
          nyj: filteredData.reduce((acc, d) => acc + d.value, 0),
        };
      })
      .sort((a, b) => a.prop1.localeCompare(b.prop1));
  },
});

const getProp1 = () => {
  const r = getRandomNumber(1, 4);
  if (r === 4) return "Very Light";
  if (r === 3) return "Light";
  if (r === 2) return "Dark";
  return "Very Dark";
};

const getProp2 = () => {
  const r = getRandomNumber(1, 3);
  if (r === 3) return "High";
  if (r === 2) return "Medium";
  return "Low";
};

const getRandomDot = () => ({
  prop1: getProp1(),
  prop2: getProp2(),
  value: getRandomNumber(8, 32),
  id: uid(),
});

const useLab1Alt = () => {
  const [data, setData] = useRecoilState(lab1AltState);
  const filteredData = useRecoilValue(filteredLab1State);
  const { props1, props2 } = useRecoilValue(propsLab1State);
  const pairs = useRecoilValue(pairsLab1State);
  const sortedData = useRecoilValue(sortedDataLab1State);

  const setRandomData = () => {
    const arr = [];
    let i = 5000;
    while (i > 0) {
      arr.push(getRandomDot());
      i = getRandomNumber(0, i - 1);
    }
    setData(arr);
  };

  const updateDotProp = (value: any, i: number, prop: "prop1" | "prop2" | "value") =>
    setData((data) => replaceItemAtIndex(data, i, { ...data[i], [prop]: value }));

  const removeDot = (i: number) => setData((data) => removeItemAtIndex(data, i));

  const addDot = () => setData((data) => [...data, { prop1: "", prop2: "", value: 1, id: uid() }]);

  return {
    data,
    setData,
    filteredData,
    props1,
    props2,
    pairs,
    sortedData,
    setRandomData,
    updateDotProp,
    removeDot,
    addDot,
  };
};

export default useLab1Alt;
