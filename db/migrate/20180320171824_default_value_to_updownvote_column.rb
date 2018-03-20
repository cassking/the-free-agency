class DefaultValueToUpdownvoteColumn < ActiveRecord::Migration[5.1]
  def up
    change_column :votes, :up_or_down, :integer, default: 0
  end

  def down
    change_column :votes, :up_or_down, :integer, default: nil
  end
end
