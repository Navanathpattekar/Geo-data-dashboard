
## Geo Data Dashboard

A React-based dashboard that displays geo-referenced project data in a paginated table and an interactive map, with full two-way synchronization between the table and map markers.

## Tech Stack & Tools

React 18 – Functional components + hooks only

Vite – Fast development & build tooling

Material UI (MUI) – Table, pagination, layout, and controls

Leaflet + React-Leaflet – Map rendering and marker interaction

OpenStreetMap – Free tile provider

Local JSON – Mock API for frontend development

## Setup Instructions

npm install
npm run dev

## Project Structure

src/
├── components/
│   ├── DataTable.jsx        # Paginated table UI
│   ├── MapView.jsx          # Leaflet map + markers
│   ├── Filters.jsx          # Search input
│   └── SortControls.jsx     # Sorting & status filter
│
├── hooks/
│   └── useGeoData.js        # Centralized data logic
│
├── pages/
│   └── Dashboard.jsx        # Page composition
│
├── styles/
│   └── global.css           # Global styles & animations
│
├── utils/
│   └── fixLeafletIcon.js    # Leaflet icon fix for Vite
│
├── main.jsx
├── App.jsx
└── public/
    └── data.json            # Mock API data


## Features

Data Table

Fetches data from a mock API (data.json)

Client-side pagination using MUI

Columns:

    Project Name

    Latitude

    Longitude

    Status

    Last Updated

Row highlighting based on selection

Automatically scrolls to selected row


## Map Integration

Interactive map built with Leaflet

Markers plotted using latitude & longitude from table data

Marker clustering for better performance

Popup shows project name and status

## Two-Way Synchronization

Action	            Result
Click table row	    Map zooms → marker highlights
Click marker	    Table scrolls → row highlights
Filter / sort	    Selection cleared if item    disappears

This is managed via shared local state (selectedId).

## Search & Filtering

Search by Project Name

Status filter:

    Active

    Inactive

    Maintenance

Filters are applied before sorting & pagination

## State Management (Design Decision)

 Local State Only (No Redux)

All state is managed via a custom hook:

            useGeoData()


This hook handles:

Data fetching
Filtering
Sorting
Selection synchronization

## Performance Considerations

Pagination limits rendered rows

useMemo used for:

    Filtering

    Sorting

Marker clustering enabled

No unnecessary re-renders

Scales smoothly to 5,000+ rows

## Data is fetched via: fetch("/data.json")

data.json simulates a backend API

Enables realistic async data handling

Matches real-world frontend workflows

## UI & UX Decisions

Clean, responsive layout using MUI Grid

Table & map aligned for visual balance

Highlight animations improve discoverability

Clear selection state feedback


## Time Spent

~25 hours

Task	                                         Time
Requirement analysis & architecture design       2 hrs
Project setup (Vite, MUI, Leaflet)               1 hrs
Data fetching & mock API integration             1 hrs
Data table (pagination, selection, styling)      5 hrs
Map integration & marker clustering              5 hrs
Table ↔ Map synchronization logic                4 hrs
Sorting, filtering & search                      4 hrs
UI polish, performance tuning & bug fixes        3 hrs


## Requirements Checklist

✔ React (Vite)
✔ Functional components + hooks
✔ Paginated data table
✔ Client-side filtering & sorting
✔ Leaflet map integration
✔ Marker ↔ Table synchronization
✔ Local state only
✔ Clean folder structure
✔ Handles large datasets

## Future Improvements

Server-side pagination

Virtualized table (react-window)

Map bounds filtering

Export to CSV

Unit tests (Jest / RTL)


## Built with focus on clarity, performance, and real-world frontend patterns.