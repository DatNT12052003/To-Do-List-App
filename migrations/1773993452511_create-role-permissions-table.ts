import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("role_permissions", {
        id: "id",
        role_id: {
            type: "integer",
            notNull: true,
            references: "roles(id)",
            onDelete: "CASCADE",
        },
        permission_id: {
            type: "integer",
            notNull: true,
            references: "permissions(id)",
            onDelete: "CASCADE",
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("role_permissions");
}
