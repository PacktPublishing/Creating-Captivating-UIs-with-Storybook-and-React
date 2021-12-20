import "../src/styles/tailwind.css";

// USED???
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
};

// .storybook/preview.js
if (typeof global.process === "undefined") {
    const { worker } = require("../src/mocks/browser");
    worker.start();
}
// The global.process check ensures Storybook doesn’t attempt to activate the ServiceWorker in a non - browser
// environment, as preview.js also gets executed during the Storybook build that runs in Node.js.

// Applying basic global decorator
// export const decorators = [
//   (Story) => (
//     <div
//       style={{
//         padding: "1rem",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         border: "1px solid blue",
//       }}
//     >
//       <Story />
//     </div>
//   ),
// ];
