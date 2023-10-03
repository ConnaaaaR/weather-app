import { useEffect, useState } from "react";
import Box from "./components/Box";
import Header from "./components/Header";
import Summary from "./components/Summary";
import "./App.css";

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isSunny, setIsSunny] = useState(false);

	async function fetchData() {
		try {
			let latitude, longitude;

			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					timeout: 30000, // 30 seconds timeout
				});
			});

			localStorage.setItem("locationPermissionAsked", "true");

			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch weather data");
			}

			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error.message);
		}
	}

	useEffect(() => {
		setIsSunny(isDaytime());
		fetchData();
		console.log(isSunny);
		const interval = setInterval(() => {
			setIsSunny(isDaytime());
			fetchData();
		}, 120000);

		return () => clearInterval(interval);
	}, []);

	const isDaytime = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		return currentHour >= 8 && currentHour < 23;
	};

	const locationBasedUnit = (celcius) => {
		if (data.sys.country == "US") {
			return Math.floor(celcius * 1.8 + 32);
		} else {
			return celcius;
		}
	};

	const daytimeGradient = "linear-gradient(180deg, #C5E3FF 0%, #428EFF 89.58%)";
	const nighttimeGradient =
		"linear-gradient(180deg, #0A023D 0%, #2825A8 33.33%, #2825A8 72.61%, #01020E 100%)";

	const backgroundStyle = {
		background: isSunny ? daytimeGradient : nighttimeGradient,
		transition: "background 1s ease",
		width: "100%",
		height: "100vh",
		margin: "0 auto",
	};

	const colour = {
		colour: isSunny ? "#1a1a1a" : "#c9c9c9",
	};

	return (
		<div style={backgroundStyle}>
			<div className="flex">
				{error && (
					<div className="error">
						Error: {error}, please refresh the page or try again later
					</div>
				)}
				{data ? (
					<>
						<Header
							name={data.name}
							temp={locationBasedUnit(Math.round(data.main.temp))}
							isSunny={isSunny}
						/>
						<Box
							vis={data.visibility / 1000}
							wind={Math.round(data.wind.speed)}
							hum={Math.round(data.main.humidity)}
							isSunny={isSunny}
						/>
					</>
				) : (
					<>
						<h2 className="h2-placeholder"></h2>
						<h1 className="h1-placeholder"></h1>
						<Box />
					</>
				)}
				<Summary className="summary-left" data={data} isSunny={isSunny} />
			</div>
		</div>
	);
}

export default App;
