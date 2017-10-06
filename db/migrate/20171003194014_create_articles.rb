class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string :web_url
      t.string :snippet
      t.string :print_page
      t.jsonb :blog
      t.string :source
      t.string :multimedia, array: true
      t.jsonb :headline
      t.string :keywords, array: true
      t.string :pub_date
      t.string :document_type
      t.string :new_desk
      t.string :section_name
      t.jsonb :byline
      t.string :type_of_material
      t.string :_id
      t.integer :word_count
      t.integer :score
      t.string :uri

      t.timestamps
    end
  end
end
