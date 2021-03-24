import styled from "@emotion/styled";
import { StatGroup } from "@chakra-ui/react";

const StyledStatGroup = styled(StatGroup)`
  align-items: center;
  background: var(--chakra-colors-gray-50);
  border-radius: 8px;
  flex-wrap: wrap;
  padding: 1rem;
  & .chakra-stat {
    min-width: 120px;
    @media (max-width: 800px) {
      min-width: 100%;
      margin-right: 0;
    }
  }
`;

export default StyledStatGroup;
