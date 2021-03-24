import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button, Heading, Text, Fade } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useLab1 } from "utils";

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

const sidebar = (
  <Fade in>
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
  </Fade>
);

const Lab1 = () => {
  const { data } = useLab1();

  const values = data.flat();

  return (
    <Layout title="Лабораторна 1" sidebar={sidebar}>
      <Goodman data={data} />
      <DataTable />
      <FrequencyCard data={values} />
    </Layout>
  );
};

export default Lab1;
