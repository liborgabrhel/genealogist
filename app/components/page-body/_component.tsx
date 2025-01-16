import type { ReactNode } from "react"

import styles from "./_styles.module.css"

type Props = {
  children: ReactNode
}

export const PageBody = ({ children }: Props) => {
  return <section className={styles.pageBody}>{children}</section>
}
