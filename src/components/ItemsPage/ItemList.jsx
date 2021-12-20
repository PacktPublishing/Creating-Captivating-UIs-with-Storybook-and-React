import React from "react";

/**
 * Render list of items + loading for first fetch
 */
export function ItemList({ items, loading, children }) {
    if (items.length === 0 && loading) {
        return (
            <div className="mt-3 w-full">
                <div className="relative block w-full border-2 border-transparent rounded-lg p-12 text-center">
                    <span className="mt-2 block text-md font-medium text-gray-400">
                        Loading
                    </span>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="mt-3 w-full">
                <div className="relative block w-full border-2 border-gray-400 border-dashed rounded-lg p-12 text-center">
                    <span className="mt-2 block text-md font-medium text-gray-400">
                        No Items
                    </span>
                </div>
            </div>
        );
    }

    return (
        <ul className="space-y-3 mt-3 w-full">
            {items.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        {children({ item })}
                    </React.Fragment>
                );
            })}
        </ul>
    );
}
