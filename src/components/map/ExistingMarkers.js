import React, {
	Fragment,
	Component
} from 'react';
import { Marker } from 'react-leaflet';
import { VenueLocationIcon } from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';
 


export default class ExistingMarkers extends Component {
	constructor(props){
		super(props);
		this.state ={
			buttonDisable: true,
		}
	}

	render(){
		const { geo_venues} = this.props;
		const {buttonDisable } = this.state;

		const markers = geo_venues.map((venue, index) => (

			<Marker
				key={index}
				position={venue.geoLocation} 
				icon={VenueLocationIcon}
				onClick = {() =>  
					this.setState({buttonDisable: false})
				}
			>
				<MarkerPopup data={venue} buttonState={buttonDisable} />
			</Marker>

		));
        return (
			<div>
				<Fragment>{markers}</Fragment>;
			</div>
		)
    }
}