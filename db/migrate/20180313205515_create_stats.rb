class CreateStats < ActiveRecord::Migration[5.1]
  def change
    create_table :stats do |t|
      t.string :ppg, null: false
      t.string :apg, null: false
      t.string :rpg, null: false
      t.integer :player_id 
    end
  end
end
