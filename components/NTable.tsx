import * as React from "react";
import styled from "@emotion/styled";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStats } from "utils";

const Wrapper = styled.div`
  height: 120px;
  width: 100%;
  overflow: auto;
  & table {
    width: fit-content;
  }
`;

interface NTableProps {
  data: { x: number; y: number }[];
}
const NTable: React.FC<NTableProps> = ({ data, ...props }) => {
  const stats = useStats(data);

  return (
    <Wrapper {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={stats}
          margin={{
            top: 20,
            right: 20,
            bottom: 10,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="x" />
          <YAxis type="number" dataKey="ni" name="ni" />
          <Tooltip />
          <Bar dataKey="ni" fill="#4dd28e" />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default NTable;
