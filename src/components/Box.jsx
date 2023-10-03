import React from "react";

const Box = ({ vis, wind, hum, isSunny }) => {
	const colour = {
		color: isSunny ? "#1a1a1a" : "#c9c9c9",
	};

	return (
		<>
			{wind && vis ? (
				<div className="box">
					<div className="boxItem">
						<img src="/icons/ph_wind.svg" alt="wind icon" />
						<h3 style={colour}>{wind} m/s</h3>
						<h4 style={colour}>Wind</h4>
					</div>
					<div className="boxItem">
						<img src="/icons/iwwa_humidity.svg" alt="humidity icon" />
						<h3 style={colour}>{hum} %</h3>
						<h4 style={colour}>Humidity</h4>
					</div>
					<div className="boxItem">
						<img
							src="/icons/material-symbols_visibility-outline.svg"
							alt="wind icon"
						/>
						<h3 style={colour}>{vis} km</h3>
						<h4 style={colour}>Visibility</h4>
					</div>
				</div>
			) : (
				<div className="box">
					<div className="boxItem">
						<img src="/icons/ph_wind.svg" alt="wind icon" />
						<h2 className="data-placeholder">&#160;&#160;</h2>
						<h3>Wind</h3>
					</div>
					<div className="boxItem">
						<img src="/icons/iwwa_humidity.svg" alt="humidity icon" />
						<h2 className="data-placeholder">&#160;&#160;</h2>
						<h3>Humidity</h3>
					</div>
					<div className="boxItem">
						<img
							src="/icons/material-symbols_visibility-outline.svg"
							alt="wind icon"
						/>
						<h2 className="data-placeholder">&#160;&#160;</h2>
						<h3>Visibility</h3>
					</div>
				</div>
			)}
		</>
	);
};

export default React.memo(Box);
