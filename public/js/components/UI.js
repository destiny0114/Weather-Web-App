function UI() {
    this.icon = new Skycons({ "color": "#34184e" });
    this.locationElement = document.querySelector('[data-location]');
    this.statusElement = document.querySelector('[data-status]');
    this.temperatureElement = document.querySelector('[data-temperature]');
    this.precipitationElement = document.querySelector('[data-precipitation]');
    this.windElement = document.querySelector('[data-wind]');
    this.icon.set('icon', 'clear-day');
    this.icon.play();
}

UI.prototype.displayWeather = function (location, weatherData) {
    const { summary, temperature, precipProbability, windSpeed, icon } = weatherData;

    this.locationElement.textContent = location;
    this.statusElement.textContent = summary;

    this.locationElement.textContent = location;
    this.statusElement.textContent = summary;
    this.temperatureElement.textContent = temperature;
    this.precipitationElement.textContent = `${precipProbability * 100}%`
    this.windElement.textContent = windSpeed;
    this.icon.set('icon', icon);
    this.icon.play();
}