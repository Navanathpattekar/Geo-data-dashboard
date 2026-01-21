import { Box, Grid, Typography } from "@mui/material";
import { useGeoData } from "../hooks/useGeoData";
import DataTable from "../components/DataTable";
import MapView from "../components/MapView";
import Filters from "../components/Filters";
import SortControls from "../components/SortControls";

export default function Dashboard() {
  const geo = useGeoData();

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}  style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                textAlign: "center",
                marginBottom: "24px",
                color: "#F87C63",
                fontFamily: "'Inter', sans-serif",
                textShadow: "1px 1px 3px rgba(0,0,0,0.1)"}}>

        Geo Data Dashboard
      </Typography>

      <Filters onSearch={geo.setFilter} />

      <SortControls
        setSortBy={geo.setSortBy}
        setSortOrder={geo.setSortOrder}
        setStatusFilter={geo.setStatusFilter}
      />


      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DataTable {...geo} />
        </Grid>
        <Grid item xs={12} md={6} >
          <MapView {...geo} />
        </Grid>
      </Grid>
    </Box>
  );
}
