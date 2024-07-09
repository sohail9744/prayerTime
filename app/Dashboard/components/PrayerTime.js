"use client";
// PrayerNamazTime.js
import { PrayerTimes, SunnahTimes } from "adhan";
import moment from "moment-timezone";

export async function PrayerNamazTime({
  coordinates,
  date,
  params,
  timeZoneDetails,
  userCustomPrayerTimings,
  mosqName,
}) {
  const prayerTimesObj = new PrayerTimes(coordinates, date, params);
  const sunnahTimes = new SunnahTimes(prayerTimesObj);
  // Format prayer times
  try {
    //custom prayertimes if user entered
    const prayerTimings = [
      {
        name: "FAJR",
        azaanTime: userCustomPrayerTimings?.azaan_fajr
          ? moment(userCustomPrayerTimings.azaan_fajr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.fajr).tz(timeZoneDetails).format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_fajr
          ? moment(userCustomPrayerTimings.pray_fajr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.fajr)
              .add(15, "minutes")
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
          .format("hh:mm a"),
      },
      {
        name: "ZUHR",
        azaanTime: userCustomPrayerTimings?.azaan_dhuhr
          ? moment(userCustomPrayerTimings.azaan_dhuhr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.dhuhr).tz(timeZoneDetails).format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_dhuhr
          ? moment(userCustomPrayerTimings.pray_dhuhr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.dhuhr)
              .add(15, "minutes")
              .tz(timeZoneDetails)
              .format("h:mm a"),
      },
      {
        name: "ASR",
        azaanTime: userCustomPrayerTimings?.azaan_asr
          ? moment(userCustomPrayerTimings.azaan_asr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.asr).tz(timeZoneDetails).format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_asr
          ? moment(userCustomPrayerTimings.pray_asr)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.asr)
              .add(15, "minutes")
              .tz(timeZoneDetails)
              .format("h:mm a"),
      },
      {
        name: "MAGHRIB",
        azaanTime: userCustomPrayerTimings?.azaan_maghrib
          ? moment(userCustomPrayerTimings.azaan_maghrib)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.maghrib)
              .tz(timeZoneDetails)
              .format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_maghrib
          ? moment(userCustomPrayerTimings.pray_maghrib)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.maghrib)
              .add(15, "minutes")
              .tz(timeZoneDetails)
              .format("h:mm a"),
      },
      {
        name: "ISHA",
        azaanTime: userCustomPrayerTimings?.azaan_isha
          ? moment(userCustomPrayerTimings.azaan_isha)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.isha).tz(timeZoneDetails).format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_isha
          ? moment(userCustomPrayerTimings.pray_isha)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.isha)
              .add(15, "minutes")
              .tz(timeZoneDetails)
              .format("h:mm a"),
      },
      {
        name: "JUMAH",
        azaanTime: userCustomPrayerTimings?.azaan_jumah
          ? moment(userCustomPrayerTimings.azaan_jumah)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.dhuhr).tz(timeZoneDetails).format("h:mm a"),
        jamatTime: userCustomPrayerTimings?.pray_jumah
          ? moment(userCustomPrayerTimings.pray_jumah)
              .tz(timeZoneDetails)
              .format("h:mm a")
          : moment(prayerTimesObj?.dhuhr)
              .add(15, "minutes")
              .tz(timeZoneDetails)
              .format("h:mm a"),
      },
    ];

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
      currentTime: moment().tz(timeZoneDetails).format("hh:mm:ss A"),
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
      mosqName: mosqName,
    };
  } catch (error) {
    // console.log(error);
  }
}
