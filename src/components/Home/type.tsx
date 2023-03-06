export type group = {
    contact: {
      countryCode: string,
      digits: string,
      id: string,
      label: string,
      number: string,
    }[],
    letter: string
}
export type content = {
    contact: {
      countryCode: string,
      digits: string,
      id: string,
      label: string,
      number: string,
    },
    letter?: string
}