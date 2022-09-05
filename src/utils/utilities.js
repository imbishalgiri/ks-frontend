export const getTimeDiff = (datetime) => {
  var datetime =
    typeof datetime !== "undefined" ? datetime : "2014-01-01 01:02:03.123456";

  var datetime = new Date(datetime).getTime();
  var now = new Date().getTime();

  if (isNaN(datetime)) {
    return "";
  }
  if (datetime < now) {
    var milisec_diff = now - datetime;
  } else {
    var milisec_diff = datetime - now;
  }

  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

  var date_diff = new Date(milisec_diff);

  if (days) {
    return days === 1 ? days + " day ago" : days + " days ago";
  }
  if (date_diff.getHours()) {
    const time = date_diff.getHours();
    return time > 1 ? time + " hours ago" : time + " hour ago";
  }

  if (date_diff.getMinutes()) {
    const time = date_diff.getMinutes();
    return time > 1 ? time + " minutes ago" : time + " minute ago";
  }
  return "just now";
};
