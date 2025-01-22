import pandas as pd
import json

# Load the CSV file
file_path = 'Copy of Refind Self_ The Personality Test Game - Actions Spreadsheet.csv'  # Replace with your CSV file path
data = pd.read_csv(file_path)

# # Convert the data into the desired structure
# datasets = {}
# for column in data.columns[1:]:  # Assuming the first column is "ACTION"
#     datasets[column] = [
#         {"action": row["ACTION"], "value": row[column]}
#         for _, row in data.iterrows()
#         if row[column] != 0
#     ]

# # Save the datasets to a JSON file
# output_path = 'personality_and_actions.json'  # Replace with your desired output path
# with open(output_path, 'w') as json_file:
#     json.dump(datasets, json_file, indent=4)

# print(f"Dataset saved to {output_path}")

# Extract all actions into a separate JSON file
actions = data["ACTION"].tolist()  # Assuming "ACTION" is the first column
actions_output_path = 'actions.json'  # Replace with your desired output path
with open(actions_output_path, 'w') as actions_file:
    json.dump(actions, actions_file, indent=4)

print(f"Actions saved to {actions_output_path}")
