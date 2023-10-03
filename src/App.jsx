import { useEffect, useState } from "react";
import Box from "./components/Box";
import { Icon } from "@iconify/react";
import arrowUpFill from "@iconify/icons-mingcute/arrow-up-fill";
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

	// async function fetchPlaceImg() {
	// 	const position = await new Promise((resolve, reject) => {
	// 		navigator.geolocation.getCurrentPosition(resolve, reject);
	// 	});

	// 	const { latitude, longitude } = position.coords;
	// }

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
			return Math.floor(celcius * 1.8 + 32);
		} else {
			return celcius;
		}
	};

	const daytimeGradient =
		"linear-gradient(180deg, #E3F2FF 0%, #42A4FF 17.19%, #8EB581 74.48%, #65AE4B 100%)";
	const nighttimeGradient =
		"linear-gradient(180deg, #0A023D 0%, #2825A8 33.33%, #2825A8 72.61%, #01020E 100%)";

	const backgroundStyle = {
		background: isSunny ? daytimeGradient : nighttimeGradient,
		transition: "background 1s ease",
		width: "100%",
		height: "100vh",
		margin: "0 auto",
	};

	const color = {
		color: isSunny ? "#1a1a1a" : "#c9c9c9",
	};

	return (
		<>
			{data ? (
				<div style={backgroundStyle}>
					<div className="flex">
						<h2 style={color}>{data.name}</h2>
						<h1 style={color}>
							{locationBasedUnit(Math.round(data.main.temp))}
						</h1>
						<Box data={data} color={color} />
					</div>
				</div>
			) : (
				<div style={backgroundStyle}>
					<div className="flex">
						<h2 className="h2-placeholder"></h2>
						<h1 className="h1-placeholder"></h1>

						<Box />
					</div>
				</div>
			)}
		</>
	);
}

export default App;
