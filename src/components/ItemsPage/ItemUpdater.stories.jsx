import React from "react";
import { rest } from "msw";
import { ItemUpdater } from "./ItemUpdater";
import { worker } from "../../mocks/browser";

// // // //

const title =
    "Chapters/Chapter 13 - API Layer Components/Components/ItemUpdater";

export default {
    title,
    component: ItemUpdater,
};

// // // //

// TODO - annotate this
// QUESTION - is there a better way to accomplish this using Template.bind?
function ItemUpdaterLayout() {
    const [response, setResp] = React.useState(null);
    return (
        <ItemUpdater>
            {({ updateItem, loading, error }) => {
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
                                updateItem({
                                    id: 123,
                                    label: "Eat",
                                    done: false,
                                }).then((resp) => setResp(resp));
                            }}
                        >
                            Update Item
                        </button>
                    </div>
                );
            }}
        </ItemUpdater>
    );
}

// // // //

// buildUpdateMock
// Build an individual mock for the `ItemUpdater` component
// Used to add multiple mocks for routes with dynamic route parameters (i.e. /item.id)
function buildUpdateMock(item) {
    return rest.put(`/api/items/${item.id}`, (_req, res, ctx) => {
        return res(
            ctx.delay(1200),
            ctx.json({ id: item.id, label: item.label, done: !item.done }),
        );
    });
}

// Success State
export const Success = () => <ItemUpdaterLayout />;
Success.decorators = [
    (Story) => {
        worker.use(
            buildUpdateMock({
                id: 123,
                label: "Eat",
                done: false,
            }),
        );
        return <Story />;
    },
];

// Loading State
export const Loading = () => <ItemUpdaterLayout />;
Loading.decorators = [
    (Story) => {
        worker.use(
            rest.put("/api/items/123", (_req, res, ctx) => {
                // Mock an infinite loading state
                return res(ctx.delay("infinite"));
            }),
        );
        return <Story />;
    },
];

// Error State
export const Error = () => <ItemUpdaterLayout />;
Error.decorators = [
    (Story) => {
        worker.use(
            rest.put("/api/items/123", (_req, res, ctx) => {
                // Respond with a 500 response status code.
                return res(ctx.delay(1200), ctx.status(500));
            }),
        );
        return <Story />;
    },
];
