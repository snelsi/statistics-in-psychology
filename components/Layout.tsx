import * as React from "react";
import styled from "@emotion/styled";
import Head from "next/head";

interface WrapperProps {
  sidebarWidth?: string;
}
const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: ${({ sidebarWidth = "340px" }) => sidebarWidth} minmax(0, 1fr);
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
  padding: 1.5rem 1rem 1rem;
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
  layoutColumns?: string;
}
const Graphs = styled.div<GraphsProps>`
  background-color: #fafafa;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  & > div {
    display: grid;
    gap: 1.25rem;
    grid-template-rows: ${({ layoutRows = "auto" }) => layoutRows};
    grid-template-columns: ${({ layoutColumns = "minmax(0, 1fr)" }) => layoutColumns};
    height: fit-content;
    padding: 1.25rem;
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;

    & .chakra-fade {
      display: block;
      max-width: 100%;
      overflow: hidden;
      width: 100%;
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

interface LayoutProps extends GraphsProps {
  title?: string;
  sidebar?: React.ReactNode;
  sidebarWidth?: string;
}
const Layout: React.FC<LayoutProps> = ({
  title = "Математичнi методи в психологiї",
  sidebar = null,
  children,
  layoutRows,
  layoutColumns,
  sidebarWidth,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Wrapper sidebarWidth={sidebarWidth}>
      <Sidebar>
        <div>{sidebar}</div>
      </Sidebar>
      <Graphs layoutRows={layoutRows} layoutColumns={layoutColumns}>
        <div>{children}</div>
      </Graphs>
    </Wrapper>
  </>
);

export default Layout;
