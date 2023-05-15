import { promises as fs } from "fs";
import type { Config } from "@/typings";
import styles from "@/styles/Home.module.css";

export default function Home({ data }: { data: Config[] }) {
  const gridArea12 = `auto / auto / span 1 / span 2`;
  const gridArea21 = `auto / auto / span 2 / span 1`;

  return (
    <main className={styles.main}>
      {data?.map((c, i) => (
        <div
          key={i}
          className={`${styles.block} ${
            i % 5 !== 0 ? styles.success : styles.warning
          }`}
          style={{
            gridArea: i === 3 ? gridArea21 : i === 7 ? gridArea12 : "inherit",
          }}
        >
          <span>{c.type}</span>
          <span>{c.title}</span>
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const data = await fs.readFile(process.cwd() + "/config.json", "utf8");
  return {
    props: {
      data: JSON.parse(data),
    },
  };
}
