import { TextField, Box } from "@mui/material";

export default function Filters({ onSearch }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 2
      }}
    >
      <TextField
        label="Search Project"
        margin="normal"
        onChange={e => onSearch(e.target.value)}
        sx={{
          width: "80%",
          maxWidth: "900px",
          backgroundColor: "#faf7f5",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",

          "& .MuiOutlinedInput-root": {
            borderRadius: "12px"
          },

          "& fieldset": {
            borderColor: "#d7ccc8"
          },

          "&:hover fieldset": {
            borderColor: "#bcaaa4"
          },

          "&.Mui-focused fieldset": {
            borderColor: "#8d6e63"
          }
        }}
      />
    </Box>
  );
}
