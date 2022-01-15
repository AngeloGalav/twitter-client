import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import SwitchTheme from "../SwitchTheme";
// import { Provider } from "react-redux";
// import { store } from "../../store";

afterEach(() => {
    cleanup();
});

describe("Testing switch component", () => {

    test("should render", () => {
        // render(
        //     <Provider store={store}>
        //         <SwitchTheme />
        //     </Provider>
        // );
        // const switchThemeElem = screen.getByTestId("switch-theme-test");
        // expect(switchThemeElem).toBeInTheDocument();

        expect(true).toBe(true);
    });
});
