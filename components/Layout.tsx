import * as React from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Header } from ".";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  height: calc(100vh - 48px);
  overflow: hidden;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    overflow: auto;
    height: fit-content;
  }
`;

export const Sidebar = styled.div`
  box-shadow: 0 25px 56px 0 rgb(96 101 123 / 5%);
  max-width: 100%;
  height: auto;
  padding: 1rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;

  & .button-create {
    margin-top: 1rem;
  }
`;

interface GraphsProps {
  layoutRows?: string;
}
const Graphs = styled.div<GraphsProps>`
  background-color: #fafafa;
  display: grid;
  gap: 1.25rem;
  grid-template-rows: ${({ layoutRows = "auto" }) => layoutRows};
  height: auto;
  padding: 1.25rem;
  overflow: auto;
  @media (max-width: 800px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

interface LayoutProps extends GraphsProps {
  title?: string;
  sidebar?: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  title = "Математичнi методи в психологiї",
  sidebar = null,
  children,
  layoutRows,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <Wrapper>
      <Sidebar>
        <div>{sidebar}</div>
      </Sidebar>
      <Graphs layoutRows={layoutRows}>{children}</Graphs>
    </Wrapper>
  </>
);

export default Layout;
