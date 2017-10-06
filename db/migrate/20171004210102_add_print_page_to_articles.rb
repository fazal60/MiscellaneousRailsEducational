class AddPrintPageToArticles < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :print_page, :string
  end
end
