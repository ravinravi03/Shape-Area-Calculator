# Shape Area Calculator

![image](https://github.com/user-attachments/assets/4d73643c-675d-482b-be0f-84806235c277)

## Description
This Python Flask application allows users to calculate the area of a triangle, circle or rectangle based on parameters that they input.

## Usage
Given that the contents of the dropbox have been copied locally, start a terminal from the root directory and do the following:
1. Install the required dependencies by running:
    ```bash
    pip install -r requirements.txt
    ```
2. Start the Flask application by running:
    ```bash
    python main.py
    ```
    If you encounter an error indicating that port 5000 is already in use, it means another process is occupying the port. To remove the task, perform the following:
    - Find the task using port 5000 by running the following command in a terminal with admin privileges:
        ```bash
        netstat -ano | findstr :5000
        ```
    - Kill the task by running:
        ```bash
        taskkill /PID <PID> /F
        ```
        Replace `<PID>` with the actual Process ID you noted earlier.

Now the application should be running and you can visit the URL http://127.0.0.1:5000 to visit the main page.

## Endpoints
In this application there are two main endpoints:
 - GET http://127.0.0.1:5000/ - This endpoint serves the main page that allows a user to configure the parameters to calculate the area of the desired shape
 - POST http://127.0.0.1:5000/calculate - This endpoint calculates the area of a shape based on the input JSON provided in the request body.

#### Request Body for POST http://127.0.0.1:5000/calculate
The endpoint accepts a JSON object or a list of JSON objects with the following structure:

- **type** (string, required): The type of the shape. Supported values are:
    - `"circle"`
    - `"rectangle"`
    - `"triangle"`

- For a `"circle"`:
    - **radius**: The radius of the circle.

- For a `"rectangle"`:
    - **height**: The height of the rectangle.
    - **width**: The width of the rectangle.

- For a `"triangle"`:
    - **base**: The base of the triangle.
    - **height**: The height of the triangle.


