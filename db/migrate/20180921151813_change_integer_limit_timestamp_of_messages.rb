class ChangeIntegerLimitTimestampOfMessages < ActiveRecord::Migration
  def change
    change_column :messages, :timestamp, :integer, limit: 50
  end
end
