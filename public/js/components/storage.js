function Storage() {
    this.lat;
    this.lon;

    this.defaultlat = 40.700683;
    this.defaultlon = -73.925972;
}

Storage.prototype.getLocation = function () {
    this.lat = localStorage.getItem('lat') === null ? this.defaultlat : localStorage.getItem('lat');
    this.lon = localStorage.getItem('lon') === null ? this.defaultlon : localStorage.getItem('lon');

    return {
        lat: this.lat,
        lon: this.lon
    }
}

Storage.prototype.setLocation = function (lat, lon) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
}