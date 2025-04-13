import { Group, TextInput, ActionIcon, Select } from "@mantine/core";
import { Search as SearchIcon, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type FilterSortControlsProps = {
  route: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: Record<string, any>;
  sortByOptions: { value: string; label: string }[];
};

const FilterSortControls = ({ route, searchParams, sortByOptions }: FilterSortControlsProps) => {
  const navigate = useNavigate();

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
    <Group justify="end" gap={16} align="end">
      <TextInput
        w={300}
        classNames={{ input: "input" }}
        label="Search"
        placeholder="Search..."
        leftSection={<SearchIcon size={16} />}
        value={searchParams.search || ""}
        onChange={(e) => handleSearchChange(e.currentTarget.value)}
      />
      <Select
        w={150}
        classNames={{ input: "input" }}
        label="Sort by"
        data={sortByOptions}
        value={searchParams.sortBy || ""}
        onChange={handleSortByChange}
      />

      <ActionIcon onClick={toggleSortDirection} size="lg" c="inverse" color="secondary.9">
        {searchParams.sortDirection === "asc" ? <ArrowUpNarrowWide size={20} /> : <ArrowDownNarrowWide size={20} />}
      </ActionIcon>
    </Group>
  );
};

export default FilterSortControls;
