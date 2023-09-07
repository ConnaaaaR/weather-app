import React, { useEffect, useState } from "react";

const SunnySkyBackground = (props) => {
	const [isSunny, setIsSunny] = useState(false);

	// Function to check if it's daytime
	const isDaytime = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		return currentHour >= 9 && currentHour < 17;
	};

	useEffect(() => {
		// Check and update the background when the component mounts
		setIsSunny(isDaytime());

		// Check and update the background every minute
		const interval = setInterval(() => {
			setIsSunny(isDaytime());
		}, 60000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	}, []);

	// Define the background gradients

	const daytimeGradient =
		"linear-gradient(45deg, rgba(114,192,223,1) 78%, rgba(255,233,107,1) 100%)";
	const nighttimeGradient =
		"linear-gradient(135deg, #FFC3A0, #FFECB3, #C3A0FF)";

	const backgroundStyle = {
		background: isSunny ? daytimeGradient : nighttimeGradient,
		transition: "background 1s ease",
		width: "100%",
		height: "100vh",
	};

	return <div style={backgroundStyle}>{props.children}</div>;
};

export default SunnySkyBackground;
