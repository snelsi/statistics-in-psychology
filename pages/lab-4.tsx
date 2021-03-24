import React from "react";
import { Fade } from "@chakra-ui/react";
import { useLab4 } from "utils";
import { Layout, Intervals, DataInput, ArraysData, Hypotheses } from "components";
import { IData } from "components/Hypotheses";

const Lab4 = () => {
  const { data1, setData1, data2, setData2, ranges1, setRanges1, ranges2, setRanges2 } = useLab4();

  const sidebar = (
    <Fade in>
      <DataInput data={data1} setData={setData1} title="Array 1" />
      <DataInput data={data2} setData={setData2} title="Array 2" />
    </Fade>
  );

  const d: [IData, IData] = [
    { data: data1, ranges: ranges1 },
    { data: data2, ranges: ranges2 },
  ];

  return (
    <Layout title="Лабораторна 4" sidebar={sidebar} layoutRows="auto auto">
      <Intervals
        title="Array 1 Ranges"
        data={data1}
        values={ranges1}
        setValues={setRanges1}
        showStats={false}
      />
      <Intervals
        title="Array 2 Ranges"
        data={data2}
        values={ranges2}
        setValues={setRanges2}
        showStats={false}
      />
      <ArraysData data={d} />
      <Hypotheses data={d} />
    </Layout>
  );
};

export default Lab4;
