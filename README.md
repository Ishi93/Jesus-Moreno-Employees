This is a web application built with JavaScript/React that identifies the pair of employees who have worked together on common projects for the longest period of time. The input data is provided in a CSV file with the following format:


EmpID, ProjectID, DateFrom, DateTo

The output shows the pair of employees with the highest number of days worked together on common projects, along with the number of days. The application also includes a file upload feature to load the CSV file and display the common projects of the employee pair in a data grid.

Installation:

1.- Clone the repository: git clone https://github.com/Ishi93/Jesus-Moreno-Employees.git

2.- Install the dependencies: npm install

3.- Start the application: npm start

Usage:

1.- Click on the "Choose File" button to select a CSV file with the input data.

2.- The common projects of the employee pair with the highest number of days worked together are displayed in a data grid.

Features:

- Supports different date formats in the input CSV file.

- Handles NULL values for DateTo, which are considered as today's date.

- Provides a visually appealing UI with an improved design.

- Includes a responsive layout that adapts to different screen sizes.

Dependencies:

- React
- PapaParse
- Moment


