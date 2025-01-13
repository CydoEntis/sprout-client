import { Flex } from '@mantine/core'
import React from 'react'

type Props = {}

function TaskDateRange({}: Props) {
  return (
    <Flex align="center" gap={8} py={16}>
    <Stack gap={2}>
      <Group gap={2} align="start">
        <Text size="2rem" fw="bold">
          2:00
        </Text>
        <Text size="md" c="dimmed">
          PM
        </Text>
      </Group>
      <Text c="dimmed">Thurs, Feb 9</Text>
    </Stack>
    <ChevronRight size={20} color="gray" />

  </Flex>
  )
}

export default TaskDateRange