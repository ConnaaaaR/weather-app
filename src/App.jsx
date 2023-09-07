import { useEffect, useState } from "react";
import "./App.css";
import SunnySkyBackground from "./components/SunSkyBackground";

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	// async function fetchData() {
	//   navigator.geolocation.getCurrentPosition(async position => {
	//     let lat = position.coords.latitude
	//     let lon = position.coords.longitude
	//     try {
	//       await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=70fad9c302c80c4cc388150f0be6cdf0&units=metric`)
	//       .then(response => {
	//          return response.json()
	//       })
	//       .then( data => {
	//         setData(data)
	//       })
	//       console.info("API connected successfully")
	//     } catch(error) {
	//       setError(error)
	//     }

	//   })
	// }

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
	}, []);

	return (
		<>
			<SunnySkyBackground>
				{data ? (
					<div>
						<img
							src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
							alt={data.weather[0].description}
						/>
						<h2>{data.name}</h2>
						<h1>{Math.round(data.main.temp)}°C</h1>
						<h5>Feels like {Math.floor(data.main.feels_like)}°C</h5>

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
					<h5>Data Loading...</h5>
				)}
			</SunnySkyBackground>
		</>
	);
}

export default App;
