import { Stack, Title } from "@mantine/core";
import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/components/FarmProgress";

function App() {
  const { user } = useAuthStore();

  return (
    <>
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user?.username}</Title>
        <FarmProgress />
      </Stack>
    </>
  );
}

export default App;
