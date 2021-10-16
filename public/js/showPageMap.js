
mapboxgl.accessToken = mapBoxToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
//Fullscreen
map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

var el = document.createElement('div');
el.className = 'marker';
new mapboxgl.Marker(el)
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ closeOnClick: false })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);