
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
	propTypes: {
	    flutracks: React.PropTypes.array.isRequired
  	},

	alert() {
		alert("Shahid");
	},

  	render: function() {
    	return (
    		<div>
    			<ShowSearchBar />
    			<ShowTable props = {this.props}/>
    		</div>
    	);
  	}
});

var ModalShow = React.createClass({

	render: function() {
		Modal = ReactBootstrap.Modal;
		Button = ReactBootstrap.Button;
		return	(
			<Modal show={this.props.showMyModal} onHide={this.props.close}>
	          	<Modal.Header closeButton>
	            	<Modal.Title>Modal heading</Modal.Title>
	          	</Modal.Header>
          		<Modal.Body>
            		<h4>Text in a modal</h4>
	          	</Modal.Body>
	          	<Modal.Footer>
		            <Button onClick={this.props.close}>Close</Button>
	          	</Modal.Footer>
	        </Modal>
		);
	}
});

var ShowTable = React.createClass({	
	getInitialState() {
	    return { showModal: false };
	},

	close() {
	    this.setState({ showModal: false });
	},

	open() {
	    this.setState({ showModal: true });
	},

  	render: function() {
  		Modal = ReactBootstrap.Modal;
  		Button = ReactBootstrap.Button;

  		props = this.props.props;
	  	flutracks = this.props.props.flutracks.map( function(flutrack, i) {
	      return (
	        <tr key={i}>
	          <td>{flutrack.user_name}</td>
	          <td>{flutrack.tweet_text}</td>
	          <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal"> {flutrack.latitude} </button> </td>
	          <td>{flutrack.longitude}</td>
	          <td>{flutrack.tweet_date}</td>
	          <td>{flutrack.aggravation}</td>
	        </tr>
	      );
	    });
    	return (
    		<div className="col-sm-10 col-sm-offset-1" id="Flutracks">
	      		<h1><br/>Hello {this.props.props.name}!</h1>
	      		<h1>Flutrack Data for Last 7 Days</h1>
		        <div>		          
		          <table className = "table table-nonfluid table-bordered" style={{ "width": "100%"}}>
		            <thead>
		              <tr>
		                <th>Username</th>
		                <th>Tweet Text</th>
		                <th>Latitude</th>
		                <th>Longitude</th>
		                <th>Tweet Date</th>
		                <th>Aggravation</th>
		              </tr>
		            </thead>
		            <tbody>
		              {flutracks}
		            </tbody>
		          </table>
		        </div>
	    	</div>
    	);
  	}
});

var ShowSearchBar = React.createClass({
	getInitialState: function () {
	    return {
	      isGeocodingError: false,
	      foundAddress: INITIAL_LOCATION.address
	    };
	  },
	componentDidMount: function () {
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
				<form className="form-inline" onSubmit={this.handleFormSubmit}>
				  <label className="sr-only" htmlFor="address">Address</label>
				  <input type="text" className="form-control input-lg" id="address" placeholder="London" ref={this.setSearchInputElementReference} required />
				  <button type="submit" className="btn btn-default btn-lg">
				    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
				  </button>
				</form>
				<div className="row" style={{ "height": "250px" }} >
				    <div className="col-sm-12" >
			      		{
						  this.state.isGeocodingError 
						  ? 
						  <p className="bg-danger">Address not found.</p>
						  :
						  <p className="bg-info">{this.state.foundAddress}</p>
						}
						<div style={{ "position": "absolute", "width": "98%", "height": "250px"}} className="map" ref={this.setMapElementReference}></div>
					</div>
				</div>
				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog" role="document">
				    	<div className="modal-content">
				      		<div className="modal-header">
				        		<h5 className="modal-title">Modal title</h5>
				        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          			<span aria-hidden="true">&times;</span>
				        		</button>
				      		</div>
				      		<div className="modal-body">
								<p> My new Modal </p>
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
