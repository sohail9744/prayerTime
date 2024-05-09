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

export async function getCurrentPrayerTimes() {
  return new Promise(async (resolve, reject) => {
    let latitude, longitude;

    const session = await getSession();
    const checkMethod = `users/${session?.id}?fields=location`;
    const { location } = await GetApiCall(checkMethod, session?.jwt);
    if (location) {
      latitude = location?.latitude;
      longitude = location?.longitude;
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

    // Use default location (current location) if custom location is not provided
    const coordinates = new Coordinates(latitude, longitude);
    const params = CalculationMethod.MuslimWorldLeague();

    const timeZoneDetails = await getTimezone(latitude, longitude);
    const timeZoneDate = moment.tz(new Date(), timeZoneDetails); // Bhopal uses the same timezone as Kolkata
    const date = timeZoneDate.toDate();
    const prayerTimesObj = new PrayerTimes(coordinates, date, params);
    const sunnahTimes = new SunnahTimes(prayerTimesObj);
    // Format prayer times
    try {
      const formatePrayerTime = [
        {
          name: "FAJR",
          azaanTime: moment(prayerTimesObj?.fajr)
          .tz(timeZoneDetails)
          .format("h:mm A"),
        },
        {
          name: "ZUHR",
          azaanTime: moment(prayerTimesObj?.dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          },
          {
            name: "ASR",
            azaanTime: moment(prayerTimesObj?.asr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          },
          {
            name: "MAGHRIB",
          azaanTime: moment(prayerTimesObj?.maghrib)
          .tz(timeZoneDetails)
          .format("h:mm A"),
        },
        {
          name: "ISHA",
          azaanTime: moment(prayerTimesObj?.isha)
          .tz(timeZoneDetails)
          .format("h:mm A"),
        },
      ];
      
      // Calculate Jamat times (15 minutes after prayer times)
      const prayerTimings = formatePrayerTime.map((Time) => {
        const AzaanTimeDate = new Date(`01/01/1970 ${Time.azaanTime}`);
        const JamatTime = new Date(AzaanTimeDate.getTime() + 15 * 60000); // Add 15 minutes (15 * 60000 milliseconds)
        Time.jamatTime = JamatTime.toLocaleTimeString();
        return Time;
      });
      
      // Get current day
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const currentDayIndex = date.getDay();
      const currentDay = days[currentDayIndex];
      //next prayer
      var current = prayerTimesObj.currentPrayer();
      var nextPrayerName = prayerTimesObj.nextPrayer() === 'none' ? 'fajr': prayerTimesObj.nextPrayer(); // it will give you name
      const nextPrayerCountDown = prayerTimesObj.timeForPrayer(nextPrayerName);
      var nextPrayerTime = moment(nextPrayerCountDown)
        .tz(timeZoneDetails)
        .format("hh:mm");

      resolve({
        currentDate: date.toLocaleDateString(),
        prayerTimes: prayerTimings,
        currentDay: currentDay.toLocaleUpperCase(),
        currentPrayerName: {
          name: current.toLocaleUpperCase(),
        },
        nextPrayerTime: {
          countDown: nextPrayerTime,
          key: nextPrayerName.toLocaleUpperCase(),
        },
        timeZone: timeZoneDetails,
        tahajjud: {
          middleOfTheNight: moment(sunnahTimes.middleOfTheNight)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          lastThirdOfTheNight: moment(sunnahTimes.lastThirdOfTheNight)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        coordinates: coordinates,
        params: params,
      });
    } catch (error) {
      console.log(error);
      reject(new Error("Error calculating prayer times."));
    }
  });
}
