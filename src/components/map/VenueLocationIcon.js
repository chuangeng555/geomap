import L from 'leaflet';

export const VenueLocationIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
	//iconRetinaUrl: require('./venue_location_icon.svg'),
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [25, 25],
	className: 'leaflet-venue-icon',
});

