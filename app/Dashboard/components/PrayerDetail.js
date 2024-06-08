import { Coordinates, CalculationMethod } from "adhan";
// import { getSession } from "next-auth/react";
import { GetApiCall, getTimezone } from "../../api/apiCalls";
import moment from "moment-timezone";

export async function PrayerDetail(id) {
  return new Promise(async (resolve, reject) => {
    let latitude, longitude, userCustomPrayerTimings, mosqName;

    // const session = await getSession();
    const checkMethod = `users/${id}?fields=location&fields=mosqName`; // userID
    const placeData = await GetApiCall(checkMethod, process.env.DEV_API_TOKEN); //jwt
    if (placeData?.location) {
      const userCustomPrayerTime = `prayer-times?&filters[user][id][$eq]=${id}`; // userID
      const { data, status } = await GetApiCall(userCustomPrayerTime, process.env.DEV_API_TOKEN);
      latitude = placeData?.location?.latitude;
      longitude = placeData?.location?.longitude;
      mosqName = placeData?.mosqName;
      userCustomPrayerTimings = data[0]?.attributes;
    } else {
      // Default to current location if no custom location is provided
      if (navigator?.geolocation) {
        try {
          const position = await new Promise((res, rej) => {
            navigator?.geolocation.getCurrentPosition(res, rej);
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch (error) {
          reject(new Error("Error getting current location."));
          return;
        }
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
    }
    try {
      // Use default location (current location) if custom location is not provided
      // const coordinates = new Coordinates(latitude, longitude);
      const params = CalculationMethod.UmmAlQura();

      const timeZoneDetails = await getTimezone(latitude, longitude);
      const timeZoneDate = moment.tz(new Date(), timeZoneDetails); // Bhopal uses the same timezone as Kolkata
      const date = timeZoneDate.toDate();
      const prayerTimingsData = {
        userCustomPrayerTimings: userCustomPrayerTimings,
        date: date,
        timeZoneDetails: timeZoneDetails,
        coordinates: new Coordinates(latitude, longitude),
        params: params,
        mosqName: mosqName ? mosqName : null,
      };
      resolve(prayerTimingsData);
    } catch (error) {
      console.log(error);
      reject(new Error("Error calculating prayer times."));
    }
  });
}
