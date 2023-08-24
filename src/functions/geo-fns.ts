import { Geometry } from 'wkx';


const parseGeoPoint = (geoPoint: string) => {
  const { x: lng, y: lat } = Geometry.parse(Buffer.from(geoPoint, 'hex')) as any;
  return { lat, lng };
}


export const geoFns = {
  parseGeoPoint,
}