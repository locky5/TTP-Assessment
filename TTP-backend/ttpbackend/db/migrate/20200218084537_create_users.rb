class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :money, default: 5000

      t.timestamps
    end
  end
end
