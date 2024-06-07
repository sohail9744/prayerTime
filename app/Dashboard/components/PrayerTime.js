// PrayerNamazTime.js
import { PrayerTimes, SunnahTimes } from "adhan";
import moment from "moment-timezone";

export async function PrayerNamazTime({
  coordinates,
  date,
  params,
  timeZoneDetails,
  userCustomPrayerTimings,
  mosqName
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
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_fajr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ISHRAQ",
          azaanTime: moment(prayerTimesObj?.sunrise)
            .add(15, "minutes")
            .tz(timeZoneDetails)
            .format("hh:mm a"),
          jamatTime: moment(prayerTimesObj?.sunrise)
            .add(20, "minutes")
            .tz(timeZoneDetails)
            .format("hh:mm A"),
        },
        {
          name: "ZUHR",
          azaanTime: moment(userCustomPrayerTimings?.azaan_dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ASR",
          azaanTime: moment(userCustomPrayerTimings?.azaan_asr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_asr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "MAGHRIB",
          azaanTime: moment(userCustomPrayerTimings?.azaan_maghrib)
            .tz(timeZoneDetails)
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_maghrib)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ISHA",
          azaanTime: moment(userCustomPrayerTimings?.azaan_isha)
            .tz(timeZoneDetails)
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_isha)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "JUMAH",
          azaanTime: moment(userCustomPrayerTimings?.azaan_jumah)
            .tz(timeZoneDetails)
            .format("h:mm a"),
          jamatTime: moment(userCustomPrayerTimings?.pray_jumah)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
      ];
    } else {
      const formatePrayerTime = [
        {
          name: "FAJR",
          azaanTime: moment(prayerTimesObj?.fajr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ISHRAQ",
          azaanTime: moment(prayerTimesObj?.sunrise)
            .add(15, "minutes")
            .tz(timeZoneDetails)
            .format("hh:mm a"),
        },
        {
          name: "ZUHR",
          azaanTime: moment(prayerTimesObj?.dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ASR",
          azaanTime: moment(prayerTimesObj?.asr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "MAGHRIB",
          azaanTime: moment(prayerTimesObj?.maghrib)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "ISHA",
          azaanTime: moment(prayerTimesObj?.isha)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
        {
          name: "JUMAH",
          azaanTime: moment(prayerTimesObj?.dhuhr)
            .tz(timeZoneDetails)
            .format("h:mm a"),
        },
      ];
      // Calculate Jamat times (15 minutes after prayer times)
      prayerTimings = formatePrayerTime.map((Time) => {
        if (Time.azaanTime !== "Ishraq") {
          const AzaanTime = moment(Time.azaanTime, "HH:mm");
          const JamatTime = AzaanTime.add(15, "minutes"); // Add 15 minutes
          Time.jamatTime = JamatTime.format("hh:mm a"); // Format time to h:mm A
        } else {
          Time.jamatTime = moment(prayerTimesObj?.sunrise)
            .add(20, "minutes")
            .tz(timeZoneDetails)
            .format("hh:mm A");
        }
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
      currentDate: moment().format("Do MMM YYYY"),
      prayerTimes: prayerTimings,
      currentTime: moment().tz(timeZoneDetails).format("hh:mm:ss a"),
      currentDay: currentDay.toLocaleUpperCase(),
      currentPrayerName: current.toLocaleUpperCase(),
      nextPrayerTime: nextPrayerName.toLocaleUpperCase(),
      timeZone: timeZoneDetails,
      tahajjud: {
        middleOfTheNight: moment(sunnahTimes.middleOfTheNight)
          .tz(timeZoneDetails)
          .format("h:mm a"),
        lastThirdOfTheNight: moment(sunnahTimes.lastThirdOfTheNight)
          .tz(timeZoneDetails)
          .format("h:mm a"),
      },
      mosqName: mosqName
    };
  } catch (error) {
    // console.log(error);
  }
}

