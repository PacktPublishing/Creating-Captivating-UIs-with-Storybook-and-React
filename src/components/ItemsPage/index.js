import React from "react";
import { ListFetcher } from "../../Chapter13/components/ListFetcher";
import { ItemUpdater } from "../../Chapter13/components/ItemUpdater";
import { ItemDeleter } from "../../Chapter13/components/ItemDeleter";
import { ItemCreator } from "../../Chapter13/components/ItemCreator";
import { ItemListError } from "../../Chapter12/components/ItemListError";
import { ListPageLayout } from "../../Chapter12/components/ListPageLayout";
import { ItemList } from "../../Chapter12/components/ItemList";
import { ListItem } from "../../Chapter12/components/ListItem";
import { ItemForm } from "../../Chapter12/components/ItemForm";

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
