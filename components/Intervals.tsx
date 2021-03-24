import * as React from "react";
import styled from "@emotion/styled";
import { Range, useThumbOverlap, getTrackBackground } from "react-range";
import { FiPlus, FiMinus } from "react-icons/fi";
import {
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Fade,
} from "@chakra-ui/react";
import { Card, StyledStatGroup } from "components";
import { roundTo } from "utils";

interface AsymmetryTagProps {
  A: number;
}
const AsymmetryTag: React.FC<AsymmetryTagProps> = ({ A }) => {
  if (A > 0) {
    return <StatHelpText>Right asymmetry</StatHelpText>;
  }
  if (A < 0) {
    return <StatHelpText>Left asymmetry</StatHelpText>;
  }
  return <StatHelpText>No asymmetry</StatHelpText>;
};

const StyledFlex = styled(Flex)`
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;

    & h3 {
      margin-bottom: 1rem;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Track = styled.div`
  height: 36px;
  display: flex;
  width: 100%;
  & > div {
    align-self: center;
    border-radius: 4px;
    height: 5px;
    width: 100%;
  }
`;
const Thumb = styled.div`
  --thumb-size: 36px;
  height: var(--thumb-size);
  width: var(--thumb-size);
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
  & > div.thumb-block {
    height: 16px;
    width: 5px;
    background-color: #ccc;
    &[data-is-dragged="true"] {
      background-color: #548bf4;
    }
  }
`;
const ThumbLabelWrapper = styled.div`
  display: block;
  position: absolute;
  top: -28px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  padding: 4px;
  border-radius: 4px;
  background-color: #548bf4;
  white-space: nowrap;
`;

const COLORS = ["#276EF1", "#9CBCF8", "#3369ce"];

const getColors = (values: number): string[] => {
  const activeColors: string[] = [];

  for (let i = 0; i + 1 < values; i++) {
    activeColors.push(COLORS[i % COLORS.length]);
  }

  return ["#ccc", ...activeColors, "#ccc"];
};

const ThumbLabel = ({
  rangeRef,
  values,
  index,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number;
}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index);
  return (
    <ThumbLabelWrapper data-label={index} style={style as React.CSSProperties}>
      {labelValue}
    </ThumbLabelWrapper>
  );
};

interface IntervalsProps {
  data: number[];
  values: number[];
  setValues: (data: number[]) => void;
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  showStats?: boolean;
}
const Intervals: React.FC<IntervalsProps> = ({
  data,
  values,
  setValues,
  title,
  min = 0,
  max = 100,
  step = 0.1,
  showStats = true,
}) => {
  const rangeRef: any = React.useRef<Range>();

  const xmin = Math.min(...data);
  const xmax = Math.max(...data);

  const sum = data.reduce((acc, v) => acc + v, 0);
  const avg = sum / data.length;

  const n = data.length;
  const k = Math.ceil(1 + Math.log2(n));
  const h = Math.ceil((xmax - xmin) / k);
  const delta = k * h - (xmax - xmin);

  const ranges = React.useMemo(() => {
    const points = [...new Set(values)].sort((a, b) => a - b);
    const ranges = [];
    let total = 0;
    for (let i = 0; i + 1 < points.length; i++) {
      const left = points[i];
      const right = points[i + 1];
      const dots = data.filter(
        (d) => d >= left && (i === points.length - 2 ? d <= right : d < right),
      );
      const xi = (left + right) / 2;
      const xi2 = (xi - avg) ** 2 * dots.length;
      const xi3 = (xi - avg) ** 3 * dots.length;
      const xi4 = (xi - avg) ** 4 * dots.length;
      total += dots.length;
      ranges.push({
        left,
        right,
        xi,
        xi2,
        xi3,
        xi4,
        dots,
        total,
      });
    }
    return ranges;
  }, [data, values, avg]);

  const D = ranges.reduce((acc, v) => acc + v.xi2, 0) / n;
  const sigma = Math.sqrt(D);
  const sigma3 = sigma ** 3 || Number.MIN_VALUE;
  const sigma4 = sigma ** 4 || Number.MIN_VALUE;
  const m3 = ranges.reduce((acc, v) => acc + v.xi3, 0) / n;
  const m4 = ranges.reduce((acc, v) => acc + v.xi4, 0) / n;
  const A = m3 / sigma3;
  const E = m4 / sigma4 - 3;

  const calculateIntervals = () => {
    const arr = [];
    let cur = Math.max(Math.round(avg - (h * k) / 2), min);
    arr.push(cur);
    for (let i = 1; i <= k; i++) {
      cur = Math.min(cur + h, max);
      arr.push(cur);
    }

    setValues(arr);
  };
  const addInterval = () => setValues([...values, (min + max) / 2]);
  const removeInterval = () => setValues(values.slice(0, -1));

  return (
    <Fade in>
      <Card>
        <StyledFlex align="center" justify="space-between" mb="2.5rem">
          <Heading as="h3" size="lg" fontWeight="600">
            {title}
          </Heading>

          <ButtonGroup spacing="1rem">
            <Button onClick={calculateIntervals} colorScheme="blue">
              Calculate Intervals
            </Button>
            <IconButton aria-label="Add interval" onClick={addInterval} icon={<FiPlus />} />
            <IconButton
              aria-label="Remove interval"
              onClick={removeInterval}
              icon={<FiMinus />}
              disabled={values.length <= 2}
            />
          </ButtonGroup>
        </StyledFlex>

        <Wrapper key={`${data.length}-${values.length}`}>
          <Range
            allowOverlap
            values={values}
            ref={rangeRef}
            step={step}
            min={min}
            max={max}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
              <Track
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={props.style}
              >
                <div
                  ref={props.ref}
                  style={{
                    background: getTrackBackground({
                      values,
                      colors: getColors(values.length),
                      min,
                      max,
                    }),
                  }}
                >
                  {children}
                </div>
              </Track>
            )}
            renderThumb={({ props, index, isDragged }) => (
              <Thumb {...props} style={props.style}>
                <ThumbLabel rangeRef={rangeRef.current} values={values} index={index} />
                <div className="thumb-block" data-is-dragged={isDragged} />
              </Thumb>
            )}
          />
        </Wrapper>

        <Box overflow="auto" marginTop="1rem" marginBottom={showStats ? "1rem" : undefined}>
          <Table variant="simple" mb="1rem">
            <Thead>
              <Tr>
                <Th>Interval</Th>
                <Th>Frequency</Th>
                <Th>Relative Frequency</Th>
                <Th>Total Frequency</Th>
                <Th>xi2</Th>
                <Th>xi3</Th>
                <Th>xi4</Th>
              </Tr>
            </Thead>

            <Tbody>
              {ranges.map((range, i) => (
                <Tr key={i}>
                  <Td>{`[${range.left}, ${range.right}${i === ranges.length - 1 ? "]" : ")"}`}</Td>
                  <Td>{range.dots.length}</Td>
                  <Td>{`${range.dots.length} / ${n}`}</Td>
                  <Td>{`${range.total} / ${n}`}</Td>
                  <Td>{roundTo(range.xi2, 3)}</Td>
                  <Td>{roundTo(range.xi3, 3)}</Td>
                  <Td>{roundTo(range.xi4, 3)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {showStats && (
          <StyledStatGroup>
            <Stat>
              <StatLabel>Delta</StatLabel>
              <StatNumber>{delta}</StatNumber>
              <StatHelpText>{`${k} * ${h} - (${xmax} - ${xmin})`}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>h</StatLabel>
              <StatNumber>{h}</StatNumber>
              <StatHelpText>{`(${xmax} - ${xmin}) / ${k}`}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>k</StatLabel>
              <StatNumber>{k}</StatNumber>
              <StatHelpText>{`1 + log2(${n})`}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>A</StatLabel>
              <StatNumber title={`${roundTo(m3)} / ${roundTo(sigma3)}`}>{roundTo(A, 3)}</StatNumber>
              <AsymmetryTag A={A} />
            </Stat>

            <Stat>
              <StatLabel>E</StatLabel>
              <StatNumber title={String(E)}>{roundTo(E, 3)}</StatNumber>
              <StatHelpText>{`${roundTo(m4)} / ${roundTo(sigma4)} - 3`}</StatHelpText>
            </Stat>
          </StyledStatGroup>
        )}
      </Card>
    </Fade>
  );
};

export default Intervals;
