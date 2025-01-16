import type { ReactNode } from "react"

import styles from "./_styles.module.css"

type Props = {
  children: ReactNode
}

export const PageHeader = ({ children }: Props) => {
  return <header className={styles.header}>{children}</header>
}
