import React from "react";
import { Fade } from "@chakra-ui/react";
import { useLab3 } from "utils";
import { Layout, Intervals, DataInput } from "components";

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
