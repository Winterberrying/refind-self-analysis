from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

import csv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def get_top_personality_types(actions, csv_file):
    """
    Filters actions from the CSV, computes scores for each personality type, and returns the top 3.
    :param actions: List of actions to include.
    :param csv_file: Path to the CSV file.
    :return: List of tuples with the top 3 personality types and their scores.
    """
    scores = {}

    # Read and process the CSV file
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        header = next(reader)  # First row contains column names

        # Initialize scores dictionary with column names (excluding 'ACTIONS')
        for col in header[1:]:
            scores[col] = 0

        # Process each row
        for row in reader:
            action = row[0]
            if action in actions:  # Include only rows with selected actions
                for i, col in enumerate(header[1:], start=1):  # Skip the 'ACTIONS' column
                    scores[col] += float(row[i]) if row[i] else 0

    # Get the top 3 personality types
    top_3 = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
    return top_3


@app.route('/compute-top-types', methods=['POST'])
def compute_top_types():
    try:
        # Get JSON data from the request
        data = request.json
        actions = data.get('actions', [])
        csv_file_path = 'Copy of Refind Self_ The Personality Test Game - Actions Spreadsheet.csv' 

        if not actions:
            return jsonify({'error': 'No actions provided'}), 400

        # Compute top personality types
        top_personalities = get_top_personality_types(actions, csv_file_path)
        return jsonify({'top_personalities': top_personalities})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
