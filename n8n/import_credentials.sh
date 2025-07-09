#!/bin/bash
set -e

echo "n8n is up. Generating and importing credentials..."

# Cria pasta e arquivo de credenciais
mkdir -p /credentials
cat <<EOF > /credentials/credentials.json
[
  {
    "createdAt": "$(date -Iseconds)",
    "updatedAt": "$(date -Iseconds)",
    "id": "DL4quAC3D56jVN8O",
    "name": "OpenAi account",
    "data": {
      "apiKey": "${OPENAI_API_KEY}"
    },
    "type": "openAiApi",
    "isManaged": false
  }
]
EOF

n8n import:credentials --input=/credentials/credentials.json