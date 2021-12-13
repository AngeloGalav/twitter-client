import React, { Children } from "react";

const NavigationTab = (props) => {
    return (
        <div
            style={{ maxWidth: "10rem" }}
            tabIndex="0"
            onFocus={() => props.setSelectedTab(props.tab)}
            class={`${
                props.selectedTab === props.tab ? "tab-active tab-bordered" : ""
            } tab h-full flex-1 transition-all duration-200 ease-linear`}
        >
            <i className={`bi ${props.icon} text-2xl relative`}>{props.children}</i>
            
        </div>
    );
};

export default NavigationTab;
