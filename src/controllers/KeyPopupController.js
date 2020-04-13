export function timeNow() {
  var date = new Date();
  var time_now = "";

  if (date.getHours() < 10) time_now = "0" + date.getHours().toString();
  else time_now = date.getHours().toString();

  if (date.getMinutes() < 10)
    time_now += "h0" + date.getMinutes().toString() + "min";
  else time_now += "h" + date.getMinutes().toString() + "min";

  return time_now;
}

export function compareTime(event) {
  if (event.keys.key1.time === timeNow()) {
    return [true, event, "1"];
  } else if (event.keys.key2.time === timeNow()) {
    return [true, event, "2"];
  } else if (event.keys.key3.time === timeNow()) {
    return [true, event, "3"];
  }

  return [false, null, ""];
}

export function areKeysInEvent(event) {
  if (
    event.keys.key1 !== "" ||
    event.keys.key2 !== "" ||
    event.keys.key3 !== ""
  )
    return true;

  return false;
}

export function compareBetweenEvents(event1, event2) {
  var hourEvent1 = parseInt(event1.substring(0, 2));
  var minutesEvent1 = parseInt(event1.substring(3, 5));

  var hourEvent2 = parseInt(event2.substring(0, 2));
  var minutesEvent2 = parseInt(event2.substring(3, 5));

  return (hourEvent2 - hourEvent1) * 60 + (minutesEvent2 - minutesEvent1);
}

export function nextEvent(events) {
  var next_event = null;
  events.forEach((event) => {
    var dif = compareBetweenEvents(event.begin, timeNow());

    if (dif <= 50) {
      if (next_event !== null) {
        dif = compareBetweenEvents(event.begin, next_event.begin);
        if (dif > 0) next_event = event;
      } else {
        next_event = event;
      }
    }
  });
  return next_event;
}

export function popupText(event) {
  var subject = event.subject;
  var description = event.description;

  if (description.length > 12) {
    description = description.substring(0, 12) + "...";
  }

  var message = subject + ": " + description;

  return message;
}

export function compareKeys(event, key_input, key_number) {
  if (key_number === "1") {
    if (event.keys.key1.key === key_input) return true;
  } else if (key_number === "2") {
    if (event.keys.key2.key === key_input) return true;
  } else if (key_number === "3") {
    if (event.keys.key3.key === key_input) return true;
  }
  return false;
}

export function createMessageRequest(event, student_uid, key_number) {
  var data = {};

  if (key_number === "palavra-passe 1") {
    data = {
      key1: "ok",
    };
  } else if (key_number === "palavra-passe 2") {
    data = {
      key2: "ok",
    };
  } else if (key_number === "palavra-passe 3") {
    data = {
      key3: "ok",
    };
  }

  var messageRequest = `professores/${event.teacherUID}/events/${event.turma}/${event.eventID}/students/${student_uid}/keys`;

  return [messageRequest, data];
}
