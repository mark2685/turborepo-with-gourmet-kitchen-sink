export const normalizer = (email?: string) => {
  if (!email) throw new Error('Missing email from request body.')

  // Get the first two elements only,
  // separated by `@` from user input.
  const splitEmail = email.toLowerCase().trim().split('@')
  const [local] = splitEmail
  let [, domain] = splitEmail

  // The part before "@" can contain a ","
  // but we remove it on the domain part
  domain = domain.split(',')[0]
  return `${local}@${domain}`
}
