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

const base64ToFile = (base64Data: string, filename: string): File => {
  // Split the base64 string into data and mimeType
  const parts = base64Data.split(';base64,');
  const mimeType = parts[0].split(':')[1];
  const byteCharacters = atob(parts[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
}



export const utilsFns = {
  removeUndefinedOrNullProps,
  logger,
  existy,
  getErrorMsgFromCatchBlock,
  base64ToFile
}
