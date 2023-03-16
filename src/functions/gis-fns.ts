import { IGeoLocation } from "src/interfaces/geo-location";

const distanceBetweenPoints = (p1: IGeoLocation, p2: IGeoLocation) => {
    
    let result = 'N/A'

    if (!p1 || !p2) {
        return result;
    }

    const R = 6371;
    const lat1 = p1.lat * Math.PI / 180;
    const lat2 = p2.lat * Math.PI / 180;
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
  
    if (distance < 1) {
      const distanceMeters = Math.round(distance * 1000);
      result = `${distanceMeters} m`;
    } else {
      const distanceKm = Math.ceil(distance);
      result = `${distanceKm} Km`;
    }
  
    return result
  }

  export const gisFns = {
    distanceBetweenPoints
  }