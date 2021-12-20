import { rest } from "msw";

// // // //

// Modularize mocks
export const createItemSuccess = rest.post("/api/items", (_req, res, ctx) => {
  return res(
    ctx.delay(1200),
    ctx.json({ id: 222, label: "Clean", done: false })
  );
});

export const createItemLoading = rest.post("/api/items", (_req, res, ctx) => {
  // Mock an infinite loading state
  return res(ctx.delay("infinite"));
});

export const createItemError = rest.post("/api/items", (_req, res, ctx) => {
  // Respond with a 500 response status code.
  return res(ctx.delay(1200), ctx.status(500));
});
