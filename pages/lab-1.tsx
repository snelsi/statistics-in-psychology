import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useImmer } from "use-immer";
import { Button, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Tex2SVG = dynamic(() => import("react-hook-mathjax"), { ssr: false });

import { Layout, DataTable, Goodman, FrequencyCard } from "components";

const Sidebar = styled.div`
  & svg {
    padding-right: 1.5rem;
    width: 100%;
  }
`;

const gxyFormula =
  "g_{xy} = \\frac{ \\displaystyle\\sum_{j=1}^{m} \\max_{i=\\overline{1,k}}n_{ij} - \\max_{i=\\overline{1,k}}n_{xi}}{n - \\displaystyle\\max_{i=\\overline{1,k}}n_{xi}}";
const gyxFormula =
  "g_{yx} = \\frac{ \\displaystyle\\sum_{i=1}^{k} \\max_{j=\\overline{1,m}}n_{ij} - \\max_{j=\\overline{1,m}}n_{yj}}{n - \\displaystyle\\max_{j=\\overline{1,m}}n_{yj}}";

const initialData = [
  [52, 7, 3, 18, 33],
  [24, 72, 7, 6, 25],
  [42, 5, 0, 21, 11],
  [5, 2, 2, 43, 1],
];

const sidebar = (
  <Sidebar>
    <Heading as="h2" size="lg" mb="1rem" fontWeight="600">
      Goodman coefficient
    </Heading>
    <Link href="/lab-1-alt" passHref>
      <Button as="a" colorScheme="blue" mb="1rem" isFullWidth>
        Alt. View
      </Button>
    </Link>
    <Text mb="1rem">Shows the dependency between two params in [-1, 1] range.</Text>
    <Text mb="1.5rem">
      1 - direct dependency,
      <br />0 - no direct dependency,
      <br />
      -1 - anti-dependency.
    </Text>
    <Tex2SVG latex={gxyFormula} />
    <Tex2SVG latex={gyxFormula} />
  </Sidebar>
);

const Lab1 = () => {
  const [data, setData] = useImmer<number[][]>(initialData);

  const xData = React.useMemo(() => data.map((row) => row.map((x) => ({ x }))).flat(), [data]);

  return (
    <Layout title="Лабораторна 1" sidebar={sidebar}>
      <Goodman data={data} />
      <DataTable data={data} setData={setData} />
      <FrequencyCard data={xData} />
    </Layout>
  );
};

export default Lab1;
