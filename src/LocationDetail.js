import './style/LocationDetail.css';
import React from 'react';

const LocationDetail = ({location}) => {
	return (
<div className="location">{location.city}</div>
		)
}


export default LocationDetail;
