# Multistep Form System (Backend + Frontend Variations)

This repository contains a simple Flask backend API and example frontends for a multistep web form. It's designed as an educational example demonstrating:
* A basic Flask API endpoint for receiving form data.
* A simple file-based data persistence mechanism (JSON).
* A plain JavaScript frontend interacting with the backend via the Fetch API.
* A monorepo structure to manage related backend and frontend code together.
* A pattern for organizing multiple frontend variations (e.g., for different clients) within the same repository.

## Project Structure

This project uses a monorepo structure:
multistep-form-system/
├── backend/            # Contains the Flask backend application
│   ├── app.py          # The main Flask application file
│   ├── submissions/    # Folder where submitted data is stored (ignored by Git)
│   ├── venv/           # Python virtual environment (ignored by Git)
│   └── requirements.txt # Python dependencies
│
├── frontend/           # Contains the base/example frontend
│   ├── index.html      # HTML structure
│   ├── script.js       # JavaScript for form logic and API calls
│   └── style.css       # Basic styling
│
├── frontend-client-A/  # Example of a frontend variation for Client A
│   └── ...             # (Similar HTML, CSS, JS files, potentially customized)
│
├── .gitignore          # Specifies intentionally untracked files for Git
└── README.md           # This documentation file


## Technology Stack

* **Backend:** Python 3, Flask, Flask-CORS
* **Frontend:** HTML, CSS, Plain JavaScript (using Fetch API)
* **Data Storage:** JSON file
* **Version Control:** Git, GitHub

## Setup Instructions

Follow these steps to set up the project environment locally.

### Prerequisites

* Git ([Download Git](https://git-scm.com/downloads))
* Python 3.8+ ([Download Python](https://www.python.org/downloads/))
* `pip` (usually comes with Python)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd multistep-form-system
    ```
    (Replace `<your-repository-url>` with the actual URL from GitHub)

2.  **Set up the Backend:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Create a Python virtual environment:
        ```bash
        python -m venv venv
        ```
    * Activate the virtual environment:
        * **Windows:** `.\venv\Scripts\activate`
        * **macOS/Linux:** `source venv/bin/activate`
    * Install the required Python packages:
        ```bash
        pip install -r requirements.txt
        ```
        *(Note: If `requirements.txt` doesn't exist yet, run `pip freeze > requirements.txt` inside the activated environment after installing Flask and Flask-CORS to create it.)*

3.  **No separate installation is needed for the frontend(s)** other than cloning the repository, as they are just static files served by a simple server.

## Running the Application

You need to run the backend server and a frontend server simultaneously in separate terminal windows.

### 1. Run the Backend Server

1.  Open a terminal.
2.  Navigate to the backend directory: `cd path/to/multistep-form-system/backend`
3.  Activate the virtual environment (if not already active):
    * Windows: `.\venv\Scripts\activate`
    * macOS/Linux: `source venv/bin/activate`
4.  Start the Flask development server:
    ```bash
    python app.py
    ```
5.  The backend API should now be running, typically at `http://127.0.0.1:5000`. Keep this terminal open.

### 2. Run a Frontend

1.  Open a **new, separate** terminal window.
2.  Navigate to the specific frontend directory you want to run (e.g., the base `frontend` or a variation like `frontend-client-A`):
    * For the base frontend: `cd path/to/multistep-form-system/frontend`
    * For Client A's frontend: `cd path/to/multistep-form-system/frontend-client-A`
3.  Start a simple HTTP server (other tools like `live-server` work too):
    ```bash
    python -m http.server 8080
    ```
    (You can use a different port if 8080 is busy).
4.  Open your web browser and navigate to `http://localhost:8080` (or the port you chose).
5.  You should see the multistep form. Interact with it, and upon final submission, the data should be sent to the running backend. Check the backend terminal for confirmation messages and the `backend/submissions/` folder for the saved data.

## API Endpoint

The backend provides one main endpoint:

### `POST /submit`

* **URL:** `http://127.0.0.1:5000/submit` (during local development)
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body:** A JSON object containing all the collected form data. The structure can vary depending on the frontend, but here's an example based on the base frontend:
    ```json
    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "interest": "AI Development",
        "experience": "Intermediate",
        "comments": "Excited to learn more!"
    }
    ```
* **Success Response (201 Created):**
    ```json
    {
        "message": "Form submitted successfully via Fetch!",
        "received_data": { ... echoed request body ... }
    }
    ```
* **Error Response (e.g., 400 Bad Request):**
    ```json
    {
        "error": "Request must be JSON"
    }
    ```

    ## Adding Frontend Variations

To create a new frontend variation (e.g., for a new client or purpose):

1.  Create a new directory at the top level (e.g., `mkdir frontend-new-client`).
2.  Copy the contents from an existing frontend (like `frontend/`) into the new directory.
3.  Customize the HTML, CSS, and JavaScript files within the new directory (`frontend-new-client/`) as needed. Ensure the `script.js` still points to the correct backend URL (`http://127.0.0.1:5000/submit`) and sends the data in JSON format.
4.  Stage, commit, and push the new directory using Git.
5.  Run the new variation using the steps in "Running the Application", making sure to `cd` into the correct new directory (e.g., `cd frontend-new-client`).