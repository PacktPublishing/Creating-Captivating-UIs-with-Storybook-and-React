import React from "react";
import { action } from "@storybook/addon-actions";
import { ListItem } from "./ListItem";
import { ItemList } from "./ItemList";
import { ListPageLayout } from "./ListPageLayout";
import { ITEMS } from "./test_state";

// // // //

export default {
  title: "Chapters/Chapter 12 - Presentation Layer/Components/ListPage",
};

// // // //

function ListPage({ loading }) {
  return (
    <ListPageLayout>
      <ItemList items={ITEMS}>
        {({ item }) => (
          <ListItem
            item={item}
            loading={loading}
            updateItem={action("update-item")}
            deleteItem={action("delete-item")}
          />
        )}
      </ItemList>
    </ListPageLayout>
  );
}

// // // //

export const Render = () => <ListPage loading={false} />;
export const Loading = () => <ListPage loading={true} />;
