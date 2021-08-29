import React, {
	Fragment,
	useState
} from 'react';
import { Marker } from 'react-leaflet';
import { VenueLocationIcon } from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';
 


export default function ExistingMarkers(props) {
	const { geo_venues } = props; 
	const [buttonDisable, setButtonDisable] = useState(true);

	console.log(geo_venues)
	// constructor(props){
	// 	super(props);
	// 	this.state ={
	// 		buttonDisable: true,
	// 		// zoomFromSidebar: this.props.zoomFromSidebar, 
	// 		// zoomLocationData: this.props.zoomLocationData,
	// 		// zoomLocationCoord: this.props.zoomLocationCoord
	// 	}
	// }

	// useEffect(() => {
	// 	if (zoomFromSidebar) {
	// 		test()
	// 	}

	// }, [zoomFromSidebar])

	// const test = () => {
	// 	// console.log('test')
	// 	setButtonDisable(false)
	// }


		const markers = geo_venues.map((venue, index) => (
			<Marker
				key={index}
				position={venue.geoLocation} 
				icon={VenueLocationIcon}
				// eventHandlers={{ click: test }}
				onClick = {() =>  
					setButtonDisable(false)
				}
			>
				<MarkerPopup data={venue} buttonState={buttonDisable}
				/>
			</Marker>

		));
        return (
			<div>
				<Fragment>{markers}</Fragment>;
			</div>

		)
    }