// prayerTimesUtils.js
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export async function getCurrentPrayerTimes({ location, country } = {}) {
    return new Promise(async (resolve, reject) => {
        let latitude, longitude;

        // If location and country are provided, get coordinates for the custom location
        if (location && country) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=YOUR_API_KEY`);
                const data = await response.json();
                latitude = data.coord.lat;
                longitude = data.coord.lon;
            } catch (error) {
                reject(new Error('Error fetching coordinates for the custom location.'));
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
                    reject(new Error('Error getting current location.'));
                    return;
                }
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
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
            const formattedAzanTimes = [
                { name: 'FAJR', time: prayerTimesObj.fajr.toLocaleTimeString() },
                { name: 'ZUHR', time: prayerTimesObj.dhuhr.toLocaleTimeString() },
                { name: 'ASR', time: prayerTimesObj.asr.toLocaleTimeString() },
                { name: 'MAGHRIB', time: prayerTimesObj.maghrib.toLocaleTimeString() },
                { name: 'ISHA', time: prayerTimesObj.isha.toLocaleTimeString() }
            ];

            // Calculate Jamat times (15 minutes after prayer times)
            const formattedPrayerTimes = formattedAzanTimes.map(azaanTime => {
                const AzaanTimeDate = new Date(`01/01/1970 ${azaanTime.time}`);
                const JamatTime = new Date(AzaanTimeDate.getTime() + 15 * 60000); // Add 15 minutes (15 * 60000 milliseconds)
                return { name: azaanTime.name, time: JamatTime.toLocaleTimeString() };
            });

            // Get current day
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const currentDayIndex = date.getDay();
            const currentDay = days[currentDayIndex];
            //next prayer
            var current = prayerTimesObj.currentPrayer();
            var next = prayerTimesObj.nextPrayer();
            var nextPrayerTime = prayerTimesObj.timeForPrayer(next);
            resolve({
                currentDate: date,
                prayerTimes: formattedPrayerTimes,
                azaanTimes: formattedAzanTimes,
                currentDay: currentDay,
                currentPrayerName: current,
                nextPrayerTime: nextPrayerTime
            });
        } catch (error) {
            reject(new Error('Error calculating prayer times.'));
        }
    });
}
