import exifr from 'exifr';

export function useGeoLibrary() {


    const extractEXIFData = async (imageFile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const output = await exifr.parse(imageFile, { gps: true });
                console.log(output); // Logs all extracted metadata
                if (output) {

                    //          const dateTimeOriginal = output.DateTimeOriginal;
                    // Mon Mar 12 2018 08:10:41 GMT+0100 (Central European Standard Time) {}
                    const dateTimeOriginal = output.DateTimeOriginal;

                    const gpsInfo = {
                        GPSLatitude: output.GPSLatitude, // GPSLatitude is in degrees (N = +, S = -) :   (3) [47, 29, 55.37]
                        GPSLongitude: output.GPSLongitude, // GPSLongitude is in degrees (E = +, W = -) : (3) [19, 4, 12.69]
                        altitude: output.GPSAltitude, // GPSAltitude is in meters above sea level    : 119.16872427983539
                        latitude: output.latitude, // 47.49871388888889
                        longitude: output.longitude, // 19.070191666666666
                    };
                    resolve({ dateTimeOriginal, gpsInfo }); // Returns { dateTimeOriginal, gpsInfo };
                }
                console.warn('No EXIF data found:');
                resolve(null)
            } catch (error) {
                console.error('Error extracting EXIF data:', error);
                reject(error);
            }
        })}


    const reverseGeocode = (longitude, latitude) => {

        return new Promise((resolve, reject) => {
            //, "geometry": { "coordinates": [event.gpsInfo.longitude, event.gpsInfo.latitude], "type": "Point" }
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const site = {}
                    console.log('Location details:', data);
                    // Here you can extract and use the country, state, city, etc.
                    console.log(`Country: ${data.tourism}, ${data.name} ${data.address.country}, State: ${data.address.state}, City: ${data.address.village || data.address.city || data.address.town}`);
                    site.displayLabel = data.tourism || data.name || data.address.city || data.address.town
                    site.address = data.display_name
                    site.country = data.address.country
                    site.street = data.address.street || data.address.road
                    site.postcode = data.address.postcode
                    site.class = data.class
                    site.type = data.type
                    site.quarter = data.address.quarter || data.address.neighbourhood
                    site.addresstype = data.addresstype
                    site.house_number = data.address.house_number

                    site.state = data.address.state
                    site.county = data.address.county
                    site.city = (data.address.village || data.address.city || data.address.town)
                    if (data.address.suburb) site.city = data.address.suburb + ',' + site.city
                    if (!site.label || site.label == 'To be geo-encoded') {
                        site.label = data.tourism || data.amenity || data.name || data.address.city || data.address.town || site.street

                    }
                    resolve(site)
                })
                .catch(error => { console.error('Error in reverseGeocode:', error); reject(error) });
        });
    }
    return { reverseGeocode,extractEXIFData };
}
