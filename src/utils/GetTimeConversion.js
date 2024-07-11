export default function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	var year = a.getFullYear();
	var day = days[a.getDay()];
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var hours = a.getHours();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	if (hours > 12) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}
	var min = a.getMinutes();
	min = min < 10 ? '0' + min : min; // Add leading zero if needed
	var sec = a.getSeconds();
	sec = sec < 10 ? '0' + sec : sec; // Add leading zero if needed
	var todayDateTime = {
		toDay: day + ' , ' + date + ' ' + month,
		currenTime: hours + ' : ' + min + ' ' + ampm,
		time: date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec,
	};
	return todayDateTime;
}
