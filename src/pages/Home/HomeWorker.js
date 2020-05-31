/* eslint-disable no-restricted-globals */
export default () => {
    function timeNow() {
        var date = new Date().toUTCString();
      
        date = updateTime(date.split(" ")[4]);
      
        var time_now = date.substring(0, 2) + "h" + date.substring(3, 5) + "min";
        return time_now;
    }
    
    function updateTime(date) {
        var hour = parseInt(date.substring(0, 2));
      
        hour -= 4;
      
        if (hour < 10 && hour >= 0) hour = "0" + hour.toString();
        else if (hour < 0) hour = 24 + hour;
        else hour = hour.toString();
      
        hour += date.substring(2, date.length);
      
        return hour;
    }

    function compareBetweenEvents(event1, event2) {
        var hourEvent1 = parseInt(event1.substring(0, 2));
        var minutesEvent1 = parseInt(event1.substring(3, 5));
      
        var hourEvent2 = parseInt(event2.substring(0, 2));
        var minutesEvent2 = parseInt(event2.substring(3, 5));
      
        return (hourEvent2 - hourEvent1) * 60 + (minutesEvent2 - minutesEvent1);
    }

    let key_is_done = false, key_is_recently_done = "";

    self.addEventListener('message', function(e) {
        if (e.data[0] !== "key_is_recently_done") {
            var interval = this.setInterval(() => {
                var key_number = "", time_now = timeNow();
                
                if (compareBetweenEvents(time_now, e.data.event.begin) < 0 &&
                    compareBetweenEvents(time_now, e.data.event.end) > 0) {
                    if (e.data.event.keys.key1.time === time_now) key_number = "1";
                    else if (e.data.event.keys.key2.time === time_now) key_number = "2";
                    else if (e.data.event.keys.key3.time === time_now) key_number = "3";

                    let workerResult = [false, null, ""];

                    if (key_number !== "") {
                        if (key_number !== key_is_recently_done) {
                            key_is_recently_done = "";
                            key_is_done = false;
                        }
                        if (!key_is_done) workerResult = [true, e.data, key_number];
                    } else key_is_done = false;

                    self.postMessage(workerResult);
                } else if (compareBetweenEvents(time_now, e.data.event.begin) < 0 &&
                    compareBetweenEvents(time_now, e.data.event.end) < 0) {
                        clearInterval(interval);
                    }
            }, 1000);
        }
    }, false);

    self.onmessage = function(e) {
        if (e.data[0] === "key_is_recently_done") {
            key_is_recently_done = e.data[1];
            key_is_done = true;
        }
    }
}