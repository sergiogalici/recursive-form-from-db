export const simpleForm: FormType = {
    form: [
        {
            type: "input",
            id: "firstName"
        },
        {
            type: "input",
            id: "lastName"
        },
        {
            type: "select",
            id: "favouriteCuisine",
            children: [
                {
                    type: "option",
                    id: "italian"
                },
                {
                    type: "option",
                    id: "mexican"
                },
                {
                    type: "option",
                    id: "thai"
                }
            ]
        }
    ]
  }


export type FieldType = {
    type: "input" | "select" | "checkbox" | "option"
    id: string
    children?: FieldType[]
}

export type FormType = {
    form: FieldType[]
}