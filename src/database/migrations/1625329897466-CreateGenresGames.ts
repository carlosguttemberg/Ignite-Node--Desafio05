import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGenresGames1625329897466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "genres_games",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "genre_id",
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
        'genres_games',
        new TableForeignKey({
            name: 'GameGenresGenreId',
            columnNames: ['genre_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
      );

      await queryRunner.createForeignKey(
        'genres_games',
        new TableForeignKey({
            name: 'GameGenresGameId',
            columnNames: ['game_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'games',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('genres_games');
    }

}
