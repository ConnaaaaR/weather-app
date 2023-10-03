import React from "react";
import "../App.css";

const Box = (props) => {
	return (
		<>
			{props.data ? (
				<div className="box">
					<div className="boxItem">
						<img src="/icons/ph_wind.svg" alt="wind icon" />
						<h2>{Math.round(props.data.wind.speed)} m/s</h2>
						<h3>Wind</h3>
					</div>
					<div className="boxItem">
						<img src="/icons/iwwa_humidity.svg" alt="humidity icon" />
						<h2>{Math.round(props.data.main.humidity)} %</h2>
						<h3>Humidity</h3>
					</div>
					<div className="boxItem">
						<img
							src="/icons/material-symbols_visibility-outline.svg"
							alt="wind icon"
						/>
						<h2>{props.data.visibility / 1000} km</h2>
						<h3>Visibility</h3>
					</div>

					{/* <div className="flex humid">
					<h2>{`${data.main.pressure} \n hPa`}</h2>
				</div> */}
				</div>
			) : (
				<div className="box">
					<div className="boxItem">
						<img src="/icons/ph_wind.svg" alt="wind icon" />
						<h2 className="h2-placeholder"></h2>
						<h3>Wind</h3>
					</div>
					<div className="boxItem">
						<img src="/icons/iwwa_humidity.svg" alt="humidity icon" />
						<h2 className="h2-placeholder"></h2>
						<h3>Humidity</h3>
					</div>
					<div className="boxItem">
						<img
							src="/icons/material-symbols_visibility-outline.svg"
							alt="wind icon"
						/>
						<h2 className="h2-placeholder"></h2>
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

export default Box;
