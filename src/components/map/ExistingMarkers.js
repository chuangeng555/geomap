import React, {
	Fragment,
} from 'react';
import { Marker } from 'react-leaflet';
import { VenueLocationIcon } from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const ExistingMarkers = (props) => {
	const { geo_venues } = props;

	console.log(geo_venues);

		const markers = geo_venues.map((venue, index) => (
			//alert(venue.id)
			<Marker
				key={index}
				position={venue.geoLocation} 
				icon={VenueLocationIcon}
			>
				<MarkerPopup data={venue} />
			</Marker>
		));
		return <Fragment>{markers}</Fragment>;

};

export default ExistingMarkers;
