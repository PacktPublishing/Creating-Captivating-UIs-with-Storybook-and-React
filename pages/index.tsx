import { NextSeo } from "next-seo";
import React from "react";
import { ListPage } from "../src/components/ItemsPage/ListPage";

export default () => {
    return (
        <React.Fragment>
            <NextSeo
                title="Home"
                titleTemplate="React + TypeScript + Next.js Starter | %s"
                description="A starter codebase built with React + TypeScript + Next.js"
            />
            <ListPage />
        </React.Fragment>
    );
};
