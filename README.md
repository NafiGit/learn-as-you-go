# Front-end Intern Assignment

## Overview

This project demonstrates an Angular application that fetches data from a mock REST API using an Angular service and displays it in a component. It handles HTTP requests, error management, and includes sorting functionality. The app is responsive and works well on both desktop and mobile devices.

## Features

- **HTTP Request Handling**: Uses HttpClient to fetch data from a mock REST API.
- **Error Handling**: Implements error handling for failed HTTP requests.
- **Data Display**: Fetched data is rendered dynamically in the component.
- **Sorting**: Includes a sorting functionality for data presentation.
- **Responsive Design**: The app is responsive, ensuring a smooth user experience on different screen sizes.

## File Structure

├── README.md 
├── node_modules
├── .angular
├── angular.json 
├── package-lock.json 
├── package.json 
├── public
│ └── favicon.ico 
├── src
│ ├── app
│ │ ├── app.component.ts 
│ │ ├── app.config.ts 
│ │ ├── data.service.ts 
│ │ ├── intersection-observer.directive.ts 
│ │ ├── item-list 
│ │ │ ├── item-list.component.css 
│ │ │ ├── item-list.component.html 
│ │ │ └── item-list.component.ts 
│ │ ├── services
│ │ │ └── view-count.service.ts 
│ │ └── theme.service.ts 
│ ├── assets
│ │ ├── resume.pdf 
│ │ └── sample-data.json 
│ ├── environments
│ │ ├── environment.development.ts 
│ │ └── environment.ts 
│ ├── index.html
│ ├── main.ts 
│ └── styles.css 
├── tsconfig.app.json 
└── tsconfig.json 

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url.git
   ```

2. Navigate to the project directory:

   ```bash
   cd front-end-intern-assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   ng serve
   ```

5. Access the application:
   Open your browser and navigate to http://localhost:4200.

## Screenshots

Screenshots demonstrating the application functionality and design:

![Screenshot of main UI](/http-request-app/src/assets/screenshots/FullscreenDark.jpeg)
![Screenshot of mobile view](/http-request-app/src/assets/screenshots/MobileForest.jpeg)

## Functionality Breakdown

1. **HTTP Request Handling**

   - Implemented in `data.service.ts` using Angular's HttpClientModule.
   - Fetches data from a mock REST API in `sample-data.json`.

2. **Error Handling**

   - Managed using HttpClient error handling mechanisms.
   - Displays an appropriate error message in the UI if the API call fails.

3. **Data Display**

   - Data is dynamically displayed in the `item-list.component.html`.

4. **Sorting Functionality**
   - Simple sorting logic is implemented within `item-list.component.ts` for user-friendly data organization.

## Additional Features

- **Sorting**: Implemented using custom logic, allowing the user to sort fetched data.
- **Responsive Design**: Ensured that the app is mobile-friendly using CSS media queries.

## Notes

- **Time Limit**: Completed within the specified 24-hour time limit.
- **Libraries**: No external libraries were used for sorting, ensuring custom implementation.

## Conclusion

This project demonstrates the ability to handle HTTP requests in Angular, manage asynchronous data, implement error handling, and provide a clean and responsive user interface.
