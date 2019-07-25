class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :e_mail
      t.string :password
      t.timestamps
    end
  end
end
