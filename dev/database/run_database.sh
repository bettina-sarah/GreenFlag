# HOW TO RUN: 
# execute in command line in folder: bash run_database.sh

cat create_tables_enums.sql views_functions.sql users_insert.sql > setup.sql

# user & database
psql -U postgres -d postgres -f ./setup.sql

echo "The setup has been executed. Press Enter to continue..."
read -r