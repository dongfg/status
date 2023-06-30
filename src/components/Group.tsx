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
      key={data.id}
      className={`${styles.block} ${styles[data.status]}`}
      style={{
        gridArea,
      }}
    >
      {data.title ? (
        <div className={styles.header}>
          <div className={styles.title}>{data.title}</div>
          {data.info ? <div className={styles.info}>{data.info}</div> : null}
        </div>
      ) : null}
      <div className={styles.group}>
        {(data.children || []).map(({ id, title, result, status }) => (
          <div className={`${styles.item} ${styles[status]}`} key={id}>
            <div className={styles.header}>{title}</div>
            <div className={styles.content}>{result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
