import * as React from "react";
import { Stat, StatLabel, StatNumber, SimpleGrid, Heading } from "@chakra-ui/react";
import { Card, StyledStatGroup } from "components";
import { roundTo } from "utils";
import { useRanges, IData } from "./Hypotheses";

interface ArraysDataProps {
  data: [IData, IData];
}
const ArraysData: React.FC<ArraysDataProps> = ({ data }) => {
  const ranges = useRanges(data);

  const x_m = ranges[0].avg;
  const y_m = ranges[1].avg;
  const s2x = ranges[0].dispers;
  const s2y = ranges[1].dispers;

  return (
    <Card>
      <SimpleGrid gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="1rem">
        <div>
          <Heading as="h4" size="md" mb="1rem" fontWeight="600">
            Array 1
          </Heading>
          <StyledStatGroup mb="1rem">
            <Stat mr="2rem">
              <StatLabel>Average value</StatLabel>
              <StatNumber title={String(x_m)}>{roundTo(x_m, 3)}</StatNumber>
            </Stat>
            <Stat mr="2rem">
              <StatLabel>Squared dispersion</StatLabel>
              <StatNumber title={String(s2x)}>{roundTo(s2x, 3)}</StatNumber>
            </Stat>
          </StyledStatGroup>
        </div>
        <div>
          <Heading as="h4" size="md" mb="1rem" fontWeight="600">
            Array 2
          </Heading>
          <StyledStatGroup mb="1rem">
            <Stat mr="2rem">
              <StatLabel>Average value</StatLabel>
              <StatNumber title={String(y_m)}>{roundTo(y_m, 3)}</StatNumber>
            </Stat>
            <Stat mr="2rem">
              <StatLabel>Squared dispersion</StatLabel>
              <StatNumber title={String(s2y)}>{roundTo(s2y, 3)}</StatNumber>
            </Stat>
          </StyledStatGroup>
        </div>
      </SimpleGrid>
    </Card>
  );
};

export default ArraysData;
