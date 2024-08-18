"use client";

import { store } from "@/store/index";
import { Provider } from "react-redux";
import { ReactNode } from "react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>{children}</Provider>
    );
};

export default ReduxProvider;