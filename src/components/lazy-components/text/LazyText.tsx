import { MantineSize, Text, TextProps } from "@mantine/core";
import LazyHighlight from "../highlight/LazyHighlight";
import React from "react";

type LazyTextProps = {
  text: string | number;
  size?: MantineSize;
  highlight?: string | number;
  textColor?: string;
  highlightColor?: string;
  highlightBg?: string;
  highlightSize?: MantineSize;
  highlightVariant?: "text" | "box";
} & TextProps;

function LazyText({
  text,
  highlight = "",
  textColor = "black",
  highlightBg,
  highlightColor,
  highlightSize = "md",
  highlightVariant = "text",
  ...textProps
}: LazyTextProps) {
  const textStr = String(text);
  const highlightStr = String(highlight);

  const highlightRegex = new RegExp(`(${highlightStr})`, "gi");

  const parts = textStr.split(highlightRegex);

  return (
    <Text c={textColor} {...textProps}>
      {parts.map((part, index) => {
        const isHighlighted = part.toLowerCase() === highlightStr.toLowerCase();

        return (
          <React.Fragment key={index}>
            {isHighlighted ? (
              <LazyHighlight
                size={highlightSize}
                text={part}
                c={highlightColor}
                bg={highlightBg}
                variant={highlightVariant}
              />
            ) : (
              part
            )}
          </React.Fragment>
        );
      })}
    </Text>
  );
}

export default LazyText;
