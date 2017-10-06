class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
	  def new
	    @user = Account.new
  	end

  	def create
    	user = Account.find_by_email(params[:email])
  		if user && user.authenticate(params[:password])
    		session[:user_id] = user.id
    		redirect_to root_path, :notice => "Welcome back, #{user.email}"
  		else
    		flash_now!(:error)
    		render "new"
  		end
  	end

  	def destroy
    	session[:user_id] = nil
      puts "session destroyed, user logged out"
    	redirect_to welcome_index_path
  	end

  	private
    	def login(user)
      		session[:user_id] = nil
    	end
end
