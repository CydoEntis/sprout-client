import { Box, BoxProps, Burger, BurgerProps } from "@mantine/core";

interface LazyBurgerProps extends BoxProps {
  burgerProps?: BurgerProps;
}

function LazyBurger({ burgerProps, ...boxProps }: LazyBurgerProps) {
  return (
    <Box {...boxProps}>
      <Burger {...burgerProps} />
    </Box>
  );
}

export default LazyBurger;
