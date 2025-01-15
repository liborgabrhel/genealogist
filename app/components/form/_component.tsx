import type { ComponentProps } from "react"
import { Form as ReactRouterForm } from "react-router"

import { ErrorMessage } from "~/components/error-message"
import { ErrorMessageGroup } from "~/components/error-message-group"

import styles from "./_styles.module.css"

type Props = {
  errors?: string[]
} & ComponentProps<typeof ReactRouterForm>

export const Form = ({ children, errors, ...rest }: Props) => {
  return (
    <ReactRouterForm className={styles.form} {...rest}>
      <ErrorMessageGroup>
        {errors?.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
      </ErrorMessageGroup>
      {children}
    </ReactRouterForm>
  )
}
