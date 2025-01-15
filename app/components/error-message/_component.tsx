import styles from "./_styles.module.css"

type Props = {
  children: string
}

export const ErrorMessage = ({ children }: Props) => {
  return <div className={styles.errorMessage}>{children}</div>
}
