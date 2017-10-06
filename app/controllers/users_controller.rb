require 'json'
require 'will_paginate/array'
require 'rsolr'
require 'fetch_api_data'
class UsersController < ApplicationController

	include GetDataFromAPI
	include UsersHelper

	before_action :login_required, only: [:show]

	def login
		@user = Account.new
	end

	def checkLogin
	    @username = params[:account][:email]
	    @password = params[:account][:password]
	    @user_exists = Account.validate_user(@username, @password) #check if user exists
	    puts @username, @password, @user_exists
	    if @user_exists
	      	puts "user exists"
	      	session[:user_id] = @user_exists.id
	      	redirect_to user_url(:id => @user_exists.id, :username => @username), :flash => :success
	    else
	    	flash_now!(:error)
	      puts "user does not exist"
	    end
	end

	def show
			if !is_number(params[:id]) || params[:id].nil?
				params[:id] = session[:user_id].to_s
				puts "after change:", params[:id]
			end
			@result = GetDataFromAPI.fetchData
			@username = params[:username]
	    if params[:user]
	      	@user = params[:user]
			else
					@user = Account.find(params[:id])
	    end
			@username = @user["name"]
	end

	def search
		puts params[:search_for_articles]
		if !params[:search_for_articles].blank?
			# Solr search on Article model
	    @searched = Article.search do
	      keywords(params[:search_for_articles])
	    end

			session[:search_item] = @searched.results
			puts "class is:", @searched.class
			puts @searched.results.to_json
			redirect_to user_url(:id => session[:user_id], :searched => params[:search_for_articles])
		else
			redirect_to user_url(:id => session[:user_id])
  	end
	end
end
