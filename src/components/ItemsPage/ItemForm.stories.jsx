import React from "react";
import { ItemForm } from "./ItemForm";
import { action } from "@storybook/addon-actions";

// // // //

export default {
  title: "Chapters/Chapter 12 - Presentation Layer/Components/ItemForm",
  component: ItemForm,
};

function ItemFormStory({ loading = false, label = "" }) {
  const [labelVal, setLabel] = React.useState(label);
  return (
    <ItemForm
      label={labelVal}
      setLabel={setLabel}
      loading={loading}
      onSubmit={action("on-submit")}
    />
  );
}

export const Render = () => <ItemFormStory loading={false} />;
export const Populated = () => (
  <ItemFormStory loading={false} label="New Item" />
);
export const Loading = () => <ItemFormStory loading={true} />;
