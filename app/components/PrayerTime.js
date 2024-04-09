// prayerTimesUtils.js
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

export async function getCurrentPrayerTimes({ location, country } = {}) {
  const timeConverter = (timing, format) => {
    const dateConverting = new Date(timing);
    // Convert to local time string with options for 12-hour format including AM/PM
    return dateConverting.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: format, // This ensures the time is in 12-hour format with AM/PM
    });
  };
  return new Promise(async (resolve, reject) => {
    let latitude, longitude;

    // If location and country are provided, get coordinates for the custom location
    if (location && country) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=YOUR_API_KEY`
        );
        const data = await response.json();
        latitude = data.coord.lat;
        longitude = data.coord.lon;
      } catch (error) {
        reject(
          new Error("Error fetching coordinates for the custom location.")
        );
        return;
      }
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
    const params = CalculationMethod.MoonsightingCommittee();
    const date = new Date(); // Current date

    try {
      const prayerTimesObj = new PrayerTimes(coordinates, date, params);

      // Format prayer times
      const formatePrayerTime = [
        {
          name: "FAJR",
          azaanTime: prayerTimesObj.fajr.toLocaleTimeString(),
        },
        {
          name: "ZUHR",
          azaanTime: prayerTimesObj.dhuhr.toLocaleTimeString(),
        },
        {
          name: "ASR",
          azaanTime: prayerTimesObj.asr.toLocaleTimeString(),
        },
        {
          name: "MAGHRIB",
          azaanTime: prayerTimesObj.maghrib.toLocaleTimeString(),
        },
        {
          name: "ISHA",
          azaanTime: prayerTimesObj.isha.toLocaleTimeString(),
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
      var nextPrayerName = prayerTimesObj.nextPrayer(); // it will give you name
      var nextPrayerTime = timeConverter(
        prayerTimesObj.timeForPrayer(nextPrayerName),
        true
      ); // it will give you 12 formatted time

      const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const currentPrayerKey = prayers.findIndex(
        (prayer) => prayer.toLowerCase() === current.toLowerCase()
      );
      // Calculate the next prayer key, wrapping around if needed
      const nextPrayerKey = (currentPrayerKey + 1) % prayers.length;

      // Use nextPrayerKey to access the next prayer
      const nextPrayer = prayers[nextPrayerKey];
      resolve({
        currentDate: date.toLocaleDateString(),
        prayerTimes: prayerTimings,
        currentDay: currentDay.toLocaleUpperCase(),
        currentPrayerName: {
          name: current.toLocaleUpperCase(),
          key: currentPrayerKey,
        },
        nextPrayerTime: {
          time: nextPrayerTime,
          key: nextPrayer.toLocaleUpperCase(),
        },
      });
    } catch (error) {
      reject(new Error("Error calculating prayer times."));
    }
  });
}
