import { useState } from "react";
import "./App.css";
import { poi, lookup, poiOptions } from "./api/iggy.js";

function App() {
    const [lng, setLng] = useState(-93.271205);
    const [lat, setLat] = useState(44.976469);

    const [isUrban, setUrban] = useState(null);

    const [time, setTime] = useState(null);
    const [labels, setLabels] = useState(null);
    const [option, setOptions] = useState("bars");

    const [errors, setErrors] = useState(null);
    const [results, setResults] = useState(null);

    const [winResult, setWinResults] = useState(null);

    const [win, setWin] = useState(null);

    function checkAnswer(check) {
        setWin(check === isUrban);
    }

    async function generateLocation() {
        const location = await fetch(
            "https://api.3geonames.org/?randomland=yes&json=1"
        )
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            });

        if (location) {
            setLat(location["nearest"]["latt"] * 1);
            setLng(location["nearest"]["longt"] * 1);
        }

        const result = await lookup(lat, lng, "is_urban");
        const labels = await poiOptions();
        setLabels(labels["labels"]);
        if (result["is_urban"] !== 1) {
            setUrban(false);
        } else {
            setUrban(true);
        }
    }

    async function getPOI() {
        const lookupResult = await poi(lat, lng, option, time);
        setResults(lookupResult[option]);
    }

    return (
        <div className="App">
            <div
                style={{
                    fontSize: "64px",
                    fontFamily: "Aeonik",
                    marginBottom: "2%",
                    textAlign: "center",
                }}
            >
                Guess if the random location is urban or not!
            </div>
            <button
                className="button"
                onClick={generateLocation}
                style={{ marginLeft: "43%" }}
            >
                Generate Location!
            </button>
            {isUrban !== null ? (
                <div>
                    <div style={{ marginLeft: "43%", marginTop: "2%" }}>
                        <div className="label header">
                            Is this location urban?
                        </div>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <button
                                className="button"
                                onClick={() => checkAnswer(true)}
                            >
                                Yes!
                            </button>
                            <button
                                className="button"
                                onClick={() => checkAnswer(false)}
                            >
                                No!
                            </button>
                        </div>
                    </div>
                    {win == null ? (
                        <div />
                    ) : win ? (
                        <div style={{ textAlign: "center" }}>
                            Congrats you won! The point was specifically ({lat},{" "}
                            {lng})
                        </div>
                    ) : (
                        <div>Try again loser </div>
                    )}
                    <div
                        style={{
                            marginTop: "4%",
                            display: "flex",
                            border: "1px solid",
                            width: "50%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            padding: "2%",
                        }}
                    >
                        <div>
                            <div style={{ marginBottom: "2%", width: "90%" }}>
                                Use the below API call to help you out! This
                                connects directly with the Iggy points of
                                interest API to find relevant points of
                                interests in a certain radius around a location{" "}
                            </div>
                            <div>
                                <div className="label">
                                    Walking distance from this location (in
                                    whole minutes)
                                </div>
                                <input
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <div className="label">
                                    Select the type of point of interest you're
                                    looking for
                                </div>
                                <select
                                    name="type"
                                    id="type"
                                    className="dropdown"
                                    defaultValue="bars"
                                    onChange={(e) => {
                                        setOptions(e.target.value);
                                    }}
                                >
                                    {labels &&
                                        labels.map((label) => {
                                            return (
                                                <option value={label}>
                                                    {label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <button className="button" onClick={getPOI}>
                                Search for nearby points of interest!
                            </button>
                        </div>
                        <div>
                            {results ? (
                                results.map((result) => {
                                    return <div>{result.name}</div>;
                                })
                            ) : results == null ? (
                                <div />
                            ) : (
                                <div>
                                    There were no results for these paramteres,
                                    try something else!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default App;
