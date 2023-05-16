import type { Config } from "@/typings";
import { promises as fs } from "fs";
import Icon from "@/components/Icon";
import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";

const gridArea12 = `auto / auto / span 1 / span 2`;
const gridArea21 = `auto / auto / span 2 / span 1`;

export default function Home({ data }: { data: Config[] }) {
  const [percent, setPercent] = useState<number>(100);
  const [checking, setChecking] = useState([1, 5, 11]);
  useEffect(() => {
    if (percent === 0) {
      setChecking([]);
      return;
    }
    const timer = setTimeout(() => {
      setPercent((percent - 0.5) % 100);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [percent]);

  return (
    <main className={styles.main}>
      {data?.map((c, i) => (
        <div
          key={i}
          className={`${styles.block} ${
            i % 5 !== 0
              ? styles.success
              : i % 6 !== 0
              ? styles.warning
              : styles.failed
          }`}
          style={{
            gridArea: i === 3 ? gridArea21 : i === 7 ? gridArea12 : "inherit",
          }}
        >
          <span className={styles.header}>{c.title}</span>
          <div className={styles.content}>
            {i % 4 === 0 ? `13.37%` : `94ms`}
          </div>
          <div className={styles.footer}>
            {c.icon ? (
              <Icon type={c.icon} style={{ fontSize: "32px" }} />
            ) : null}
            {checking.includes(i) ? `checking` : `${i}/6`}
          </div>
          {checking.includes(i) ? (
            <div className={styles.progress}>
              <div
                className={styles.processBar}
                style={{ transform: `translateX(-${percent}%)` }}
              ></div>
            </div>
          ) : null}
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
