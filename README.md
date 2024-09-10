# Country Information App

## Overview

This project is an Angular application that fetches and displays country information from a REST API. It implements responsive design, theme switching, and advanced filtering capabilities. The app adheres to the provided style guide and uses data from the supplied JSON file.

## Features

- **Data Fetching**: Retrieves country data from a REST API (simulated with local JSON file).
- **Responsive Design**: Adapts to both mobile (375px) and desktop (1440px) views.
- **Theme Switching**: Toggles between light and dark modes as per the style guide.
- **Advanced Filtering**: Allows users to search countries by name and filter by region.
- **Detailed Information**: Provides in-depth details about each country on a separate page.

## File Structure

```bash
├── README.md
├── src
│ ├── app
│ │ ├── components
│ │ │ ├── country-list
│ │ │ └── country-detail
│ │ ├── services
│ │ │ ├── data.service.ts
│ │ │ └── theme.service.ts
│ │ └── app.component.ts
│ ├── assets
│ │ └── data.json
│ └── styles.css
└── angular.json
```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/NafiGit/country-info-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd country-info-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   ng serve
   ```

5. Access the application at http://localhost:4200

## Screenshots

### Home View (Light Theme)

![Home Light Theme](/src/assets/screenshots/FullScreenLight.jpeg)

### Home View (Dark Theme)

![Home Dark Theme](/src/assets/screenshots/FullscreenDark.jpeg)

### Details View

![Details Light Theme](/src/assets/screenshots/Details.jpeg)

## Styling

The application follows the style guide provided:

- **Colors**:

  - Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
  - Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
  - Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
  - Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
  - Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
  - White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)

- **Typography**:
  - Font: Nunito Sans
  - Weights: 300, 600, 800
  - Sizes: 14px (Homepage), 16px (Detail Page)

## Data Source

The application uses country data from the provided `data.json` file, which includes detailed information about various countries including their names, capitals, populations, and more.

## Additional Notes

- The application is built with Angular and TypeScript.
- Responsive design ensures optimal viewing on devices ranging from 375px to 1440px width.
- The theme switcher allows users to toggle between light and dark modes seamlessly.
