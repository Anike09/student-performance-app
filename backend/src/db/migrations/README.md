# Database Migrations Documentation

This directory contains the migration files for managing changes to the database schema over time. Each migration file should include the necessary SQL commands to create, modify, or delete database tables and relationships.

## Migration Files

- Each migration file should be named in a way that reflects its purpose and the date it was created, following a consistent naming convention (e.g., `YYYYMMDD_create_students_table.sql`).
- Migrations should be organized in a way that allows for easy tracking of changes and rollbacks if necessary.

## Running Migrations

To apply the migrations to the database, use the following command:

```
npm run migrate
```

Ensure that your database connection settings are correctly configured in the environment variables before running migrations.

## Rollback Migrations

If you need to revert a migration, use the following command:

```
npm run migrate:rollback
```

This will undo the last applied migration.

## Best Practices

- Always back up your database before running migrations.
- Test migrations in a development environment before applying them to production.
- Document any changes made in the migration files to maintain clarity for future developers.