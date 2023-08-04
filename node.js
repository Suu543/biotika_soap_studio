// EventEmitter(emit = 전송한다 보낸다 = dispatch = send = response = )
// on = 받겠다.
// emit = 보내겠다
// 1. 이벤트 설정한다
// 2. 설정한 이벤트에 동작이 발생하면, 해당 동작에 맞춰서 일처리를 한다.
// Ex) "click", "keydown"
// const EventEmitter = require("node:events");
// const myEmitter = new EventEmitter();

// myEmitter.on("sangho", () => {
//   console.log("sangho event is fired! first");
// });

// myEmitter.on("sangho", () => {
//   console.log("sangho event is fired! second");
// });

// myEmitter.on("sangho", () => {
//   console.log("sangho event is fired! third");
// });

// myEmitter.emit("sangho");

class CozyEmitter {
  // this = {};

  constructor() {
    this.events = {};
  }

  // listener = controller = handler
  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => listener());
    }
  }
}

cozy = new CozyEmitter();

cozy.on("sangho", () => console.log("First"));
cozy.on("sangho", () => console.log("Second"));
cozy.on("sangho", () => console.log("Third"));

cozy.emit("sangho");
