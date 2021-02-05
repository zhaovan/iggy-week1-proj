// Quick frontend wrapper for API lookup call that passes in
// @param {float} lat - latitude of a location
// @param {float} lng - longtitude of a location
// @param {string} option - the specific option being passed into the
//                          API Call (wildfire-risk, air_quality, etc)
// @return {Object} iggyResult - Returns the result value from the iggy api call

export async function poi(lat, lng, labels, time) {
    const iggyURL =
        "https://api.askiggy.com/v1/points_of_interest?latitude=" +
        lat +
        "&longitude=" +
        lng +
        "&labels=" +
        labels +
        "&within_minutes_walking=" +
        time;

    const iggyResult = await fetch(iggyURL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Iggy-Token": process.env.REACT_APP_IGGY_KEY,
        },
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.error(err);
        });

    return iggyResult;
}

export async function lookup(lat, lng, labels) {
    const iggyURL =
        "https://api.askiggy.com/v1/lookup?latitude=" +
        lat +
        "&longitude=" +
        lng +
        "&labels=" +
        labels;

    const iggyResult = await fetch(iggyURL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Iggy-Token": process.env.REACT_APP_IGGY_KEY,
        },
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.error(err);
        });

    return iggyResult;
}

export async function poiOptions() {
    const iggyURL = "https://api.askiggy.com/v1/points_of_interest_options";

    const iggyResult = await fetch(iggyURL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Iggy-Token": process.env.REACT_APP_IGGY_KEY,
        },
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.error(err);
        });

    return iggyResult;
}
