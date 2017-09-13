class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :set_cache_headers

  #This method checks if we have a user signed in
  def login_required
    if !logged_in?
      flash[:notice] = "Log in to edit or delete your post"
      redirect_to welcome_index_path
    else
      flash[:notice] = "Alerting you to the monkey on your car!"
    end
  end

  def logged_in?
    !!current_user
  end

  helper_method :logged_in?

  #This method gives us details about our user
  def current_user
    if session[:user_id]
      @current_user = Account.find(session[:user_id])
      @current_user
    else
      false
    end
  end

  helper_method :current_user

  private

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
end
