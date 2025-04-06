import { Avatar, Badge, Button, Card, Flex, Group, Select, Stack, Text, TextInput } from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useInvite } from "../../hooks/useInvite";
import LazyColorPickerMenu from "../../../../lazy-components/color-picker/LazyColorPickerMenu";
import { LazyValidIcon } from "../../../../lazy-components/icon-picker/lazy-icon-picker.types";
import LazyIconPickerMenu from "../../../../lazy-components/icon-picker/LazyIconPickerMenu";
import { validColors } from "../../../../util/constants/valid-colors.constants";
import { validIcons, validIconTags } from "../../../../util/constants/valid-icon.constants";
import { ValidColor } from "../../../../util/types/valid-color.types";
import { createCategorySchema, selectCategorySchema } from "../../../category/shared/category.schemas";
import { Category, CreateCategory, SelectCategory } from "../../../category/shared/category.types";
import AssignTaskListToCategoryForm from "../../components-old/AssignTaskListToCategoryForm";
import { useAcceptInviteMutation } from "../../services/accept-invite.service";
import { useDeclineInviteMutation } from "../../services/decline-invite.service";
import CategoryFormToggle from "../category-form-toggle/CategoryFormToggle";

type InviteProps = {
  inviteToken: string;
  categories: Category[];
};

function Invite({ inviteToken, categories }: InviteProps) {
  const { invite, members } = useInvite(inviteToken);

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
          taskListId: Number(invite!.taskListId),
        });
      } else {
        const selectedCategory = data as SelectCategory;
        response = await acceptInvite.mutateAsync({
          inviteToken,
          categoryId: selectedCategory.id,
          newCategory: null,
          taskListId: Number(invite!.taskListId),
        });
      }

      navigate({ to: `/categories/${response.categoryName.toLowerCase()}/${response.taskListId}` });
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

  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <Card bg="primary.9" maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Stack>
        <Flex gap={2} align="center" justify="space-between">
          <Badge size="lg" color="yellow" variant="light">
            Pending Invite
          </Badge>
          <Text size="xs" c="dimmed">
            {invite.inviteDate}
          </Text>
        </Flex>
        <Stack mt={12} justify="center" align="center">
          <Avatar color="initials" size="xl" name={invite.inviter} />
          <Group gap={6}>
            <Text c="lime" td="underline" fw={700}>
              {invite.inviter}
            </Text>
            <Group gap={6}>
              <Text> has invited you to join </Text>
              <Text c="lime" td="underline" fw={700}>
                {invite.taskListName}.
              </Text>
            </Group>
          </Group>
        </Stack>
        {/* <InviteDetails inviter={invite.inviter} taskListName={invite.taskListName} />
        <InvitedMembers members={members} /> */}

        <AssignTaskListToCategoryForm
          categories={categories}
          inviteToken={inviteToken}
          taskListId={Number(invite.taskListId)}
        />
      </Stack>
      <Stack justify="center" align="center" gap={4}>
        {members.length > 0 ? (
          <Avatar.Group>
            {members.map((member, index) => (
              <Avatar key={index} color="initials" size="md" name={member} />
            ))}
          </Avatar.Group>
        ) : (
          <Text size="sm" c="dimmed">
            No other members yet
          </Text>
        )}
        <Text size="sm" c="dimmed">
          {members.length > 0 &&
            (members.length === 1 ? "1 person has already accepted" : `${members.length} people have already accepted`)}
        </Text>
      </Stack>

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
            <CategoryFormToggle
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
    </Card>
  );
}

export default Invite;
