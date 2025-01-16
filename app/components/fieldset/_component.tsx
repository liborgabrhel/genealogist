import { combineClasses } from "@liborgabrhel/style-utils"
import type { ComponentProps } from "react"

import styles from "./_styles.module.css"

type Props = ComponentProps<"fieldset">

export const Fieldset = ({ children, className, ...rest }: Props) => {
  return (
    <fieldset className={combineClasses(styles.fieldset, className)} {...rest}>
      {children}
    </fieldset>
  )
}
