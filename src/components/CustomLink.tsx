import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { Anchor, AnchorProps } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MantineAnchorProps extends Omit<AnchorProps, "href"> {}

const MantineLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  MantineAnchorProps
>((props, ref) => {
  return <Anchor ref={ref} {...props} underline="never"/>;
});

const CreatedLinkComponent = createLink(MantineLinkComponent);

export const CustomLink: LinkComponent<typeof MantineLinkComponent> = (
  props
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
