# Art Institute of Chicago – Artwork Table

This project is a React application built using Vite and TypeScript.
It displays artwork data from the Art Institute of Chicago API using
PrimeReact DataTable with server-side pagination and persistent row selection.

## Tech Stack
- React
- TypeScript
- Vite
- PrimeReact

## Features
- Server-side pagination using the Art Institute of Chicago API
- DataTable implementation using PrimeReact
- Checkbox-based row selection
- Persistent row selection across page navigation using artwork IDs
- Custom row selection overlay without prefetching API data

## Implementation Details
- Only the current page data is fetched and stored
- Page changes always trigger a fresh API request
- Selected rows are tracked using artwork IDs (no row objects stored)
- No prefetching or caching of other pages is performed

## Live Demo
https://willowy-conkies-dda0fb.netlify.app/

## Repository
https://github.com/naveenc-04/art-institute
