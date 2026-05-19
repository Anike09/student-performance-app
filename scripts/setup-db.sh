#!/bin/bash

# This script sets up the database environment for the student performance dashboard application.

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Database setup
DB_NAME=${DB_NAME:-student_performance}
DB_USER=${DB_USER:-root}
DB_PASSWORD=${DB_PASSWORD:-password}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}

# Create the database
echo "Creating database: $DB_NAME"
psql -h $DB_HOST -U $DB_USER -p $DB_PORT -c "CREATE DATABASE $DB_NAME;"

# Run migrations
echo "Running migrations..."
# Assuming migrations are located in backend/src/db/migrations
for migration in backend/src/db/migrations/*.sql; do
    echo "Running migration: $migration"
    psql -h $DB_HOST -U $DB_USER -p $DB_PORT -d $DB_NAME -f $migration
done

# Seed the database
echo "Seeding the database..."
psql -h $DB_HOST -U $DB_USER -p $DB_PORT -d $DB_NAME -f backend/src/db/seed/seed.sql

echo "Database setup completed."