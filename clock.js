// // 이벤트 기반의 아날로그 시계 만들기
// const now = new Date();
// console.log(now);
// // 시 추출
// const hours = now.getHours();
// console.log(hours);

// // 분 추출
// const minutes = now.getMinutes();
// console.log(minutes);

// // 초 추출
// const seconds = now.getSeconds();
// console.log(seconds);

const EventEmitter = require("node:events");

class Clock extends EventEmitter {
  // this = {}

  start() {
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      this.emit("second", seconds);

      if (seconds == 0) {
        this.emit("minute", minutes);
      }

      if (seconds == 0 && minutes == 0) {
        this.emit("hour", hours);
      }
    }, 1000);
  }
}

const clock = new Clock();

clock.on("second", (seconds) => {
  console.log(`현재 시각: ${formatTime(seconds)}`);
});

clock.on("minute", (minutes) => {
  console.log(`분이 바뀌었습니다: ${formatTime(minutes)}`);
});

clock.on("hour", (hours) => {
  console.log(`시간이 바뀌었습니다: ${formatTime(hours)}`);
});

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

clock.start();
