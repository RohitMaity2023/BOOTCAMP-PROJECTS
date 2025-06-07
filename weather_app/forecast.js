window.onload = async () => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    const apiKey = "21498aca187a90620e31b0046f971fb6";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("city-name").textContent = `City: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;

        const weatherMain = data.weather[0].main.toLowerCase();
        const video = document.getElementById("bgVideo");
        const videoSource = document.getElementById("videoSource");

        let videoFile = "videos.mp4";

        if (weatherMain.includes("clear")) {
            videoFile = "sunny.mp4";
        } else if (weatherMain.includes("clouds")) {
            videoFile = "cloudy.mp4";
        } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
            videoFile = "rainy.mp4";
        } else if (weatherMain.includes("snow")) {
            videoFile = "snow.mp4";
        } else if (weatherMain.includes("fog") || weatherMain.includes("mist") || weatherMain.includes("haze")) {
            videoFile = "foggy.mp4";
        }

        videoSource.src = `videos/${videoFile}`;
        video.load();
        video.play();

    } catch (error) {
        document.getElementById("weather-info").textContent = "Something went wrong!";
    }
};
