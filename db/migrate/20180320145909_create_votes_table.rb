class CreateVotesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :votes do |t|
      t.string :up_or_down, null: false

      t.belongs_to :user
      t.belongs_to :comment

      t.timestamps null: false
    end
  end
end
