class WelcomeController < ApplicationController
	def index
	  	if logged_in?
	  		flash[:success] = "You are already in!"
	  		record = Account.find(session[:user_id])
	      	redirect_to user_url(:id => session[:user_id], :username => record.name)
	    else
	    	flash[:notice] = "Alerting you to the monkey on your car!"
	    end
  	end
end
