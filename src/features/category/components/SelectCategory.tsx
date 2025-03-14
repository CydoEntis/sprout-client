import { Select, Button, Flex } from "@mantine/core";
import { Category } from "../shared/category.types";


type SelectCategoryProps = {
  categories: Category[];
};

const SelectCategory = ({ categories }: SelectCategoryProps) => (
  <>
    <Flex gap={8} align="end">
      <Select
        w="80%"
        classNames={{
          input: "input",
        }}
        label="Add to a Category"
        placeholder="Choose a category"
        data={categories.map((category) => ({
          value: String(category.id),
          label: category.name,
        }))}
        required
      />
      <Button variant="light" color="lime" w="20%">
        Add
      </Button>
    </Flex>
  </>
);

export default SelectCategory;
