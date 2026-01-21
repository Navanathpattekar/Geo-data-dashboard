import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

export default function DataTable({ data, selectedId, setSelectedId }) {
  const rowsPerPage = 6;
  const [page, setPage] = useState(0);
  const rowRefs = useRef({});

  // Sync table scroll when marker clicked
  useEffect(() => {
    if (!selectedId) return;

    const index = data.findIndex(d => d.id === selectedId);
    if (index === -1) return;

    const newPage = Math.floor(index / rowsPerPage);

    if (newPage !== page) {
      setPage(newPage);
      return; // wait for page render
    }

    const el = rowRefs.current[selectedId];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [selectedId, data, page]);

  // Calculate dynamic row height based on container
  const rowHeight = Math.floor(500 / rowsPerPage); // container height / rows per page

  return (
    <Paper elevation={3} sx={{ height: "100%" }}>
      <TableContainer
        sx={{
          height: "450px",   // same as map
          overflowY: "auto",
          borderRadius : "10px"
        }}
      >
        <Table size="big" stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Project</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Latitude</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Longitude</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Updated</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow
                  key={row.id}
                  ref={el => (rowRefs.current[row.id] = el)}
                  hover
                  selected={row.id === selectedId}
                  onClick={() => setSelectedId(row.id)}
                  sx={{
                    cursor: "pointer",
                    height: `${rowHeight}px`, // equal row height
                    bgcolor:
                      row.id === selectedId
                        ? "rgba(25,118,210,0.15)"
                        : "",
                  }}
                >
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.latitude}</TableCell>
                  <TableCell>{row.longitude}</TableCell>
                  <TableCell>{row.lastUpdated}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, p) => {
          rowRefs.current = {}; // prevent stale refs
          setPage(p);
        }}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
}
