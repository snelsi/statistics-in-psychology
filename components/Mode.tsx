import * as React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from "@chakra-ui/react";
import { Card } from "components";

interface ModeProps {
  data: { x: number }[];
}
const Mode: React.FC<ModeProps> = ({ data }) => {
  const stats = React.useMemo(() => {
    const stats = new Map<number, number>();

    data.forEach(({ x }) => {
      if (stats.has(x)) {
        const i = stats.get(x) || 0;
        stats.set(x, i + 1);
      } else {
        stats.set(x, 1);
      }
    });

    return Array.from(stats.entries())
      .map(([x, frequency]) => ({ x, frequency }))
      .sort((a, b) => b.frequency - a.frequency);
  }, [data]);

  const mode = stats.filter((stat) => stat.frequency === stats[0].frequency);
  const antimode = stats.filter((stat) => stat.frequency === stats[stats.length - 1].frequency);

  const halfLength = Math.ceil(data.length / 2);
  const left = data[halfLength - 1].x;
  const right = data[halfLength].x;

  const mid = Math.ceil(data.length / 2);

  const median = data.length % 2 ? data[mid - 1].x : (data[mid].x + data[mid - 1].x) / 2;

  return (
    <Card>
      <StatGroup>
        <Stat mr="2rem">
          <StatLabel>Mode</StatLabel>
          <StatNumber>{mode.map((m) => m.x).join(", ")}</StatNumber>
          <StatHelpText>{mode[0].frequency} times</StatHelpText>
        </Stat>

        <Stat mr="2rem">
          <StatLabel>Anti-Mode</StatLabel>
          {stats[0].frequency === stats[stats.length - 1].frequency ? (
            <StatNumber>-</StatNumber>
          ) : (
            <>
              <StatNumber>{antimode.map((m) => m.x).join(", ")}</StatNumber>
              <StatHelpText>{antimode[0].frequency} times</StatHelpText>
            </>
          )}
        </Stat>

        <Stat>
          <StatLabel>Median</StatLabel>
          <StatNumber>{median}</StatNumber>
          {data.length % 2 === 0 && left !== right && (
            <StatHelpText as="span">
              ({data[halfLength - 1].x}/{data[halfLength].x})
            </StatHelpText>
          )}
        </Stat>
      </StatGroup>
    </Card>
  );
};

export default Mode;
