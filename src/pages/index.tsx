import { MonitorStatus, Config, Status } from "@/typings";
import { promises as fs } from "fs";
import Group from "@/components/Group";
import Block from "@/components/Block";
import TextBlock from "@/components/TextBlock";
import styles from "@/styles/index.module.css";

export default function Home({ data }: { data: Status[] }) {
  return (
    <main className={styles.main}>
      {data?.map((s, i) => {
        if (s.type === "GROUP") {
          return <Group key={i} data={s} />;
        }
        if (s.type === "TEXT") {
          return <TextBlock key={i} data={s} />;
        }
        return <Block key={i} data={s} />;
      })}
    </main>
  );
}

export async function getStaticProps() {
  const data = await fs.readFile(process.cwd() + "/public/config.json", "utf8");
  const config = JSON.parse(data) as Config[];
  const initStatus = config.map<Status>((c) => {
    return {
      ...c,
      status: MonitorStatus.Unknown,
      children:
        c.children?.map<Status>((cl) => {
          const { children: _, ...rest } = cl;
          return { ...rest, status: MonitorStatus.Unknown };
        }) || null,
    };
  });
  return {
    props: {
      data: initStatus,
    },
  };
}
