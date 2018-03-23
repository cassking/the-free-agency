class UpdateTypeUpdownvotesColumn < ActiveRecord::Migration[5.1]
  def up
    change_column :votes, :up_or_down, 'integer USING CAST(up_or_down AS integer)'
  end
  def down
    change_column :votes, :up_or_down, :string
  end
end
