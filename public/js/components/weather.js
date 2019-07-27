function Weather(lat, lon) {
    this.lat = lat;
    this.lon = lon;
}

Weather.prototype.geocode = async function () {
    const response = await fetch('/geocode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            lat: this.lat,
            lon: this.lon
        })
    });

    const data = await response.json();
    return data.results[0].address_components;
}

Weather.prototype.sendLocation = async function () {
    const response = await fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            lat: this.lat,
            lon: this.lon
        })
    });
    const data = await response.json();
    return data.currently;
}

Weather.prototype.changeLocation = function (lat, lon) {
    this.lat = lat;
    this.lon = lon;
}