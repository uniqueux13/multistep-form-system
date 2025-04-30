# final app.py code (no comments)

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATA_DIR = 'submissions'
DATA_FILE = os.path.join(DATA_DIR, 'form_submissions.json')
os.makedirs(DATA_DIR, exist_ok=True)

def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                content = f.read()
                if not content:
                    return []
                return json.loads(content)
        except json.JSONDecodeError:
            return []
        except Exception:
             return []
    return []

def save_data(data):
    try:
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print(f"Error saving data: {e}")


@app.route('/')
def home():
    return "Multistep Form Backend is running!"

@app.route('/submit', methods=['POST'])
def handle_submission():
     if not request.is_json:
         return jsonify({"error": "Request must be JSON"}), 400

     form_data = request.get_json()
     if not form_data:
          return jsonify({"error": "No data provided"}), 400

     print("Received form data:")
     print(json.dumps(form_data, indent=2))

     all_submissions = load_data()
     submission_entry = {
         "received_at": datetime.now().isoformat(),
         "data": form_data
     }
     all_submissions.append(submission_entry)
     save_data(all_submissions)

     return jsonify({
         "message": "Form submitted successfully via Fetch!",
         "received_data": form_data
         }), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)