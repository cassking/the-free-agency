class ChangeCommentsRankColumnToVote < ActiveRecord::Migration[5.1]
  def change
   rename_column :comments, :rank, :vote
  end
end
