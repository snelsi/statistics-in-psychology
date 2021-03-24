import { atom, useRecoilState } from "recoil";

const initialData1: number[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const initialRanges1: number[] = [8, 15, 22];
const initialData2: number[] = [14, 15, 15, 16, 16, 16, 16, 18, 18, 20];
const initialRanges2: number[] = [8, 15, 22];

const data1lab4State = atom({
  key: "data1lab4State",
  default: initialData1,
});

const ranges1lab4State = atom({
  key: "ranges1lab4State",
  default: initialRanges1,
});

const data2lab4State = atom({
  key: "data2lab4State",
  default: initialData2,
});

const ranges2lab4State = atom({
  key: "ranges2lab4State",
  default: initialRanges2,
});

const useLab4 = () => {
  const [data1, setData1] = useRecoilState(data1lab4State);
  const [ranges1, setRanges1] = useRecoilState(ranges1lab4State);
  const [data2, setData2] = useRecoilState(data2lab4State);
  const [ranges2, setRanges2] = useRecoilState(ranges2lab4State);

  return {
    data1,
    setData1,
    ranges1,
    setRanges1,
    data2,
    setData2,
    ranges2,
    setRanges2,
  };
};

export default useLab4;
