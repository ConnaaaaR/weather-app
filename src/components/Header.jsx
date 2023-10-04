import React from "react";

const Header = ({ name, temp, isSunny }) => {
	const colour = {
		color: isSunny ? "#1a1a1a" : "#c9c9c9",
	};

	return (
		<>
			<h2 style={colour}>{name}</h2>
			<h1 style={colour}>{temp}°</h1>
		</>
	);
};

export default React.memo(Header);
