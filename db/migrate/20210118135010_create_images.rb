class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :title
      t.text :description
      t.integer :size
      t.string :mime_type

      t.timestamps
    end
  end
end
