import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
    pgm.createTable("sessions", {
        id: "id",
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
        },
        refreshToken: { type: "varchar(255)", notNull: true },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
        },
    });
};

export const down = (pgm: MigrationBuilder): void => {
    pgm.dropTable("sessions");
};
