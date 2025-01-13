import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import { Box, Checkbox, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import classes from "./DndListHandle.module.css";
import { GripVertical } from "lucide-react";

const data = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export function DndListHandle() {
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        // <div
        //   className={cx(classes.item, {
        //     [classes.itemDragging]: snapshot.isDragging,
        //   })}
        //   ref={provided.innerRef}
        //   {...provided.draggableProps}
        // >
        <Box
          p={8}
          bg="red"
          style={{ border: "1px solid red" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Flex w="100%" justify="space-between" align="center">
            <Box>
              <Group gap={8} align="center">
                <Checkbox />
                <Text fw={600}>Peanut Butter</Text>
              </Group>
            </Box>
            <Box
              {...provided.dragHandleProps}
              className={classes.dragHandle}
              py={16}
            >
              {/* <IconGripVertical size={18} stroke={1.5} /> */}
              <GripVertical size={20} />
            </Box>
          </Flex>
        </Box>
        // </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        <Stack gap={8}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Stack>
      </Droppable>
    </DragDropContext>
  );
}
