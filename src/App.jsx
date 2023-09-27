import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "./components/Box";
import { Icon } from "@iconify/react";
import arrowUpFill from "@iconify/icons-mingcute/arrow-up-fill";
import "./App.css";

function App() {
	const [data, setData] = useState(null);
	const [imageUrl, setImageUrl] = useState("");

	const getCardinalDirection = (degree) => {
		const directions = [
			"north",
			"north east",
			"east",
			"south east",
			"south",
			"south west",
			"west",
			"north west",
		];

		// Ensure the degree is positive and within the range [0, 360)
		const normalizedDegree = ((degree % 360) + 360) % 360;

		// Calculate the index into the directions array
		const index = Math.floor((normalizedDegree + 22.5) / 45);

		return directions[index];
	};

	const fetchLocationPhoto = async (lat, lon) => {
		try {
			const options = {
				method: "GET",
				url: `http://localhost:8000/location?lat=${lat}&lon=${lon}`,
			};
			await axios.request(options).then((response) => {
				console.log(response);
				setImageUrl(response.data.url);
			});
		} catch {
			console.error("error fetching location photo");
		}
		fetchData(lat, lon);
	};

	async function fetchData(latitude, longitude) {
		try {
			const options = {
				method: "GET",
				url: `http://localhost:8000/weather?lat=${latitude}&lon=${longitude}`,
			};

			axios.request(options).then((response) => {
				setData(response.data);
			});
			console.log("Weather Fetched!");
		} catch (error) {
			console.error(error);
		}
	}

	const fetchDataAndLocationPhoto = async () => {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude, longitude } = position.coords;
			fetchLocationPhoto(latitude, longitude);
		} catch {
			console.error("shits broken yo");
		}
	};

	useEffect(() => {
		fetchDataAndLocationPhoto();
	}, []);

	const locationBasedUnit = (celsius) => {
		if (data && data.sys && data.sys.country === "US") {
			return Math.floor(celsius * 1.8 + 32);
		} else {
			return celsius;
		}
	};

	return (
		<>
			{data ? (
				<div
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						width: "100%",
						height: "100vh",
						margin: "0 auto",
						transition: "background 1s ease",
					}}
				>
					<img
						src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
						alt={data.weather[0].description}
					/>
					<h2>{data.name}</h2>
					<h1>{locationBasedUnit(Math.round(data.main.temp))}°</h1>
					<h5>
						Feels like {locationBasedUnit(Math.floor(data.main.feels_like))}°
					</h5>
					<h3>{data.weather[0].description}</h3>
					<div className="flex">
						<Box>
							<div style={{ transform: `rotate(${data.wind.deg + 180}deg)` }}>
								<Icon icon={arrowUpFill} width="50%" />
							</div>
							<div className="smallText">{`${getCardinalDirection(
								data.wind.deg
							)} at ${Math.round(data.wind.speed)} m/s`}</div>
						</Box>
						<Box>
							<div className="flex humid">
								<h2>{`${data.main.humidity}%`}</h2>
								<div className="smallText">Humidity</div>
							</div>
						</Box>
						<Box>
							<div className="flex humid">
								<h2>{`${data.main.pressure} \n hPa`}</h2>
							</div>
						</Box>
					</div>
				</div>
			) : (
				<h5>Data Loading...</h5>
			)}
		</>
	);
}

export default App;
