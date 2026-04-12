import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createType("otp_type", ["RESET_PASSWORD", "VERIFY_EMAIL", "LOGIN", "CHANGE_EMAIL", "TWO_FA"]);

    pgm.createTable("otps", {
        id: "id",

        user_id: {
            type: "integer",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },

        code: {
            type: "text",
            notNull: true,
        },

        type: {
            type: "otp_type",
            notNull: true,
        },

        expires_at: {
            type: "timestamp",
            notNull: true,
        },

        is_used: {
            type: "boolean",
            notNull: true,
            default: false,
        },

        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createIndex("otps", ["user_id", "type"]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("otps");
    pgm.dropType("otp_type");
}
