class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :logo_url, null: false
      t.string :win, null: false
      t.string :loss, null: false
      t.string :ranking, null: false
    end
  end
end
