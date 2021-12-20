import React from "react";
import { PlusIcon } from "@heroicons/react/solid";

/**
 * TODO - annotate this component
 * NOTE - this component uses controlled input + hoisted state to encapsulate the current label of the new item
 * TODO - add FORMS to earlier chapter
 * @param {*} props
 * @returns
 */
export function ItemForm(props) {
    const { label, setLabel, loading, onSubmit } = props;
    const disableSubmit = label.trim() === "" || loading;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="flex justify-between gap-3"
        >
            <input
                type="text"
                placeholder="Item Label"
                value={label}
                disabled={loading}
                onChange={(e) => {
                    const updatedLabel = e.currentTarget.value;
                    setLabel(updatedLabel);
                }}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 select-none"
                // disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
            />
            <button
                type="submit"
                disabled={disableSubmit}
                className="createButton"
            >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Item
            </button>
        </form>
    );
}
