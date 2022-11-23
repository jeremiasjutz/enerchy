import resizeObserver from "resize-observer-polyfill";
import { render, screen } from "@testing-library/react";
import Controls from "../components/Controls";

global.ResizeObserver = resizeObserver;

describe("Controls", () => {
  it("has correct slider values", () => {
    render(<Controls />);

    expect(
      screen.getByRole("slider", {
        name: /minimum/i,
      }).textContent
    ).toEqual("0");
    expect(
      screen.getByRole("slider", {
        name: /maximum/i,
      }).textContent
    ).toEqual("1");
  });
});
