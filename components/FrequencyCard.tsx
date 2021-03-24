import * as React from "react";
import { Wrap, WrapItem, Tag, Fade } from "@chakra-ui/react";
import { Card } from "components";

interface FrequencyCardProps {
  data: number[];
}

const FrequencyCard: React.FC<FrequencyCardProps> = ({ data }) => {
  const stats = React.useMemo(() => {
    const stats = new Map<number, number>();

    data.forEach((x) => {
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

  const frequencies = React.useMemo(() => [...new Set(stats.map((item) => item.frequency))], [
    stats,
  ]);

  return (
    <Fade in>
      <Card title="Frequency">
        <Wrap>
          {data.length ? (
            stats.map(({ x, frequency }) => {
              let colorScheme: string | undefined;
              if (frequency === frequencies[0]) {
                colorScheme = "purple";
              } else if (frequency === frequencies[1]) {
                colorScheme = "teal";
              } else if (frequency === frequencies[2]) {
                colorScheme = "yellow";
              }
              return (
                <WrapItem key={x}>
                  <Tag colorScheme={colorScheme}>{`${x} - ${frequency}`}</Tag>
                </WrapItem>
              );
            })
          ) : (
            <div>-</div>
          )}
        </Wrap>
      </Card>
    </Fade>
  );
};

export default FrequencyCard;
