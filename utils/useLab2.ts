import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { uid } from "uid";
import { getRandomNumber, removeItemAtIndex } from "utils";

interface Dot {
  x: number;
  y: number;
  id: string | number;
}

const initialData: Dot[] = [
  { x: 8, y: 12, id: 1 },
  { x: 9, y: 7, id: 2 },
  { x: 13, y: 23, id: 3 },
  { x: 16, y: 37, id: 4 },
  { x: 32, y: 45, id: 5 },
  { x: 41, y: 52, id: 6 },
  { x: 48, y: 34, id: 7 },
  { x: 49, y: 38, id: 8 },
];

const lab2State = atom({
  key: "lab2State",
  default: initialData,
});

const getRange = (data: { x: number; y: number }[], sortProp: "x" | "y", rangeProp: string) => {
  const sortedData: { x: number; y: number; [x: string]: number }[] = [...data]
    .sort((a, b) => a[sortProp] - b[sortProp])
    .map((d) => ({ ...d }));

  for (let i = 0; i < sortedData.length; i++) {
    const cur = sortedData[i][sortProp];
    let j = i;
    while (j + 1 < sortedData.length && sortedData[j + 1][sortProp] === cur) {
      j++;
    }
    for (let k = i; k <= j; k++) {
      sortedData[k][rangeProp] = 1 + (i + j) / 2;
    }
    i = j;
  }

  return sortedData;
};

const rangeLab2State = selector({
  key: "rangeLab2State",
  get: ({ get }) => {
    const data = get(lab2State);
    let rangedData = getRange(data, "x", "rang1");
    rangedData = getRange(rangedData, "y", "rang2");
    rangedData = [...rangedData].sort((a, b) => a.x - b.x);

    return rangedData;
  },
});

const calcRang = (r1: number, r2: number) => {
  if (r2 > r1) return 1;
  if (r2 < r1) return -1;
  return 0;
};

const calcDataLab2State = selector({
  key: "calcDataLab2State",
  get: ({ get }) => {
    const rangedData = get(rangeLab2State);
    const calcData = rangedData.map((range, i) => {
      const calc = [...rangedData].slice(i + 1).map((d) => ({
        ...d,
        cx: calcRang(range.rang1, d.rang1),
        cy: calcRang(range.rang2, d.rang2),
      }));
      const r = calc.reduce((acc, d) => acc + d.cx * d.cy, 0);

      return {
        ...range,
        calc,
        r,
      };
    });

    return calcData;
  },
});

const useLab2 = () => {
  const [data, setData] = useRecoilState(lab2State);
  const rangedData = useRecoilValue(rangeLab2State);
  const calcData = useRecoilValue(calcDataLab2State);

  const setRandomData = () => {
    const arr = [];
    let i = 10000;
    while (i > 0) {
      arr.push({ x: getRandomNumber(1, 99), y: getRandomNumber(1, 99), id: uid() });
      i = getRandomNumber(0, i - 1);
    }
    setData(arr);
  };

  const updateDot = (value: number, i: number, prop: "x" | "y") =>
    setData((dots) =>
      dots.map((d, di) => {
        if (di === i) return { ...d, [prop]: value };
        return d;
      }),
    );

  const removeDot = (i: number) => setData((dots) => removeItemAtIndex(dots, i));

  const addDot = () => setData((dots) => [...dots, { x: 1, y: 1, id: uid() }]);

  return {
    data,
    setData,
    rangedData,
    calcData,
    setRandomData,
    updateDot,
    removeDot,
    addDot,
  };
};

export default useLab2;
