
var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var HelloMessage = React.createClass({

    searchArticles(event) {
      if (event.target.value) {
        $.ajax({
            url: this.props.searchPath+"?query="+event.target.value,

            dataType: 'json',

            success: function(data) {
              var parsedData = JSON.parse(data.art_search);
              this.setState({articles: parsedData});
            }.bind(this),

            error: function(data) {
              this.setState({articles: []});
            }.bind(this)
          });
      }
    },

    getInitialState() {
  		return { articles: [] };
  	},

  	render: function() {
      console.log(this.props);
    	return (
    		<div>
    			<ShowSearchBar nytdata={this.props.nytdata["response"]["docs"]} searchPath = {this.props.searchPath} submitPath = {this.searchArticles} articles = {this.state.articles}/>
    		</div>
    	);
  	}
});

var Articles = React.createClass({
	render() {
		var showArticles = (article) => <Article key={article["id"]} name={article["headline"]["main"]}/>;
    console.log("map printing");
    console.log(this.props.articles);
    var allArticles = this.props.articles.map(showArticles);

		return (
       <div className = "news-container">
          <div className="panel panel-default">
            <div className="panel-heading text-center">Articles searched</div>
            <div className="panel-body">
              <ul>
                {allArticles}
              </ul>
            </div>
          </div>
      </div>
    );
	}
});

var Article = React.createClass({
	render () {
		return (
			   <div>
		        <h4>{ this.props.name }</h4>
		    </div>
			)
	}
});

var ArticlesSearch = React.createClass({
	render () {
		return (
			<div>
				<form ref="form" action={ this.props.searchPath } acceptCharset="UTF-8" method="get">
				<p><input ref="query" name="query" placeholder="Search Articles ......" onChange={ this.props.submitPath } /></p>
				</form>
			</div>
			);
	}
});

var ShowArticles = React.createClass({
	render: function() {
	  	nytData = this.props.nytdata.map( function(nytdatum, i) {
	      return (
	        <li key={i}><a href={nytdatum["web_url"]}>{nytdatum["headline"]["main"]}</a></li>
	      );
	    });
    	return (
			   <div className = "news-container">
      			<div className="panel panel-default">
              <div className="panel-heading text-center">Latest Trending Headlines</div>
  	    			<div className="panel-body">
  	    				{nytData}
  	    			</div>
  	    		</div>
  	    </div>
    	);
  	}
});

var ShowSearchBar = React.createClass({
	getInitialState: function () {
	    return {
	      isGeocodingError: false,
	      foundAddress: "No address entered"
	    };
	},
	componentWillUpdate: function () {
	  	this.map = new google.maps.Map(this.mapElement, {
	    	zoom: INITIAL_MAP_ZOOM_LEVEL,
	    	center: {
	      		lat: INITIAL_LOCATION.position.latitude,
	      		lng: INITIAL_LOCATION.position.longitude
	    	}
	  	});

	  	this.marker = new google.maps.Marker({
		    map: this.map,
		    position: {
		      lat: INITIAL_LOCATION.position.latitude,
		      lng: INITIAL_LOCATION.position.longitude
		    }
		});

		this.geocoder = new google.maps.Geocoder();
	},
	componentDidMount: function () {
	  	this.map = new google.maps.Map(this.mapElement, {
	    	zoom: INITIAL_MAP_ZOOM_LEVEL,
	    	center: {
	      		lat: INITIAL_LOCATION.position.latitude,
	      		lng: INITIAL_LOCATION.position.longitude
	    	}
	  	});

	  	var myMap = this.map;

	  	console.log(myMap);
	  	console.log($("latId").text());

	  	this.marker = new google.maps.Marker({
		    map: this.map,
		    position: {
		      lat: INITIAL_LOCATION.position.latitude,
		      lng: INITIAL_LOCATION.position.longitude
		    }
		});

		this.geocoder = new google.maps.Geocoder();

		$("#myModal").on("shown.bs.modal", function () {
		    google.maps.event.trigger(myMap, "resize");
		    myMap.setCenter(new google.maps.LatLng($("latId").text(), $("longId").text()));
		});
	},

	setMapElementReference: function (mapElementReference) {
    	this.mapElement = mapElementReference;
  	},
  	setSearchInputElementReference: function (inputReference) {
	  	this.searchInputElement = inputReference;
	},
	handleFormSubmit: function (submitEvent) {
	  	submitEvent.preventDefault();
	  	var address = this.searchInputElement.value;
	  	this.geocodeAddress(address);
	},
	geocodeAddress: function (address) {
	  	this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
	    	if (status === google.maps.GeocoderStatus.OK) {
	      		this.map.setCenter(results[0].geometry.location);
	      		this.marker.setPosition(results[0].geometry.location);
	      		return;
	    	}
		    this.map.setCenter({
		      	lat: ATLANTIC_OCEAN.latitude,
		      	lng: ATLANTIC_OCEAN.longitude
		    });
		    this.marker.setPosition({
		      	lat: ATLANTIC_OCEAN.latitude,
		      	lng: ATLANTIC_OCEAN.longitude
		    });
	  	}.bind(this));
	},
	render: function() {

		return (
			<div className="container col-sm-10 col-sm-offset-1">

				<div className="row" style={{"height": "250px"}}>
            <form className="form-inline" onSubmit={this.handleFormSubmit}>
              <input type="text" className="form-control input-lg" id="address" placeholder="Enter place or zipcode" ref={this.setSearchInputElementReference} required />
              <button type="submit" className="btn btn-default btn-lg">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </button>
            </form>

            <div className="col-sm-12" >
			      		{
    						  this.state.isGeocodingError
    						  ?
    						  <p className="bg-danger">Address not found.</p>
    						  :
    						  <p className="bg-info"></p>
    						}
            </div>

            <div className = "news-container">
         			<div className="panel panel-default">
                <div className="panel-heading text-center">Location on Map</div>
     	    			<div className="panel-body">
     	    				<div style={{ "position": "inherit", "width": "100%", "height": "250px"}} className="map" ref={this.setMapElementReference}></div>
     	    			</div>
     	    		</div>
   	        </div>

            <ShowArticles nytdata={this.props.nytdata}/>
            <ArticlesSearch searchPath = {this.props.searchPath} submitPath = {this.props.submitPath} />
            <Articles articles = {this.props.articles} />
				</div>
			</div>
		);
	}
});
