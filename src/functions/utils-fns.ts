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

const generateUniqueColorHex = (id: string): string => {
  // Calcolo un valore hash dell'ID usando una funzione hash (ad esempio, djb2)
  let hash = 5381;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 33) ^ id.charCodeAt(i);
  }

  // Estraggo i componenti R, G e B dal valore hash
  const r = (hash >> 16) & 255;
  const g = (hash >> 8) & 255;
  const b = hash & 255;

  // Formatto i componenti in esadecimale e li concateno
  const colorHex = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;

  return colorHex;
}


export const utilsFns = {
  removeUndefinedOrNullProps,
  logger,
  existy,
  getErrorMsgFromCatchBlock,
  generateUniqueColorHex
}
