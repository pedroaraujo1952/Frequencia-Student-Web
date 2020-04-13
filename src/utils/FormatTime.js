export default function formatTime(time) {
  time = time.split("h");

  let hours = time[0],
    minutes = time[1];

  if (time[0].length < 2) hours = "0" + time[0];
  if (time[1].length < 2) minutes = "0" + time[1];

  return hours + "h" + minutes;
}
