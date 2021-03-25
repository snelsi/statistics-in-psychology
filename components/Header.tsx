import * as React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconButton, Tabs, TabList, Tab } from "@chakra-ui/react";
import { BsTriangleFill } from "react-icons/bs";

const Wrapper = styled.header`
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  height: 48px;
  padding: 0 1.5rem;
  position: relative;
  overflow: auto;
  z-index: 2;
  & > nav {
    align-items: center;
    display: flex;
    height: 48px;
    margin: auto;
    & a {
      cursor: pointer;
    }
    & .chakra-tabs__tablist {
      --chakra-colors-blue-600: #0070f3;
      border-color: transparent;
    }
    & .chakra-tabs__tab {
      height: 48px;
      line-height: 1.2;
      font-size: 1.25rem;
      font-weight: 600;
      padding-left: 2px;
      padding-right: 2px;
      margin-right: 20px;
    }
    & .home {
      cursor: pointer;
      margin-right: 1.5rem;
      font-size: 1.25rem;
      height: 40px;
    }
  }
`;

const getCurrentIndex = (pathname: string) => {
  if (pathname === "/lab-4") return 3;
  if (pathname === "/lab-3") return 2;
  if (pathname === "/lab-2") return 1;
  if (pathname === "/lab-1" || pathname === "/lab-1-alt") return 0;
  return null;
};

const Header = () => {
  const router = useRouter();

  const index = getCurrentIndex(router.pathname);

  return (
    <Wrapper>
      <nav>
        <IconButton
          icon={<BsTriangleFill />}
          aria-label="home"
          variant="ghost"
          as="a"
          href="http://snelsi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="home"
        />

        <Tabs isManual index={index}>
          <TabList>
            <Link href="/lab-1" passHref>
              <Tab as="a">Goodman</Tab>
            </Link>
            <Link href="/lab-2" passHref>
              <Tab as="a">Kendall</Tab>
            </Link>
            <Link href="/lab-3" passHref>
              <Tab as="a">Intervals</Tab>
            </Link>
            <Link href="/lab-4" passHref>
              <Tab as="a">Hypotheses</Tab>
            </Link>
          </TabList>
        </Tabs>
      </nav>
    </Wrapper>
  );
};

export default Header;
