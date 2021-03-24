import * as React from "react";

export const useN = (data: { x: number; y: number }[]) => {
  const n = React.useMemo(() => data?.reduce((acc, { y }) => acc + y, 0) || 0, [data]);
  return n;
};

export const useStats = (data: { x: number; y: number }[]) => {
  const n = useN(data);

  const stats = React.useMemo(() => {
    if (!data || data.length === 0) return undefined;
    const stats = new Map<number, number[]>();
    data.forEach(({ x, y }) => {
      const statsX = stats.get(x);
      if (statsX) {
        stats.set(x, [...statsX, y]);
      } else {
        stats.set(x, [y]);
      }
    });
    return Array.from(stats.entries()).map(([x, values]) => {
      const sum = values.reduce((acc, v) => acc + v, 0);
      return {
        x,
        average: sum / values.length,
        ni: sum / n,
      };
    });
  }, [data, n]);
  return stats;
};
