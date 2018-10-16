class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :from_user_id, null: false
      t.integer :to_user_id, null: false

      t.timestamps null: false
    end
  end
end
