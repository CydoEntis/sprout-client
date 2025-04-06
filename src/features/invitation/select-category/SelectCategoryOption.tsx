import { Select, Button, Flex } from "@mantine/core";
import { Category } from "../shared/category.types";
import { useForm } from "@mantine/form";

type SelectCategoryOptionProps = {
  categories: Category[];
  onSelect: (categoryId: number) => void;
};

const SelectCategoryOption = ({ categories, onSelect }: SelectCategoryOptionProps) => {
  const form = useForm({
    initialValues: {
      categoryId: "",
    },
  });

  const handleSubmit = (values: { categoryId: string }) => {
    const categoryId = Number(values.categoryId);
    if (!isNaN(categoryId)) {
      onSelect(categoryId);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex gap={8} align="end">
        <Select
          w="80%"
          classNames={{ input: "input" }}
          label="Add to a Category"
          placeholder="Choose a category"
          data={categories.map((category) => ({
            value: String(category.id),
            label: category.name,
          }))}
          {...form.getInputProps("categoryId")}
          required
        />
        <Button type="submit" variant="light" color="lime" w="20%">
          Add
        </Button>
      </Flex>
    </form>
  );
};

export default SelectCategoryOption;
