async function fetchWeather(place) {
  const apiKey = "EB4W5BUNG54U2NJM6V894PH94";
  if (!apiKey) {
    throw new Error("API key is missing. Please check your .env file.");
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default fetchWeather;
