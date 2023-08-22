const removeUndefinedOrNullProps = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) =>
      value !== undefined && value !== null
    )
  )
}

const logger = (label: any) => (data: any) => { console.log(`[${label}]:: ${JSON.stringify(data)}`); return data };

const existy = (el: any) => el !== null && el !== undefined;

const getErrorMsgFromCatchBlock = (error: any) => {
  let message: string;
  if (typeof error === 'string') {
    message = error;
  }
  else {
    message = error?.message || error?.error || 'Unknown error';
  }
  return message;
};


export const utilsFns = {
  removeUndefinedOrNullProps,
  logger,
  existy,
  getErrorMsgFromCatchBlock
}
