import { useEffect, useMemo, useState } from "react";

export const useGeoData = () => {
  const [data, setData] = useState([]);

  // UI state
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("");

  // Sorting state
  const [sortBy, setSortBy] = useState(""); // project | lastUpdated
  const [sortOrder, setSortOrder] = useState("asc");

  // Status filter: active | inactive | maintenance
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch mock API data
  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load data", err));
  }, []);

  // Processed Data (search + filter + sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Search (Project Name)
    if (filter) {
      const q = filter.toLowerCase();
      result = result.filter(item =>
        item.projectName?.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(
        item => item.status?.toLowerCase() === statusFilter
      );
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        // Project Name → NATURAL / NUMERIC SORT
        if (sortBy === "project") {
          const numA = parseInt(
            a.projectName?.match(/\d+/)?.[0] || 0,
            10
          );
          const numB = parseInt(
            b.projectName?.match(/\d+/)?.[0] || 0,
            10
          );

          return sortOrder === "asc" ? numA - numB : numB - numA;
        }

        // Last Updated → MOST RECENT FIRST (DESC)
        if (sortBy === "lastUpdated") {
          const timeA = new Date(a.lastUpdated || 0).getTime();
          const timeB = new Date(b.lastUpdated || 0).getTime();
          return timeB - timeA; //always descending
        }

        return 0;
      });
    }

    return result;
  }, [data, filter, sortBy, sortOrder, statusFilter]);

  // Clear selection if filtered out
  useEffect(() => {
    if (selectedId && !processedData.some(d => d.id === selectedId)) {
      setSelectedId(null);
    }
  }, [processedData, selectedId]);

  // Expose state + actions
  return {
    data: processedData,

    // selection
    selectedId,
    setSelectedId,

    // search
    setFilter,

    // sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // status filter
    statusFilter,
    setStatusFilter
  };
};
