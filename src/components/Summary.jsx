import React from "react";

const Summary = ({ isSunny, data }) => {
	const locationBasedUnit = (celcius) => {
		if (data.sys.country == "US") {
			return Math.floor(celcius * 1.8 + 32);
		} else {
			return celcius;
		}
	};

	const colour = {
		color: isSunny ? "#1a1a1a" : "#c9c9c9",
	};
	return (
		<>
			{data ? (
				<>
					<h5 style={colour}>Summary</h5>
					<p style={colour}>
						It currently is {data.weather[0].description} and feels like
						{" " + Math.round(locationBasedUnit(data.main.feels_like))}°. Todays
						high is
						{" " + Math.round(locationBasedUnit(data.main.temp_max))}° with a
						low of
						{" " + Math.round(locationBasedUnit(data.main.temp_min))}°.
					</p>
					<p style={colour}>
						Winds of {Math.round(data.wind.speed)} m/s with gusts of up to{" "}
						{Math.round(data.wind.gust)} m/s.
					</p>
				</>
			) : (
				""
			)}
		</>
	);
};

export default React.memo(Summary);
