// Quick frontend wrapper for geocode to convert Address to Geocode
// @param {string} location - the address of a location
// @return {Object} result - returns the result value from calling on the geocode API

export async function convertAddressToGeocode(location) {
    const queryURL =
        "https://api.opencagedata.com/geocode/v1/json?q=" +
        location +
        "&key=" +
        process.env.REACT_APP_OPENCAGE_KEY;
    const result = await fetch(queryURL)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });

    return result;
}
