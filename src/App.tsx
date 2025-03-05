import { Stack, Title } from "@mantine/core";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features-new/farm/components/FarmProgress";

function App() {
  const { user } = useAuthStore();

  // if (!user && isPending) return <div>Loading...</div>;
  // if (isPending) return <div>Loading...</div>;

  return (
    <>
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user?.username}</Title>
        <FarmProgress />
      </Stack>

      {/* <TaskListTabs onOpenNewList={onOpenNewList} /> */}
    </>
  );
}

export default App;
