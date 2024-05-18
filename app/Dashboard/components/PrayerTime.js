// PrayerNamazTime.js
import { PrayerTimes, SunnahTimes } from "adhan";
import moment from "moment-timezone";

export async function PrayerNamazTime({
  coordinates,
  date,
  params,
  timeZoneDetails,
  userCustomPrayerTimings,
}) {
  const prayerTimesObj = new PrayerTimes(coordinates, date, params);
  const sunnahTimes = new SunnahTimes(prayerTimesObj);
  // Format prayer times
  try {
    let prayerTimings;
    //custom prayertimes if user entered
    if (userCustomPrayerTimings) {
      prayerTimings = [
        {
          name: "FAJR",
          azaanTime: moment(userCustomPrayerTimings?.azaan_fajr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_fajr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        {
          name: "ZUHR",
          azaanTime: moment(userCustomPrayerTimings?.azaan_dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        {
          name: "ASR",
          azaanTime: moment(userCustomPrayerTimings?.azaan_asr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_asr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        {
          name: "MAGHRIB",
          azaanTime: moment(userCustomPrayerTimings?.azaan_maghrib)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_maghrib)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        {
          name: "ISHA",
          azaanTime: moment(userCustomPrayerTimings?.azaan_isha)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_isha)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
        {
          name: "JUMAH",
          azaanTime: moment(userCustomPrayerTimings?.azaan_jumah)
            .tz(timeZoneDetails)
            .format("h:mm A"),
          jamatTime: moment(userCustomPrayerTimings?.pray_jumah)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
      ];
    } else {
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
        {
          name: "JUMAH",
          azaanTime: moment(prayerTimesObj?.dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm A"),
        },
      ];

      // Calculate Jamat times (15 minutes after prayer times)
      prayerTimings = formatePrayerTime.map((Time) => {
        const AzaanTimeDate = new Date(`01/01/1970 ${Time.azaanTime}`);
        const JamatTime = new Date(AzaanTimeDate.getTime() + 15 * 60000); // Add 15 minutes (15 * 60000 milliseconds)
        Time.jamatTime = JamatTime.toLocaleTimeString();
        return Time;
      });
    }

    // Get current day
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = date.getDay();
    const currentDay = days[currentDayIndex];
    //next prayer
    var current = prayerTimesObj.currentPrayer();
    var nextPrayerName =
      prayerTimesObj.nextPrayer() === "none"
        ? "fajr"
        : prayerTimesObj.nextPrayer(); // it will give you name

    return {
      currentDate: moment().format("MMM Do YYYY"),
      prayerTimes: prayerTimings,
      currentTime: moment().tz(timeZoneDetails).format("hh:mm:ss A"),
      currentDay: currentDay.toLocaleUpperCase(),
      currentPrayerName: current.toLocaleUpperCase(),
      nextPrayerTime: nextPrayerName.toLocaleUpperCase(),
      timeZone: timeZoneDetails,
      tahajjud: {
        middleOfTheNight: moment(sunnahTimes.middleOfTheNight)
          .tz(timeZoneDetails)
          .format("h:mm A"),
        lastThirdOfTheNight: moment(sunnahTimes.lastThirdOfTheNight)
          .tz(timeZoneDetails)
          .format("h:mm A"),
      },
    };
  } catch (error) {
    // console.log(error);
  }
}
