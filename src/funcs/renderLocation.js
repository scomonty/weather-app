
import React from 'react';
import LocationDetail from '../components/LocationDetail';

const renderLocation = (args) => {
    if (args.hasOwnProperty('properties')) {
        return <LocationDetail location={args.properties.relativeLocation.properties} />
    }
}

export default renderLocation;