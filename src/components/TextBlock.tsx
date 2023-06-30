import type { Status } from "@/typings";
import Icon from "@/components/Icon";
import styles from "@/styles/index.module.css";

export default function TextBlock({ data }: { data: Status }) {
  const gridArea = `auto / auto / span ${data.colSpan || 1} / span ${
    data.rowSpan || 1
  }`;
  return (
    <div
      key={data.title}
      className={`${styles.block} ${styles[data.status]}`}
      style={{
        gridArea,
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>{data.title}</div>
        {data.info ? <div className={styles.info}>{data.info}</div> : null}
      </div>
      <div className={styles.content}>{data.result || ""}</div>
      <div className={styles.footer}>
        <Icon name={data.icon || "icon-wangluo"} />
        {data.type === "CODING" ? `checking` : ``}
      </div>
      {data.type === "CODING" ? (
        <div className={styles.progress}>
          <div
            className={styles.processBar}
            style={{ transform: `translateX(-0%)` }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
