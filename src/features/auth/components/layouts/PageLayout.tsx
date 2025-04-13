import { Box, Paper, Flex, Stack, Pagination, Title } from "@mantine/core";
import { ReactNode } from "react";
import PageHeader from "../../../../components/header/PageHeader"; // Assuming PageHeader is reusable
import LazyText from "../../../../lazy-components/text/LazyText";
import FilterSortControls from "../controls/FilterSortControls";
import { useSearch } from "@tanstack/react-router";

type PageLayoutProps = {
  title: string;
  leftSection?: ReactNode; // Optional leftSection for the header
  rightSection?: ReactNode;
  children: ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

const PageLayout = ({ title, leftSection, rightSection, children, pagination }: PageLayoutProps) => {
  const searchParams = useSearch({ from: "/_authenticated/categories/" });

  return (
    <Box h="95vh">
      <Flex direction="column" justify="space-between" h="100%">
        <Stack gap={16} style={{ flexGrow: 1 }}>
          <Paper bg="primary.9" p={16} radius="md">
            <PageHeader mb={16} leftSection={leftSection} rightSection={rightSection}>
              <Title>{title}</Title>
            </PageHeader>
          </Paper>

          <Stack mb="md" gap="8">
            <FilterSortControls
              route="/categories"
              searchParams={searchParams}
              sortByOptions={[
                { value: "createdAt", label: "Created At" },
                { value: "name", label: "Name" },
              ]}
            />
          </Stack>
        </Stack>
        {children}

        {pagination && pagination.totalPages > 1 && (
          <Paper bg="primary.9" p={16} radius="md">
            <Flex justify="space-between" align="center">
              <LazyText
                text={`page ${pagination.currentPage} of ${pagination.totalPages}`}
                highlight={pagination.currentPage}
                highlightColor="lime"
                c="gray"
              />
              <Pagination
                color="lime"
                value={pagination.currentPage}
                onChange={pagination.onPageChange}
                total={pagination.totalPages}
              />
            </Flex>
          </Paper>
        )}
      </Flex>
    </Box>
  );
};

export default PageLayout;
