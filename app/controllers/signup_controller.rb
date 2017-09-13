class SignupController < ApplicationController
	def new
  	end

  	def create
	    @account = Account.new(account_params)
	    # binding.pry
	    if @account.save
	      	session[:account_id] = @account.id
	      	
	      	redirect_to signup_index_url
	    else
	    	flash_now!(:error)
	      	render :new
	    end
  	end

  	private

  	def account_params
    	params.require(:account).permit(:name, :email, :password)
  	end
end
