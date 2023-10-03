import React from "react";

const Box = (props) => {
	return (
		<>
			{props.data ? (
				<div className="box">
					<div className="boxItem">
						<img src="/icons/ph_wind.svg" alt="wind icon" />
						<h3 style={props.color}>{Math.round(props.data.wind.speed)} m/s</h3>
						<h4 style={props.color}>Wind</h4>
					</div>
					<div className="boxItem">
						<img src="/icons/iwwa_humidity.svg" alt="humidity icon" />
						<h3 style={props.color}>
							{Math.round(props.data.main.humidity)} %
						</h3>
						<h4 style={props.color}>Humidity</h4>
					</div>
					<div className="boxItem">
						<img
							src="/icons/material-symbols_visibility-outline.svg"
							alt="wind icon"
						/>
						<h3 style={props.color}>{props.data.visibility / 1000} km</h3>
						<h4 style={props.color}>Visibility</h4>
					</div>

					{/* <div className="flex humid">
					<h2>{`${data.main.pressure} \n hPa`}</h2>
				</div> */}
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

					{/* <div className="flex humid">
					<h2>{`${data.main.pressure} \n hPa`}</h2>
				</div> */}
				</div>
			)}
		</>
	);
};

export default React.memo(Box);
