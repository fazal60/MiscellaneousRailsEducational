module GetDataFromAPI
  def fetchData
    uri = URI("https://api.nytimes.com/svc/search/v2/articlesearch.json")
  	http = Net::HTTP.new(uri.host, uri.port)
  	http.use_ssl = true
  	uri.query = URI.encode_www_form({
  	  "api-key" => "46c83b053f6148629783db6d00ebf0d7"
  	})
  	request = Net::HTTP::Get.new(uri.request_uri)
  	@result = JSON.parse(http.request(request).body)

    @result["response"]["docs"].each do |jsonUnit, val|
      if jsonUnit["print_page"]
        article = Article.new(
          :web_url => jsonUnit["web_url"],
          :snippet => jsonUnit["snippet"],
          :print_page => jsonUnit["print_page"],
          :blog => jsonUnit["blog"],
          :source => jsonUnit["source"],
          :multimedia => jsonUnit["multimedia"],
          :headline => jsonUnit["headline"],
          :keywords => jsonUnit["keywords"],
          :pub_date => jsonUnit["pub_date"],
          :document_type => jsonUnit["document_type"],
          :new_desk => jsonUnit["new_desk"],
          :section_name => jsonUnit["section_name"],
          :byline => jsonUnit["byline"],
          :type_of_material => jsonUnit["type_of_material"],
          :_id => jsonUnit["_id"],
          :word_count => jsonUnit["word_count"],
          :score => jsonUnit["score"],
          :uri => jsonUnit["uri"]
        )
      else
        article = Article.new(
          :web_url => jsonUnit["web_url"],
          :snippet => jsonUnit["snippet"],
          :blog => jsonUnit["blog"],
          :source => jsonUnit["source"],
          :multimedia => jsonUnit["multimedia"],
          :headline => jsonUnit["headline"],
          :keywords => jsonUnit["keywords"],
          :pub_date => jsonUnit["pub_date"],
          :document_type => jsonUnit["document_type"],
          :new_desk => jsonUnit["new_desk"],
          :section_name => jsonUnit["section_name"],
          :byline => jsonUnit["byline"],
          :type_of_material => jsonUnit["type_of_material"],
          :_id => jsonUnit["_id"],
          :word_count => jsonUnit["word_count"],
          :score => jsonUnit["score"],
          :uri => jsonUnit["uri"]
        )
      end

      article.save
    end
    @result
  end

  module_function :fetchData
end
