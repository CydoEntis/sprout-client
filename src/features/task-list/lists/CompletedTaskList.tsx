import CompletedTaskListCard from "../cards/CompletedTaskListCard";
import GridList from "../../../components/GridList";

function CompletedTaskList() {
  return (
    <GridList>
      <CompletedTaskListCard />
      <CompletedTaskListCard />
      <CompletedTaskListCard />
    </GridList>
  );
}

export default CompletedTaskList;
