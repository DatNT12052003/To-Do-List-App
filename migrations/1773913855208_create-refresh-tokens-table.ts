import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("refresh_tokens", {
        id: {
            type: "id",
            primaryKey: true,
        },
        user_id: {
            type: "integer",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },
        token: {
            type: "text",
            notNull: true,
            unique: true,
        },
        expires_at: {
            type: "timestamp",
            notNull: true,
        },
        created_at: {
            type: "timestamp",
            default: pgm.func("now()"),
        },
    });

    // index để query nhanh
    pgm.createIndex("refresh_tokens", "user_id");
    pgm.createIndex("refresh_tokens", "expires_at");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("refresh_tokens");
}
