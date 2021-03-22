import * as React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from "@chakra-ui/react";
import { Card } from "components";

interface DependencyTagProps {
  g: number;
}
const DependencyTag: React.FC<DependencyTagProps> = ({ g }) => {
  if (g >= 1) {
    return <StatHelpText color="teal.400">Direct dependency</StatHelpText>;
  }
  if (g >= 0.75) {
    return <StatHelpText color="green.400">High dependency</StatHelpText>;
  }
  if (g >= 0.5) {
    return <StatHelpText color="yellow.400">Medium dependency</StatHelpText>;
  }
  if (g >= 0.25) {
    return <StatHelpText color="orange.400">Low dependency</StatHelpText>;
  }
  if (g < 0) {
    return <StatHelpText color="red.500">Anti-dependency</StatHelpText>;
  }
  return <StatHelpText color="red.400">No dependency</StatHelpText>;
};

const getGxy = (data: number[][]) => {
  let gxy = 0;

  // Сумма столбца
  const nxi: number[] = [];
  for (let i = 0; i < data[0].length; i++) {
    let n = 0;
    for (let row of data) {
      n += row[i] || 0;
    }
    nxi.push(n);
  }

  const n = nxi.reduce((acc, value) => acc + (value || 0), 0);

  // Максимальная сумма столбца
  const maxnxi = Math.max(...nxi);

  // Сумма максимумов в рядах
  const sumjm = data.reduce((acc, row) => acc + Math.max(...row.map((d) => d || 0)), 0);

  const dividerjm = n - maxnxi;
  if (dividerjm) {
    gxy = (sumjm - maxnxi) / dividerjm;
  }

  return { gxy, nxi, n, maxnxi, sumjm, dividerjm };
};

const getGyx = (data: number[][]) => {
  let gyx = 0;

  // Сумма ряда
  const nyj = data.map((row) => row.reduce((acc, value) => acc + (value || 0), 0));

  const n = nyj.reduce((acc, value) => acc + value, 0);

  // Максимальная сумма ряда
  const maxnyj = Math.max(...nyj);

  // Сумма максимумов в столбцах
  let sumik = 0;
  for (let i = 0; i < data[0].length; i++) {
    sumik += Math.max(...data.map((row) => row[i] || 0));
  }

  const divideryj = n - maxnyj;
  if (divideryj) {
    gyx = (sumik - maxnyj) / divideryj;
  }
  return { gyx, nyj, n, maxnyj, sumik, divideryj };
};

interface GoodmanProps {
  data: number[][];
}
const Goodman: React.FC<GoodmanProps> = ({ data }) => {
  const { gxy, sumjm, maxnxi, n } = React.useMemo(() => getGxy(data), [data]);
  const { gyx, sumik, maxnyj } = React.useMemo(() => getGyx(data), [data]);

  return (
    <Card>
      <StatGroup>
        <Stat>
          <StatLabel>
            Goodman g<sub>xy</sub>
          </StatLabel>
          <StatNumber>{gxy}</StatNumber>
          <StatHelpText>{`(${sumjm} - ${maxnxi}) / (${n} - ${maxnxi})`}</StatHelpText>
          <DependencyTag g={gxy} />
        </Stat>

        <Stat>
          <StatLabel>
            Goodman g<sub>yx</sub>
          </StatLabel>
          <StatNumber>{gyx}</StatNumber>
          <StatHelpText>{`(${sumik} - ${maxnyj}) / (${n} - ${maxnyj})`}</StatHelpText>
          <DependencyTag g={gyx} />
        </Stat>
      </StatGroup>
    </Card>
  );
};

export default Goodman;
