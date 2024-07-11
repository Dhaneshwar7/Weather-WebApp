export default function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'July',
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
	if (hours > 12) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var todayDateTime = {
		toDay: day + ' , ' + date + ' ' + month,
		currenTime: hours + 2 + ' : ' + min,
		time: date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec,
	};
	// console.log(a);
	return todayDateTime;
}
