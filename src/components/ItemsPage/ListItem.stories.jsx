import React from "react";
import { ListItem } from "./ListItem";
import { action } from "@storybook/addon-actions";
import { within, userEvent } from "@storybook/testing-library";
import { ITEM_01, ITEM_02 } from "./test_state";

export default {
  title: "Chapters/Chapter 12 - Presentation Layer/Components/ListItem",
  component: ListItem,
  args: {
    item: ITEM_01,
    loading: false,
    updateItem: action("update-item"),
    deleteItem: action("delete-item"),
  },
};

const Template = (args) => <ListItem {...args} />;

export const Done = Template.bind();

export const NotDone = Template.bind();
NotDone.args = {
  item: ITEM_02,
};

export const Loading = Template.bind();
Loading.args = {
  loading: true,
};

export const EditFlow = Template.bind();
EditFlow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId("edit-button"));
  await userEvent.type(canvas.getByTestId("label-input"), "Updated Label", {
    delay: 50,
  });
  await userEvent.click(canvas.getByTestId("submit-button"));
};
