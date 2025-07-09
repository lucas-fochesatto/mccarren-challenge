#!/bin/bash

echo "Importing workflows..."
IMPORT_LOG=$(n8n import:workflow --separate --input=/workflows 2>&1)

# Extrai os nomes dos workflows desativados
DEACTIVATED_WORKFLOWS=$(echo "$IMPORT_LOG" | grep "Deactivating workflow" | awk -F '"' '{print $2}')

# Diretório onde estão os workflows separados
WORKFLOWS_DIR="/workflows"

# Itera sobre cada workflow desativado
for WORKFLOW_NAME in $DEACTIVATED_WORKFLOWS; do
    # Encontra o ID correspondente no JSON
    WORKFLOW_FILE=$(grep -rl "\"name\": \"$WORKFLOW_NAME\"" "$WORKFLOWS_DIR")

    if [ -n "$WORKFLOW_FILE" ]; then
        WORKFLOW_ID=$(jq -r '.id' "$WORKFLOW_FILE")

        if [ -n "$WORKFLOW_ID" ] && [ "$WORKFLOW_ID" != "null" ]; then
            echo "Reactivating workflow: $WORKFLOW_NAME ($WORKFLOW_ID)"
            n8n update:workflow --id="$WORKFLOW_ID" --active=true
        else
            echo "❌ Could not find ID for workflow: $WORKFLOW_NAME"
        fi
    else
        echo "❌ Could not find file for workflow: $WORKFLOW_NAME"
    fi
done