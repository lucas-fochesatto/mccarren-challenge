#!/bin/bash

echo "Importing workflows..."
n8n import:workflow --separate --input=/workflows
