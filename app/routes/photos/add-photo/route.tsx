// noinspection JSUnusedGlobalSymbols

import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { useState } from "react"
import { Link } from "react-router"

import { Fieldset } from "~/components/fieldset"
import { Form } from "~/components/form"
import { Input } from "~/components/input"
import { Page } from "~/components/page"
import { PageBody } from "~/components/page-body"
import { PageHeader } from "~/components/page-header"
import { TextArea } from "~/components/text-area"

import type { Route } from "./+types/route"
import { schema } from "./_schema"
import styles from "./_styles.module.css"

export default function Route({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { types, persons } = loaderData

  const [form, fields] = useForm({
    id: "add-person",
    constraint: getZodConstraint(schema),
    lastResult: actionData?.submissionResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  })

  const [isCreateNewTypeVisible, setIsCreateNewTypeVisible] = useState(
    types.length === 0
  )

  const showCreateNewType = () => {
    setIsCreateNewTypeVisible(true)
  }

  const hideCreateNewType = () => {
    setIsCreateNewTypeVisible(false)
  }

  const typeToCreate = fields.typeToCreate.getFieldset()

  return (
    <Page>
      <PageHeader>
        <h2>Add Photo</h2>
      </PageHeader>
      <PageBody>
        <Form
          {...getFormProps(form)}
          method={"post"}
          encType={"multipart/form-data"}
        >
          <Fieldset className={styles.col2}>
            <Input
              label={"Name"}
              errors={fields.name.errors}
              {...getInputProps(fields.name, { type: "text" })}
            />
            <Input
              label={"Description"}
              errors={fields.description.errors}
              {...getInputProps(fields.description, { type: "text" })}
            />
          </Fieldset>

          <Fieldset>
            {isCreateNewTypeVisible ? (
              <section>
                {types.length > 0 && (
                  <button type={"button"} onClick={hideCreateNewType}>
                    Use Existing Type
                  </button>
                )}
                <Input
                  label={"Type Name"}
                  errors={typeToCreate.name.errors}
                  {...getInputProps(typeToCreate.name, { type: "text" })}
                />
              </section>
            ) : (
              <section>
                <button type={"button"} onClick={showCreateNewType}>
                  Create New Type
                </button>
                <select {...getSelectProps(fields.typeToConnect)}>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </section>
            )}
          </Fieldset>

          <Fieldset>
            <Input
              label={"File"}
              errors={fields.file.errors}
              accept={"image/*"}
              {...getInputProps(fields.file, { type: "file" })}
            />
          </Fieldset>
          <Fieldset>
            <TextArea
              label={"Note"}
              errors={fields.note.errors}
              {...getInputProps(fields.note, { type: "text" })}
            />
          </Fieldset>
          <Fieldset>
            {persons.length > 0 ? (
              <select
                multiple={true}
                {...getSelectProps(fields.personsToConnect)}
              >
                {persons.map((person) => {
                  return (
                    <option key={person.id} value={person.id}>
                      {person.firstName} {person.lastName}
                    </option>
                  )
                })}
              </select>
            ) : (
              <p>No persons to connect</p>
            )}
          </Fieldset>

          <button type={"submit"}>Submit</button>
          <Link to={"/photos"}>Cancel</Link>
        </Form>
      </PageBody>
    </Page>
  )
}

export { action } from "./_action"
export { loader } from "./_loader"
export { meta } from "./_meta"
