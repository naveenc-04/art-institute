# Art Institute of Chicago – Artwork Table

This project is a React + TypeScript application built using Vite.  
It displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and persistent row selection.

## Tech Stack
- React
- TypeScript
- Vite
- PrimeReact

## Features
- Server-side pagination using the Art Institute of Chicago API
- PrimeReact DataTable with checkbox row selection
- Persistent row selection across pages (ID-based strategy)
- Custom row selection overlay without prefetching data
- Strict TypeScript configuration

## Important Implementation Notes
- Only the current page data is stored in memory
- Row selection is tracked using artwork IDs
- No prefetching or caching of other pages is performed
- Custom selection is limited to the current page as required

## Getting Started
```bash
npm install
npm run dev

## Live Demo
The application is deployed on Netlify and can be accessed using the link below:

🔗 https://YOUR_NETLIFY_URL_HERE 