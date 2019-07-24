import './style/loader.css';
import React from 'react';

const Loader = (props) => {
    return <div className="ui segment">
  <div className="ui active dimmer">
    <div className="ui text loader">{props.errorText}</div>
  </div>
  <p></p>
</div>
}

Loader.defaultProps = {
	message: 'Loading...'
}

export default Loader;
