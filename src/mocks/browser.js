// src/mocks/browser.js
// import { setupWorker } from "msw";
// import { handlers } from "./handlers";

export const handlers = [];

// NOTE - this works in jest w/ Storyshots
export let worker = {
  use: (mock) => {
    console.log("worker.use invoked");
    handlers.push(mock);
  },
  start: () => {
    console.log("worker.start invoked");
  },
};

// // .storybook/preview.js
if (typeof global.process === "undefined") {
  const { setupWorker } = require("msw");
  // worker = setupWorker(...handlers);
  worker = setupWorker(...[]);
}
// } else {
//   console.log("server detected!");
//   //   const { setupServer } = require("msw/node");
//   //   //   worker = setupServer(...handlers);
//   //   worker = setupServer(...handlers);
// }

// export function getWorker() {
// }

// TODO - add section on global mocks
// Now, let’s enable API mocking globally in Storybook by editing the.storybook / preview.js
// file to conditionally require the worker and start it:
// export const worker = setupWorker(...handlers);

// // // //

// src/mocks/browser.js
// NOTE - this doesn't work with Jest + Storyshots
// import { setupWorker } from "msw";
// import { handlers } from "./handlers";

// // TODO - add section on global mocks
// // Now, let’s enable API mocking globally in Storybook by editing the.storybook / preview.js
// // file to conditionally require the worker and start it:
// export const worker = setupWorker(...handlers);
