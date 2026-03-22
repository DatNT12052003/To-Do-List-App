import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("posts", {
        id: "id",
        title: { type: "varchar(255)", notNull: true },
        content: { type: "text", notNull: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
        updated_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
        author_id: {
            type: "integer",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("posts");
}
