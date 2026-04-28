export type ContactMethod = 'email' | 'none'

export type SignupForm = {
  name: string
  email: string
  age: number | null
  contactMethod: ContactMethod
  acceptsTerms: boolean
}

export type SignupField = keyof SignupForm

export type ValidationError = {
  field: SignupField
  message: string
}

export type ValidationResult<T> =
  | {
      ok: true
      value: T
    }
  | {
      ok: false
      errors: ValidationError[]
    }

export const initialSignupForm: SignupForm = {
  name: '',
  email: '',
  age: null,
  contactMethod: 'email',
  acceptsTerms: false,
}

const getTextValue = (formData: FormData, field: string): string => {
  const value = formData.get(field)

  return typeof value === 'string' ? value : ''
}

const parseContactMethod = (value: string): ContactMethod =>
  value === 'email' ? 'email' : 'none'

const parseAge = (value: string): number | null => {
  if (value.trim() === '') {
    return null
  }

  const parsedAge = Number(value)

  return Number.isNaN(parsedAge) ? null : parsedAge
}

export const parseSignupForm = (formData: FormData): SignupForm => ({
  name: getTextValue(formData, 'name'),
  email: getTextValue(formData, 'email'),
  age: parseAge(getTextValue(formData, 'age')),
  contactMethod: parseContactMethod(getTextValue(formData, 'contactMethod')),
  acceptsTerms: formData.get('acceptsTerms') === 'on',
})

export const validateSignupForm = (
  form: SignupForm,
): ValidationResult<SignupForm> => {
  const errors: ValidationError[] = []
  const name = form.name.trim()
  const email = form.email.trim()

  if (name.length === 0) {
    errors.push({
      field: 'name',
      message: 'Name is required.',
    })
  }

  if (!email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Email must include @.',
    })
  }

  if (form.age === null) {
    errors.push({
      field: 'age',
      message: 'Age must be a number.',
    })
  } else if (form.age < 18) {
    errors.push({
      field: 'age',
      message: 'Age must be 18 or older.',
    })
  }

  if (!form.acceptsTerms) {
    errors.push({
      field: 'acceptsTerms',
      message: 'Terms must be accepted.',
    })
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    }
  }

  return {
    ok: true,
    value: {
      ...form,
      name,
      email,
    },
  }
}
