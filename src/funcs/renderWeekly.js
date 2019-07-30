import React from 'react';
import WeeklyDetail from '../components/WeeklyDetail';

const renderWeekly = (args) => {
    return args.map(weekly => <WeeklyDetail key={weekly.number} weekly={weekly} />); 
}

export default renderWeekly;