import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isSunny, setIsSunny] = useState(false);
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

	async function fetchData() {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			const { latitude, longitude } = position.coords;
			const apiKey = "70fad9c302c80c4cc388150f0be6cdf0";
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
			);
			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error);
		}
	}

	async function fetchPlaceImg() {
		const position = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		const { latitude, longitude } = position.coords;
	}

	useEffect(() => {
		fetchData();
		setIsSunny(isDaytime());

		const interval = setInterval(() => {
			setIsSunny(isDaytime());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	// Function to check if it's daytime
	const isDaytime = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		return currentHour >= 9 && currentHour < 17;
	};

	const locationBasedUnit = (celcius) => {
		if (data.sys.country == "US") {
			return celcius * 1.8 + 32;
		} else {
			return celcius;
		}
	};

	const daytimeGradient =
		"linear-gradient(45deg, rgba(114,192,223,1) 78%, rgba(255,233,107,1) 100%)";
	const nighttimeGradient =
		"linear-gradient(135deg, #FFC3A0, #FFECB3, #C3A0FF)";

	const backgroundStyle = {
		background: isSunny ? daytimeGradient : nighttimeGradient,
		transition: "background 1s ease",
		width: "100%",
		height: "100vh",
		margin: "0 auto",
	};

	return (
		<>
			{data ? (
				<div style={backgroundStyle}>
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

					<h5>
						{Math.round(data.wind.speed) == 0 && "There is no wind"}
						{Math.round(data.wind.speed) > 0 &&
							`The wind is coming from the ${getCardinalDirection(
								data.wind.deg
							)} at
            ${Math.round(data.wind.speed)} m/s `}
					</h5>
				</div>
			) : (
				<h5 style={backgroundStyle}>Data Loading...</h5>
			)}
		</>
	);
}

export default App;
