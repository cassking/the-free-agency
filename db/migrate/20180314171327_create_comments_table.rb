class CreateCommentsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :comments_tables do |t|
      t.integer :user_id, null: false
      t.integer :player_id, null: false
      t.text :body, null: false
      t.integer :rank

      t.timestamps null: false
    end
  end
end
