import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ButtonWithTranslation from "../components/oshikwanyama/ButtonWithTranslation";

describe("ButtonWithTranslation", () => {
  it("renders CTA and translated text", () => {
    const { getByText } = render(
      <ButtonWithTranslation cta="Start" translated="Onghala" />
    );

    expect(getByText("Start")).toBeTruthy();
    expect(getByText("Onghala")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ButtonWithTranslation cta="Start" translated="..." onPress={onPress} />
    );

    fireEvent.press(getByTestId("Start"));
    expect(onPress).toHaveBeenCalled();
  });
});
