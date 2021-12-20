import {
    CheckCircleIcon,
    CheckIcon,
    PencilAltIcon,
    PencilIcon,
    TrashIcon,
    XCircleIcon,
    XIcon,
} from "@heroicons/react/solid";
import React from "react";

function InlineForm(props) {
    const [label, setLabel] = React.useState(props.label);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit({ label });
            }}
            className="flex gap-3"
        >
            <input
                value={label}
                data-testid="label-input"
                placeholder="Label"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border border-gray-300 rounded-md px-3"
                onChange={(e) => {
                    setLabel(e.currentTarget.value);
                }}
            />
            <button
                type="submit"
                data-testid="submit-button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit
            </button>
            <button
                data-testid="close-button"
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                    props.onCancel();
                }}
            >
                Cancel
            </button>
        </form>
    );
}

/**
 * TODO - annotate this component, see if docs get to work in MDX.
 * TODO - also get the JSDOC headers working correctly here, if I can!
 * @param {*} props
 * @returns
 */
export function ListItem(props) {
    const { item, loading } = props;
    const [showingForm, setShowingForm] = React.useState(false);

    return (
        <li
            key={item.label}
            className="bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between h-16 select-none"
        >
            {showingForm && (
                <InlineForm
                    label={item.label}
                    onSubmit={({ label }) => {
                        props.updateItem({
                            ...item,
                            label,
                        });
                        setShowingForm(false);
                    }}
                    onCancel={() => {
                        setShowingForm(false);
                    }}
                />
            )}
            {!showingForm && (
                <React.Fragment>
                    <div className="flex items-center gap-3">
                        <button
                            disabled={loading}
                            className="outline-none focus:outline-none"
                            onClick={() => {
                                props.updateItem({
                                    ...item,
                                    done: !item.done,
                                });
                            }}
                        >
                            {item.done ? (
                                <CheckCircleIcon className="w-8 h-8 text-green-500 hover:text-green-600" />
                            ) : (
                                <XCircleIcon className="w-8 h-8" />
                            )}
                        </button>
                        <span className="text-lg">{item.label}</span>
                        <button
                            data-testid="edit-button"
                            // className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            className="text-indigo-700 hover:text-indigo-800 outline-none focus:outline-none"
                            onClick={() => {
                                setShowingForm(true);
                            }}
                        >
                            <PencilIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        disabled={loading}
                        onClick={() => {
                            props.deleteItem(item);
                        }}
                        type="button"
                        class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <TrashIcon className="w-3 h-3" />
                    </button>
                </React.Fragment>
            )}
        </li>
    );
}
