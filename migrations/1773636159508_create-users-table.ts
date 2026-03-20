import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
    pgm.createTable("users", {
        id: "id",
        username: { type: "varchar(50)", notNull: true },
        password: { type: "varchar(100)", notNull: true },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
        },
    });
};

export const down = (pgm: MigrationBuilder): void => {
    pgm.dropTable("users");
};
