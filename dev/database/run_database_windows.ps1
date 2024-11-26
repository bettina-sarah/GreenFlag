# HOW TO RUN:
# Open a PowerShell terminal in the folder and execute: .\run_database.ps1

# Combine SQL files into setup.sql
Get-Content create_tables_enums.sql, views_functions.sql, users_insert.sql | Set-Content setup.sql

# User & Database
# Replace 'postgres' with your PostgreSQL username if different
# Note: Ensure that psql.exe is in your PATH or provide the full path to it.
Invoke-Expression "psql -U postgres -d postgres -f ./setup.sql"

# Wait for user input before closing
Read-Host -Prompt "Press Enter to exit"