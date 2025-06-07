function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (city === "") {
        errorMessage.classList.remove("hidden");
        return;
    }

    // Hide any previous error and redirect to forecast page
    errorMessage.classList.add("hidden");

    // Redirect to forecast.html with city in query parameters
    window.location.href = `forecast.html?city=${encodeURIComponent(city)}`;
}
