# Activer l'arrêt en cas d'erreur
$ErrorActionPreference = "Stop"

# Installation des dépendances backend
Write-Host "Installation des dépendances backend..."
pip install -r requirements.txt

# Installation de la base de données
Write-Host "Installation de la base de données..."
Set-Location "dev/database"

# Combiner les fichiers SQL en un seul
Write-Host "Création du fichier setup.sql..."
Get-Content create_tables_enums.sql, views_functions.sql, users_insert.sql | Set-Content setup.sql

# Exécuter le fichier SQL avec PostgreSQL
Write-Host "Exécution du fichier setup.sql dans PostgreSQL..."
& psql -U postgres -d postgres -f ./setup.sql

# Retour au backend et exécution du script Python
Set-Location "../backend"
Write-Host "Exécution du script sim_main.py..."
python sim_main.py

# Installation des dépendances frontend
Set-Location "../frontend"
Write-Host "Installation des dépendances frontend..."
npm install
