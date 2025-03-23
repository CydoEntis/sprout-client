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
} & TextProps;

function LazyText({
  text,
  highlight = "",
  textColor = "black",
  highlightBg,
  highlightColor,
  highlightSize = "md",
  ...textProps
}: LazyTextProps) {
  const textStr = String(text);
  const highlightStr = String(highlight);

  const words = textStr.split(" ");
  const highlightWordsArray = highlightStr.split(" ");

  const variant = highlightBg ? "box" : "text";

  return (
    <Text c={textColor} {...textProps}>
      {words.map((word, index) => {
        const isHighlighted = highlightWordsArray.includes(word);

        return (
          <React.Fragment key={index}>
            {isHighlighted ? (
              <LazyHighlight
                size={highlightSize}
                text={word}
                color={highlightColor}
                bg={highlightBg}
                variant={variant}
              />
            ) : (
              <span>{word}</span>
            )}
            {index < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </Text>
  );
}

export default LazyText;
