
const TimeStamp = (time) => {
	let cut = time.slice(11,13);

	if (cut >= 13) {
		return cut = cut - 12 + ' PM';
	}
	else if (cut == 0) {
		return cut = 12 + ' AM';
	}
	else if (cut < 12){
		if(cut.charAt( 0 ) === '0') {
		 return cut = cut.slice( 1 ) + ' AM'
		}
		 return cut = cut + ' AM';
	}
		return cut = cut + ' PM'
}

export default TimeStamp;