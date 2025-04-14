import { Group, TextInput, ActionIcon, Select, Box } from "@mantine/core";
import { Search as SearchIcon, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMediaQuery } from "@mantine/hooks";

type FilterSortControlsProps = {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: Record<string, any>;
  sortByOptions: { value: string; label: string }[];
};

const FilterSortControls = ({ route, searchParams, sortByOptions }: FilterSortControlsProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 425px)");

  const updateSearchParams = (updates: Partial<typeof searchParams>) => {
    navigate({
      to: route,
      search: { ...searchParams, ...updates },
    });
  };

  const handleSearchChange = (value: string) => updateSearchParams({ search: value, page: 1 });

  const handleSortByChange = (value: string | null) => {
    if (value) updateSearchParams({ sortBy: value, page: 1 });
  };

  const toggleSortDirection = () => {
    const newDirection = searchParams.sortDirection === "asc" ? "desc" : "asc";
    updateSearchParams({ sortDirection: newDirection, page: 1 });
  };

  return (
    <Group w="100%" justify={isMobile ? "start" : "flex-end"} align="end" wrap="wrap" gap="sm">
      <Box w={isMobile ? "100%" : 300}>
        <TextInput
          classNames={{
            input: "input",
          }}
          w="100%"
          label="Search"
          placeholder="Search..."
          leftSection={<SearchIcon size={16} />}
          value={searchParams.search || ""}
          onChange={(e) => handleSearchChange(e.currentTarget.value)}
        />
      </Box>

      <Group align="end" gap="sm" wrap="nowrap">
        <Select
          classNames={{
            input: "input",
          }}
          w={isMobile ? "100%" : 150}
          label="Sort by"
          data={sortByOptions}
          value={searchParams.sortBy || ""}
          onChange={handleSortByChange}
        />

        <ActionIcon onClick={toggleSortDirection} size="lg" c="inverse" color="secondary.9" mt={isMobile ? 22 : 0}>
          {searchParams.sortDirection === "asc" ? <ArrowUpNarrowWide size={20} /> : <ArrowDownNarrowWide size={20} />}
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default FilterSortControls;
