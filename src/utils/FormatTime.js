export function formatTime(time) {
  time = time.split("h");

  let hours = time[0],
    minutes = time[1];

  if (time[0].length < 2) hours = "0" + time[0];
  if (time[1].length < 2) minutes = "0" + time[1];

  return hours + "h" + minutes;
}

export function isTimeBetween(time1, now, time2) {
  now = now.replace("min", "");

  now = now.split("h");
  time2 = time2.split("h");
  time1 = time1.split("h");

  if (
    parseInt(time1[0]) < parseInt(now[0]) &&
    parseInt(now[0]) < parseInt(time2[0])
  ) {
    return true;
  } else if (
    parseInt(time1[0]) === parseInt(now[0]) ||
    parseInt(now[0]) === parseInt(time2[0])
  ) {
    if (
      parseInt(time1[1]) < parseInt(now[1]) ||
      parseInt(now[1]) < parseInt(time2[1])
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
