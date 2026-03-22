import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("roles", {
        id: "id",
        name: { type: "varchar(255)", notNull: true },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("roles");
}
