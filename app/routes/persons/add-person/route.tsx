// noinspection JSUnusedGlobalSymbols

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"

import { Fieldset } from "~/components/fieldset"
import { Form } from "~/components/form"
import { Input } from "~/components/input"
import { Page } from "~/components/page"
import { PageBody } from "~/components/page-body"
import { PageHeader } from "~/components/page-header"
import { TextArea } from "~/components/text-area"

import type { Route } from "./+types/route"
import { schema } from "./_schema"

export default function Route({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    id: "add-person",
    constraint: getZodConstraint(schema),
    lastResult: actionData?.submissionResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  })

  return (
    <Page>
      <PageHeader>
        <h2>Add Person</h2>
      </PageHeader>
      <PageBody>
        <Form {...getFormProps(form)} errors={form.errors} method={"post"}>
          <Fieldset>
            <Input
              label={"First Name"}
              errors={fields.firstName.errors}
              {...getInputProps(fields.firstName, { type: "text" })}
            />
            <Input
              label={"Last Name"}
              errors={fields.lastName.errors}
              {...getInputProps(fields.lastName, { type: "text" })}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={"Birth Last Name"}
              errors={fields.birthLastName.errors}
              {...getInputProps(fields.birthLastName, { type: "text" })}
            />
            <Input
              label={"Birth Date"}
              errors={fields.birthDate.errors}
              {...getInputProps(fields.birthDate, { type: "date" })}
            />
            <Input
              label={"Birth Place"}
              errors={fields.birthPlace.errors}
              {...getInputProps(fields.birthPlace, { type: "text" })}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={"Death Date"}
              errors={fields.deathDate.errors}
              {...getInputProps(fields.deathDate, { type: "date" })}
            />
            <Input
              label={"Death Place"}
              errors={fields.deathPlace.errors}
              {...getInputProps(fields.deathPlace, { type: "text" })}
            />
            <Input
              label={"Cause Of Death"}
              errors={fields.causeOfDeath.errors}
              {...getInputProps(fields.causeOfDeath, { type: "text" })}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={"Is Alive"}
              errors={fields.isAlive.errors}
              {...getInputProps(fields.isAlive, { type: "checkbox" })}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={"Gender"}
              errors={fields.gender.errors}
              {...getInputProps(fields.gender, { type: "text" })}
            />
            <Input
              label={"Nationality"}
              errors={fields.nationality.errors}
              {...getInputProps(fields.nationality, { type: "text" })}
            />
            <Input
              label={"Ethnicity"}
              errors={fields.ethnicity.errors}
              {...getInputProps(fields.ethnicity, { type: "text" })}
            />
            <Input
              label={"Religious Affiliation"}
              errors={fields.religiousAffiliation.errors}
              {...getInputProps(fields.religiousAffiliation, { type: "text" })}
            />
          </Fieldset>

          <Fieldset>
            <TextArea
              label={"Note"}
              errors={fields.note.errors}
              {...getTextareaProps(fields.note)}
            />
          </Fieldset>

          <button type="submit">Create</button>
        </Form>
      </PageBody>
    </Page>
  )
}

export { action } from "./_action"
export { meta } from "./_meta"
