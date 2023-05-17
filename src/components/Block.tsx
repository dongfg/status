import type { Status } from "@/typings";
import useSWR from "swr";
import Icon from "@/components/Icon";
import fetcher from "@/utils/fetcher";
import styles from "@/styles/index.module.css";

export default function Block({ data: init }: { data: Status }) {
  const { data: res } = useSWR<Status>(`/api/check?id=${init.id}`, fetcher, {
    refreshInterval: 200000,
  });
  const data = res || init;

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
        <Icon type={data.icon || "icon-wangluo"} style={{ fontSize: "32px" }} />
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
