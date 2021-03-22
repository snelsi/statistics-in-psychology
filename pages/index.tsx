import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "components";

export default function Page() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/lab-1");
  }, []);

  return <Layout title="Лабораторна 1" />;
}
