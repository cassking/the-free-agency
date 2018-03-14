class ChangeCommentsTableNameToComments < ActiveRecord::Migration[5.1]
  def change
    rename_table :comments_tables, :comments
  end
end
