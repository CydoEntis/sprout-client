import { useEffect, useState } from "react";
import { Flex, Stack, TextInput, Button, Select, Group, Text } from "@mantine/core";
import { Category, CreateCategory, SelectCategory } from "../../category/shared/category.types";
import { useForm } from "@mantine/form";
import { createCategorySchema, selectCategorySchema } from "../../category/shared/category.schemas";
import { zodResolver } from "@mantine/form";
import { useAcceptInviteMutation } from "../services/accept-invite.service";
import AssignmentToggle from "./AssignmentToggle";
import LazyIconPickerMenu from "../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { useDeclineInviteMutation } from "../services/decline-invite.service";
import { useNavigate } from "@tanstack/react-router";
import LazyColorPickerMenu from "../../../lazy-components/color-picker/LazyColorPickerMenu";
import { validColors } from "../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../util/constants/valid-icon.constants";
import { LazyValidIcon } from "../../../lazy-components/icon-picker/lazy-icon-picker.types";
import { ValidColor } from "../../../util/types/valid-color.types";

type AssignTasklistToCategoryFormProps = {
  categories: Category[];
  inviteToken: string;
  tasklistId: number;
};

function AssignTasklistToCategoryForm({ inviteToken, categories, tasklistId }: AssignTasklistToCategoryFormProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<LazyValidIcon>(validIcons[0]);
  const [selectedColor, setSelectedColor] = useState<ValidColor>(validColors[0]);
  const acceptInvite = useAcceptInviteMutation();
  const declineInvite = useDeclineInviteMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      setIsCreatingCategory(true);
    }
  }, [categories]);

  const form = useForm<CreateCategory | SelectCategory>({
    validate: zodResolver(isCreatingCategory ? createCategorySchema : selectCategorySchema),
    initialValues: isCreatingCategory
      ? {
          name: "",
          tag: validIcons[0].tag as (typeof validIconTags)[number],
          color: validColors[0],
        }
      : {
          id: 0,
          name: "",
        },
  });

  const iconSelectHandler = (icon: LazyValidIcon) => {
    setSelectedIcon(icon);
    form.setValues((currentValues) => ({ ...currentValues, tag: icon.tag as (typeof validIconTags)[number] }));
  };

  const colorSelectHandler = (color: ValidColor) => {
    setSelectedColor(color);
    form.setValues((currentValues) => ({ ...currentValues, color }));
  };

  const handleCategorySelect = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      form.setValues({ id: category.id, name: category.name });
    }
  };

  const submitHandler = async (data: CreateCategory | SelectCategory) => {
    const result = await form.validate();

    if (!result.hasErrors) {
      let response;
      if (isCreatingCategory) {
        response = await acceptInvite.mutateAsync({
          inviteToken,
          categoryId: null,
          newCategory: data as CreateCategory,
          tasklistId: tasklistId,
        });
      } else {
        const selectedCategory = data as SelectCategory;
        response = await acceptInvite.mutateAsync({
          inviteToken,
          categoryId: selectedCategory.id,
          newCategory: null,
          tasklistId: tasklistId,
        });
      }

      navigate({ to: `/categories/${response.categoryName.toLowerCase()}/${response.tasklistId}` });
    } else {
      console.log("Form has errors:", result.errors);
    }
  };

  const declineInviteHandler = () => {
    declineInvite.mutateAsync(inviteToken);
    navigate({ to: `/categories` });
  };

  const toggleFormHandler = () => {
    form.reset();
    setSelectedColor(validColors[0]);
    setSelectedIcon(validIcons[0]);
    setIsCreatingCategory((prev) => !prev);
  };

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <Stack>
        {isCreatingCategory ? (
          <>
            <Flex gap={12} w="100%">
              <LazyColorPickerMenu selectedColor={selectedColor} onSelect={colorSelectHandler} colors={validColors} />
              <LazyIconPickerMenu selectedIcon={selectedIcon} onSelect={iconSelectHandler} icons={validIcons} />
              <TextInput
                classNames={{
                  input: "input",
                }}
                label="Category Name"
                placeholder="Enter a category name"
                {...form.getInputProps("name")}
                w="100%"
              />
            </Flex>
          </>
        ) : (
          <Select
            label="Select a Category"
            placeholder="Select a Category"
            data={categories.map((category) => ({ value: String(category.id), label: category.name }))}
            required
            classNames={{
              input: "input",
            }}
            error={form.errors.id}
            onChange={(value) => handleCategorySelect(Number(value))}
          />
        )}
        {categories.length > 0 && (
          <AssignmentToggle
            text={isCreatingCategory ? "Changed your mind?" : "Don't see your category?"}
            clickableText={isCreatingCategory ? "Select a Category!" : "Create a New Category!"}
            toggleCreateCategory={toggleFormHandler}
          />
        )}

        <Flex justify="space-between" align="center" gap={16} mt={24}>
          <Text c="dimmed" size="xs" fs="italic" td="underline">
            Your invitation expires in 7 days.
          </Text>
          <Group gap={8}>
            <Button onClick={declineInviteHandler} variant="outline" color="red">
              Decline
            </Button>
            <Button type="submit" variant="light" color="lime">
              Accept Invite
            </Button>
          </Group>
        </Flex>
      </Stack>
    </form>
  );
}

export default AssignTasklistToCategoryForm;
