class Article < ApplicationRecord
  validates :_id, uniqueness: true
  searchable do
    text :headline, :default_boost => 2
    text :web_url
  end
end
