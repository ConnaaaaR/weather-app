import React, { useEffect, useState } from "react";

const LocationImage = ({ lat, lon, apiKey, onImageUrlFetched }) => {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		// Fetch location photo here
		fetchLocationPhoto();
	}, [lat, lon, apiKey]);

	const fetchLocationPhoto = async () => {
		try {
			const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
			const apiBaseUrl = "https://maps.googleapis.com/maps/api/place";

			const response = await fetch(
				`${corsProxyUrl}${apiBaseUrl}/nearbysearch/json?location=${lat},${lon}&radius=1000&key=${apiKey}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch location photo");
			}

			const data = await response.json();
			if (data.results && data.results.length > 0) {
				const photoReference = data.results[0].photos[0].photo_reference;
				const photoUrl = `${apiBaseUrl}/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
				setImageUrl(photoUrl);

				// Pass the imageUrl up to the parent component
			}
		} catch (error) {
			console.error(error);
		}
	};

	return null; // LocationImage component doesn't render anything
};

export default LocationImage;
