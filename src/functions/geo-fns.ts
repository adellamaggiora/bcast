import { Geometry } from 'wkx';

const getCurrentPosition = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  } else {
    reject("Geolocation not supported!");
  }
})

const parseGeoPoint = (geoPoint: string) => {
  const { x: lng, y: lat } = Geometry.parse(Buffer.from(geoPoint, 'hex')) as any;
  return { lat, lng };
}


export const geoFns = {
  getCurrentPosition,
  parseGeoPoint,
}