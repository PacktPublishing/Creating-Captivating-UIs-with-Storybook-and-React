import React from "react";
import { rest } from "msw";
import { ListFetcher } from "./ListFetcher";
import { worker } from "../../mocks/browser";

// // // //

const title =
    "Chapters/Chapter 13 - API Layer Components/Components/ListFetcher";

export default {
    title,
    component: ListFetcher,
};

// // // //

// TODO - annotate this
// QUESTION - is there a better way to accomplish this using Template.bind?
function ListFetcherLayout() {
    return (
        <ListFetcher>
            {({ items, loading, error, refetchItems }) => {
                return (
                    <div>
                        <pre>
                            {JSON.stringify({ items, loading, error }, null, 4)}
                        </pre>
                        <button
                            disabled={loading}
                            onClick={() => {
                                refetchItems();
                            }}
                        >
                            Refetch
                        </button>
                    </div>
                );
            }}
        </ListFetcher>
    );
}

// // // //

// Success State
export const Success = () => <ListFetcherLayout />;
Success.decorators = [
    (Story) => {
        worker.use(
            rest.get("/api/items", (req, res, ctx) => {
                return res(
                    ctx.delay(1200),
                    ctx.json([
                        { label: "Eat", done: true },
                        { label: "Sleep", done: true },
                        { label: "Code", done: false },
                    ]),
                );
            }),
        );
        return <Story />;
    },
];

// Loading State
export const Loading = () => <ListFetcherLayout />;
Loading.decorators = [
    (Story) => {
        worker.use(
            rest.get("/api/items", (req, res, ctx) => {
                // Mock an infinite loading state
                return res(ctx.delay("infinite"));
            }),
        );
        return <Story />;
    },
];

// Error State
export const Error = () => <ListFetcherLayout />;
Error.decorators = [
    (Story) => {
        worker.use(
            rest.get("/api/items", (req, res, ctx) => {
                // Respond with a 500 response status code.
                return res(ctx.delay(1200), ctx.status(500));
            }),
        );
        return <Story />;
    },
];
