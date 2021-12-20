import React from "react";
import { ListPage } from "./ListPage";
import { Navbar } from "../Navbar";
import { rest } from "msw";
import { worker } from "../../mocks/browser";

// // // //

export default {
    title:
        "Chapters/Chapter 14 - Integrating API Layer and Presentation Layers/Components/ListPage",
    parameters: {
        layout: "fullscreen",
    },
    // Make a TODO about abstracting this decorator!
    decorators: [
        (Story) => (
            <div>
                <Navbar />
                <div className="flex justify-center w-full mt-3">
                    <Story />
                </div>
            </div>
        ),
    ],
};

// // // //

// Define initial items for page
// TODO - move into test state, yeah?
let ITEMS = [
    { id: 111, label: "Eat", done: true },
    { id: 222, label: "Sleep", done: true },
    { id: 333, label: "Code", done: false },
];

export const Render = () => <ListPage />;
Render.decorators = [
    (Story) => {
        // ListFetcher mocks
        worker.use(
            rest.get("/api/items", (req, res, ctx) => {
                return res(ctx.delay(250), ctx.json(ITEMS));
            }),
        );

        // ItemCreator Mocks
        worker.use(
            rest.post("/api/items", (req, res, ctx) => {
                const newItem = { id: Math.random().toString(), ...req.body };
                ITEMS = [...ITEMS, newItem];
                return res(ctx.delay(250), ctx.json(newItem));
            }),
        );

        // ItemUpdater Mocks
        worker.use(
            rest.put("/api/items/:itemID", (req, res, ctx) => {
                const updatedItem = { ...req.body };

                // Replace item in ITEMS array
                ITEMS = ITEMS.map((i) => {
                    if (i.id === updatedItem.id) {
                        return updatedItem;
                    }
                    return i;
                });

                return res(ctx.delay(250), ctx.json(updatedItem));
            }),
        );

        // ItemDeleter Mocks
        worker.use(
            rest.delete("/api/items/:itemID", (req, res, ctx) => {
                const itemID = Number(req.params.itemID);

                // Remove item from ITEMS array
                const deletedItem = ITEMS.find((i) => i.id === itemID);
                ITEMS = ITEMS.filter((i) => i.id !== itemID);
                return res(ctx.delay(250), ctx.json(deletedItem));
            }),
        );

        return <Story />;
    },
];
