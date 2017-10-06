
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

  	render: function() {
    	return (
    		<div>
    			<ShowSearchBar nytdata={this.props.nytdata["response"]["docs"]}/>

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
    						  <p className="bg-info">{this.state.foundAddress}</p>
    						}
            </div>

            <div className = "news-container">
         			<div className="panel panel-default">
     	    			<div className="panel-body">
     	    				<div style={{ "position": "inherit", "width": "100%", "height": "250px"}} className="map" ref={this.setMapElementReference}></div>
     	    			</div>
     	    		</div>
   	        </div>

            <ShowArticles nytdata={this.props.nytdata}/>

            <form className="form-inline" onSubmit={this.handleFormSubmit}>
              <input type="text" className="form-control input-lg" id="address" placeholder="Search for Articles" ref={this.setSearchInputElementReference} required />
              <button type="submit" className="btn btn-default btn-lg">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </button>
            </form>

				</div>
        <div className="row">

        </div>

				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog" role="document">
				    	<div className="modal-content">
				      		<div className="modal-header">
				        		<h5 className="modal-title">Modal title</h5>
				        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          			<span aria-hidden="true">&times;</span>
				        		</button>
				      		</div>
				      		<div className="modal-body"  style={{ "height": "450px" }} >
								Shahid
				      		</div>
				      		<div className="modal-footer">
						        <button type="button" className="btn btn-primary">Save changes</button>
						        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				      		</div>
				    	</div>
				  	</div>
				</div>
			</div>
		);
	}
});
