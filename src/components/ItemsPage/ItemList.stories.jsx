import React from "react";
import { ItemList } from "./ItemList";
import { ITEMS } from "./test_state";

// // // //

export default {
  title: "Chapters/Chapter 12 - Presentation Layer/Components/ItemList",
  component: ItemList,
};

export const Render = () => (
  <ItemList items={ITEMS} loading={false}>
    {({ item }) => <li>Item: {item.id}</li>}
  </ItemList>
);

export const Loading = () => (
  <ItemList items={[]} loading={true}>
    {({ item }) => <li>Item: {item.id}</li>}
  </ItemList>
);

export const Empty = () => (
  <ItemList items={[]} loading={false}>
    {({ item }) => <li>Item: {item.id}</li>}
  </ItemList>
);
