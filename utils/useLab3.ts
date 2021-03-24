import { atom, useRecoilState } from "recoil";

const initialData1: number[] = [20, 50, 80];
const initialData2: number[] = [25, 40, 55];

const data1lab3State = atom({
  key: "data1lab3State",
  default: initialData1,
});

const ranges1lab3State = atom({
  key: "ranges1lab3State",
  default: initialData1,
});

const data2lab3State = atom({
  key: "data2lab3State",
  default: initialData2,
});

const ranges2lab3State = atom({
  key: "ranges2lab3State",
  default: initialData2,
});

const useLab3 = () => {
  const [data1, setData1] = useRecoilState(data1lab3State);
  const [ranges1, setRanges1] = useRecoilState(ranges1lab3State);
  const [data2, setData2] = useRecoilState(data2lab3State);
  const [ranges2, setRanges2] = useRecoilState(ranges2lab3State);

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

export default useLab3;
