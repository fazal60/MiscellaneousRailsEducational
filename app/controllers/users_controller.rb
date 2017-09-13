class UsersController < ApplicationController
	require 'json'
	require 'will_paginate/array'
	before_action :login_required, only: [:show]

	def login
		@user = Account.new
	end

	def checkLogin
	    @username = params[:account][:email]
	    @password = params[:account][:password]
	    @user_exists = Account.validate_user(@username, @password)
	    # binding.pry
	    puts @username, @password, @user_exists
	    if @user_exists
	      	puts "user exists"
	      	session[:user_id] = @user_exists.id
	      	# binding.pry
	      	redirect_to user_url(:id => @user_exists.id, :username => @username), :flash => :success
	    else
	    	flash_now!(:error)
	      	puts "user does not exist re"
	      # redirect_to users_new_url
	    end
	end

	def show
	    @username = params[:username] 
	    @flutrack = Net::HTTP.get(URI.parse("http://api.flutrack.org/?time=14"))
	    # @flutrack = @flutrack[0]
	    @data = JSON.parse(@flutrack)
	    @paginatedData = @data.paginate(page: params[:page], per_page: 20)
	    # binding.pry
	    if params[:user]
	      	@user = params[:user]
	      	@username = @user["name"]
	    end
  	end
end
