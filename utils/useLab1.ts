import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { getRandomNumber } from "utils";

const initialData: number[][] = [
  [52, 7, 3, 18, 33],
  [24, 72, 7, 6, 25],
  [42, 5, 0, 21, 11],
  [5, 2, 2, 43, 1],
];

const lab1State = atom({
  key: "lab1State",
  default: initialData,
});

const nxiLab1State = selector({
  key: "nxiLab1State",
  get: ({ get }) => {
    const data = get(lab1State);
    const arr: number[] = [];
    for (let i = 0; i < (data[0]?.length || 0); i++) {
      let n = 0;
      for (let row of data) {
        n += row[i];
      }
      arr.push(n);
    }
    return arr;
  },
});

const nLab1State = selector({
  key: "nLab1State",
  get: ({ get }) => {
    const nxi = get(nxiLab1State);
    return nxi.reduce((acc, value) => acc + value, 0);
  },
});

const xDataLab1State = selector({
  key: "xDataLab1State",
  get: ({ get }) => {
    const data = get(lab1State);
    return data.map((row) => row.map((x) => ({ x }))).flat();
  },
});

const useLab1 = () => {
  const [data, setData] = useRecoilState(lab1State);

  const nxi = useRecoilValue(nxiLab1State);
  const n = useRecoilValue(nLab1State);
  const xData = useRecoilValue(xDataLab1State);

  const rows = data?.length || 1;
  const columns = data?.[0]?.length || 1;

  const setRows = (newRows: number) => {
    if (newRows < rows) {
      setData((data) => {
        const arr = [...data];
        arr.length = newRows;
        return arr;
      });
    } else {
      setData((data) => {
        const arr = [...data];
        for (let i = rows; i < newRows; i++) {
          arr.push(new Array(columns).fill(0));
        }
        return arr;
      });
    }
  };

  const setColumns = (newColumns: number) => {
    if (newColumns < columns) {
      setData((data) => {
        const arr = data.map((r) => {
          const rc = [...r];
          rc.length = newColumns;
          return rc;
        });
        return arr;
      });
    } else {
      setData((data) => {
        const arr = data.map((r) => {
          const rc = [...r];
          for (let i = columns; i < newColumns; i++) {
            rc.push(0);
          }
          return rc;
        });
        return arr;
      });
    }
  };

  const setRandomData = () => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      const a = [];
      for (let j = 0; j < columns; j++) {
        a.push(getRandomNumber(0, getRandomNumber(0, 40)));
      }
      arr.push(a);
    }
    setData(arr);
  };

  const resetData = () => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      const a = [];
      for (let j = 0; j < columns; j++) {
        a.push(i === j ? 1 : 0);
      }
      arr.push(a);
    }
    setData(arr);
  };

  const updateDot = (value: number, i: number, j: number) =>
    setData((data) =>
      data.map((r, ci) =>
        r.map((d, cj) => {
          if (ci === i && cj === j) return value;
          return d;
        }),
      ),
    );

  return {
    data,
    setData,
    nxi,
    n,
    xData,
    setRandomData,
    resetData,
    updateDot,
    setRows,
    setColumns,
    rows,
    columns,
  };
};

export default useLab1;
