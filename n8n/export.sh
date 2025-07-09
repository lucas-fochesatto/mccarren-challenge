#!/bin/sh

# Define the output directories
WORKFLOWS_DIR="/workflows"
CREDENTIALS_DIR="/credentials"

# Create the directories if they do not exist
mkdir -p "$WORKFLOWS_DIR"
mkdir -p "$CREDENTIALS_DIR"

# Export the workflows
echo "Exporting workflows to $WORKFLOWS_DIR..."
n8n export:workflow --backup --output="$WORKFLOWS_DIR"
if [ $? -eq 0 ]; then
  echo "Workflows exported successfully."
else
  echo "Error exporting workflows." >&2
  exit 1
fi

# Export the credentials
echo "Exporting credentials to $CREDENTIALS_DIR/credentials.json..."
n8n export:credentials --all --decrypted --output="$CREDENTIALS_DIR/credentials.json"
if [ $? -eq 0 ]; then
  echo "Credentials exported successfully."
else
  echo "Error exporting credentials." >&2
  exit 1
fi

echo "Export completed."
