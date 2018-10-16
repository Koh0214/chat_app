class ChangeDatatypeTimestampOfMessages < ActiveRecord::Migration
  def change
    change_column :messages, :timestamp, :integer
  end
end
