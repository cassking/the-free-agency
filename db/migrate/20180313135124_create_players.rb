class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :avatar_url, null: false
      t.integer :age, null: false
      t.integer :height, null: false
      t.integer :weight, null: false
      t.string :birth_city
      t.string :birth_country
      t.string :position, null: false
      t.string :twitter
      t.integer :team_id


      t.timestamps
    end
  end
end
