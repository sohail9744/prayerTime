// prayerTimesUtils.js
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  SunnahTimes,
} from "adhan";
import { getSession } from "next-auth/react";
import { GetApiCall, getTimezone } from "../../api/apiCalls";
import moment from "moment-timezone";

export async function PrayerDetail() {
  return new Promise(async (resolve, reject) => {
    let latitude, longitude, userCustomPrayerTimings;

    const session = await getSession();
    const checkMethod = `users/${session?.id}?fields=location`;
    const { location } = await GetApiCall(checkMethod, session?.jwt);
    const userCustomPrayerTime = `prayer-times?&filters[user][id][$eq]=${session?.id}`;
    const { data, status } = await GetApiCall(
      userCustomPrayerTime,
      session?.jwt
    );
    if (location) {
      latitude = location?.latitude;
      longitude = location?.longitude;
      userCustomPrayerTimings = data[0]?.attributes;
    } else {
      // Default to current location if no custom location is provided
      if (navigator.geolocation) {
        try {
          const position = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
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
      const params = CalculationMethod.MoonsightingCommittee();

      const timeZoneDetails = await getTimezone(latitude, longitude);

      const timeZoneDate = moment.tz(new Date(), timeZoneDetails); // Bhopal uses the same timezone as Kolkata
      const date = timeZoneDate.toDate();
      const prayerTimingsData = {
        userCustomPrayerTimings: userCustomPrayerTimings,
        date: date,
        timeZoneDetails: timeZoneDetails,
        coordinates: new Coordinates(latitude, longitude),
        params: params,
      };
      resolve(prayerTimingsData);
    } catch (error) {
      console.log(error);
      reject(new Error("Error calculating prayer times."));
    }
  });
}
