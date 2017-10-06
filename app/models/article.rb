class Article < ApplicationRecord
  searchable do
    text :headline, :default_boost => 2
    text :web_url
  end
end
