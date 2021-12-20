import React from "react";
import {
    createItemSuccess,
    createItemLoading,
    createItemError,
} from "./api_mocks";
import { ItemCreator } from "./ItemCreator";
import { worker } from "../../mocks/browser";

// // // //

const title =
    "Chapters/Chapter 13 - API Layer Components/Components/ItemCreator";

export default {
    title,
    component: ItemCreator,
};

// // // //

// TODO - annotate this
// QUESTION - is there a better way to accomplish this using Template.bind?
function ItemCreatorLayout() {
    const [response, setResp] = React.useState(null);
    return (
        <ItemCreator>
            {({ createItem, loading, error }) => {
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
                                createItem({
                                    label: "Clean",
                                    done: false,
                                }).then((resp) => setResp(resp));
                            }}
                        >
                            Create Item
                        </button>
                    </div>
                );
            }}
        </ItemCreator>
    );
}

// // // //

// Success State
export const Success = () => <ItemCreatorLayout />;
Success.decorators = [
    (Story) => {
        worker.use(createItemSuccess);
        return <Story />;
    },
];

// Loading State
export const Loading = () => <ItemCreatorLayout />;
Loading.decorators = [
    (Story) => {
        worker.use(createItemLoading);
        return <Story />;
    },
];

// Error State
export const Error = () => <ItemCreatorLayout />;
Error.decorators = [
    (Story) => {
        worker.use(createItemError);
        return <Story />;
    },
];
