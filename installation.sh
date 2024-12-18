#!/bin/bash

echo "Installation des dépendances backend..."
pip install -r requirements.txt

echo "Installation de la base de donnée..."
cd dev/database
cat create_tables_enums.sql views_functions.sql users_insert.sql > setup.sql
psql -U postgres -d postgres -f ./setup.sql

cd ../backend
python sim_main.py

echo "Installation des dépendances frontend..."
cd ../frontend
npm install