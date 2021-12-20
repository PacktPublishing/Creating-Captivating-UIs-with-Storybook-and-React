import React from "react";
import { ListFetcher } from "./ListFetcher";
import { ItemUpdater } from "./ItemUpdater";
import { ItemDeleter } from "./ItemDeleter";
import { ItemCreator } from "./ItemCreator";
import { ItemListError } from "./ItemListError";
import { ListPageLayout } from "./ListPageLayout";
import { ItemList } from "./ItemList";
import { ListItem } from "./ListItem";
import { ItemForm } from "./ItemForm";

// // // //

// TODO - give this all a once-cover
// TODO - think about how you'd split this up a bit more!
export function ListPage() {
    const [label, setLabel] = React.useState("");

    return (
        <ListPageLayout>
            <ListFetcher>
                {({ items, loading, error, refetchItems }) => {
                    // TODO - improve error handling - add dedicated component!
                    if (error) {
                        return <ItemListError />;
                    }

                    return (
                        <React.Fragment>
                            <ItemCreator>
                                {({ createItem, loading: creating }) => (
                                    <ItemForm
                                        label={label}
                                        setLabel={setLabel}
                                        loading={creating}
                                        onSubmit={() => {
                                            createItem({ label, done: false })
                                                .then(() => {
                                                    setLabel(""); // Clear hoisted `label` state
                                                    refetchItems();
                                                })
                                                .catch(() => {
                                                    alert(
                                                        "Error creating item",
                                                    );
                                                });
                                        }}
                                    />
                                )}
                            </ItemCreator>

                            <ItemUpdater>
                                {({ updateItem, loading: updating }) => (
                                    <ItemDeleter>
                                        {({
                                            deleteItem,
                                            loading: deleting,
                                        }) => (
                                            <ItemList
                                                items={items}
                                                loading={loading}
                                            >
                                                {({ item }) => (
                                                    <ListItem
                                                        item={item}
                                                        loading={
                                                            updating || deleting
                                                        }
                                                        updateItem={(
                                                            itemToUpdate,
                                                        ) => {
                                                            updateItem(
                                                                itemToUpdate,
                                                            )
                                                                .then(() =>
                                                                    refetchItems(),
                                                                )
                                                                .catch(() => {
                                                                    alert(
                                                                        "Error updating item",
                                                                    );
                                                                    refetchItems();
                                                                });
                                                        }}
                                                        deleteItem={() => {
                                                            const confirmed = confirm(
                                                                "Are you sure you want to delete this item?",
                                                            );
                                                            if (
                                                                confirmed ===
                                                                false
                                                            ) {
                                                                return;
                                                            }

                                                            deleteItem(item)
                                                                .then(() =>
                                                                    refetchItems(),
                                                                )
                                                                .catch(() => {
                                                                    alert(
                                                                        "Error deleting item",
                                                                    );
                                                                    refetchItems();
                                                                });
                                                        }}
                                                    />
                                                )}
                                            </ItemList>
                                        )}
                                    </ItemDeleter>
                                )}
                            </ItemUpdater>
                        </React.Fragment>
                    );
                }}
            </ListFetcher>
        </ListPageLayout>
    );
}
