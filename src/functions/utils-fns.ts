const pick = (...props: string[]) => (obj: any) =>
  props.reduce((acc, prop) => {
    if (obj.hasOwnProperty(prop)) {
      acc[prop] = obj[prop]
    }
    return acc
  }, {})

const removeUndefinedOrNullProps = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      value !== undefined && value !== null
    )
  )
}

const logger = (label: any) => (data: any) => { console.log(`${label} -> ${JSON.stringify(data)}`); return data };

const existy = (el: any) => el !== null && el !== undefined;

export const utilsFns = {
  pick,
  removeUndefinedOrNullProps,
  logger,
  existy
}
