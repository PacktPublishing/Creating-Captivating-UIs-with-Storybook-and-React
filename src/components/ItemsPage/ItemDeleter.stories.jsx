import React from "react";
import { rest } from "msw";
import { ItemDeleter } from "./ItemDeleter";
import { worker } from "../../mocks/browser";

// // // //

const title =
    "Chapters/Chapter 13 - API Layer Components/Components/ItemDeleter";

export default {
    title,
    component: ItemDeleter,
};

// // // //

// TODO - annotate this
// QUESTION - is there a better way to accomplish this using Template.bind?
function ItemDeleterLayout() {
    const [response, setResp] = React.useState(null);
    return (
        <ItemDeleter>
            {({ deleteItem, loading, error }) => {
                return (
                    <div>
                        <pre>
                            {JSON.stringify(
                                { loading, error, response },
                                null,
                                4,
                            )}
                        </pre>
                        <button
                            disabled={loading}
                            onClick={() => {
                                deleteItem({
                                    id: 123,
                                    label: "Eat",
                                    done: false,
                                }).then((resp) => setResp(resp));
                            }}
                        >
                            Delete Item
                        </button>
                    </div>
                );
            }}
        </ItemDeleter>
    );
}

// // // //

// Success State
export const Success = () => <ItemDeleterLayout />;
Success.decorators = [
    (Story) => {
        worker.use(
            rest.delete("/api/items/123", (_req, res, ctx) => {
                return res(
                    ctx.delay(1200),
                    ctx.json({ id: 123, label: "Eat", done: false }),
                );
            }),
        );
        return <Story />;
    },
];

// Loading State
export const Loading = () => <ItemDeleterLayout />;
Loading.decorators = [
    (Story) => {
        worker.use(
            rest.delete("/api/items/123", (_req, res, ctx) => {
                // Mock an infinite loading state
                return res(ctx.delay("infinite"));
            }),
        );
        return <Story />;
    },
];

// Error State
export const Error = () => <ItemDeleterLayout />;
Error.decorators = [
    (Story) => {
        worker.use(
            rest.delete("/api/items/123", (_req, res, ctx) => {
                // Respond with a 500 response status code.
                return res(ctx.delay(1200), ctx.status(500));
            }),
        );
        return <Story />;
    },
];
