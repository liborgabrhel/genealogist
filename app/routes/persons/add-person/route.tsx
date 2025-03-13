// noinspection JSUnusedGlobalSymbols

import {
  getFormProps,
  getInputProps,
  getSelectProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
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
  const { events } = loaderData

  const [form, fields] = useForm({
    id: "add-person",
    constraint: getZodConstraint(schema),
    lastResult: actionData?.submissionResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  })

  const eventsToCreate = fields.eventsToCreate.getFieldList()

  return (
    <Page>
      <PageHeader>
        <h2>Add Person</h2>
      </PageHeader>
      <PageBody>
        <Form {...getFormProps(form)} errors={form.errors} method={"post"}>
          <Fieldset className={styles.col2}>
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
            <Input
              label={"Birth Last Name"}
              errors={fields.birthLastName.errors}
              {...getInputProps(fields.birthLastName, { type: "text" })}
            />
          </Fieldset>

          <Fieldset className={styles.col1}>
            <Input
              label={"Is Alive"}
              errors={fields.isAlive.errors}
              {...getInputProps(fields.isAlive, { type: "checkbox" })}
            />
          </Fieldset>

          <Fieldset className={styles.col2}>
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

          <Fieldset className={styles.col1}>
            <TextArea
              label={"Note"}
              errors={fields.note.errors}
              {...getTextareaProps(fields.note)}
            />
          </Fieldset>

          <section>
            <h3>Events</h3>

            {events.length > 0 ? (
              <Fieldset>
                <select
                  multiple={true}
                  {...getSelectProps(fields.eventsToConnect)}
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} {event?.date ? `(${event.date})` : ""}
                    </option>
                  ))}
                </select>
              </Fieldset>
            ) : (
              <p>No events available to link.</p>
            )}

            <section>
              {eventsToCreate.map((newEvent, index) => {
                const eventFieldset = newEvent.getFieldset()

                return (
                  <Fieldset key={newEvent.key} className={styles.col2}>
                    <Input
                      label={"Name"}
                      errors={eventFieldset.name.errors}
                      {...getInputProps(eventFieldset.name, { type: "text" })}
                    />
                    <Input
                      label={"Type"}
                      errors={eventFieldset.type.errors}
                      {...getInputProps(eventFieldset.type, { type: "text" })}
                    />
                    <Input
                      label={"Date"}
                      errors={eventFieldset.date.errors}
                      {...getInputProps(eventFieldset.date, { type: "date" })}
                    />
                    <Input
                      label={"Place"}
                      errors={eventFieldset.place.errors}
                      {...getInputProps(eventFieldset.place, { type: "text" })}
                    />
                    <TextArea
                      label={"Note"}
                      errors={eventFieldset.note.errors}
                      {...getTextareaProps(eventFieldset.note)}
                    />
                    <button
                      {...form.remove.getButtonProps({
                        name: fields.eventsToCreate.name,
                        index,
                      })}
                    >
                      Delete
                    </button>
                  </Fieldset>
                )
              })}
            </section>

            <button
              {...form.insert.getButtonProps({
                name: fields.eventsToCreate.name,
              })}
            >
              Add Event
            </button>
          </section>

          <button type="submit">Create</button>
          <Link to={"/persons"}>Cancel</Link>
        </Form>
      </PageBody>
    </Page>
  )
}

export { action } from "./_action"
export { loader } from "./_loader"
export { meta } from "./_meta"
