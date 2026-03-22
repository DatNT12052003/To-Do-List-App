import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("user_roles", {
        id: "id",
        user_id: {
            type: "integer",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },
        role_id: {
            type: "integer",
            notNull: true,
            references: "roles(id)",
            onDelete: "CASCADE",
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("user_roles");
}
