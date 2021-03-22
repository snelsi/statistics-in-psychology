import * as React from "react";
import styled from "@emotion/styled";
import { Heading } from "@chakra-ui/react";

const CardBase = styled.div`
  background-color: #fff;
  border-width: 1px;
  border-radius: 12px;
  height: fit-content;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

interface CardProps {
  title?: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ title, className, children, ...props }) => {
  return (
    <CardBase {...props}>
      {!!title && (
        <Heading as="h3" size="lg" mb="1rem" fontWeight="600">
          {title}
        </Heading>
      )}
      {children}
    </CardBase>
  );
};
export default Card;
