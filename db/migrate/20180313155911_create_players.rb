class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :avatar_url, null: false
      t.string :age, null: false
      t.string :height, null: false
      t.string :weight, null: false
      t.string :birth_city
      t.string :birth_country
      t.string :position, null: false
      t.string :twitter
      t.integer :team_id

      t.timestamps
    end
  end
end
