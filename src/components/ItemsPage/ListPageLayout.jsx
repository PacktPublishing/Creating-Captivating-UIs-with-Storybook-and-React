import React from "react";

// // // //

// TODO - add loading to this? just for update + delete?
export function ListPageLayout(props) {
    return (
        <div className="flex justify-center w-full mt-3">
            <div style={{ width: "48rem" }} className="max-w-full">
                <h1 className="text-2xl mb-3">ToDo List</h1>
                {props.children}
            </div>
        </div>
    );
}
