import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrders1625330641635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "game_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
       }));

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
            name: 'OrdersUserId',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
            name: 'OrdersGameId',
            columnNames: ['game_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'games',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders');
    }

}
