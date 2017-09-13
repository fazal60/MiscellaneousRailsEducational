module ApplicationHelper
	def bootstrap_class_for(flash_type)
	  case flash_type
	  when "success"
	    "alert-success"   # Green
	  when "error"
	    "alert-danger"    # Red
	  when "alert"
	    "alert-warning"   # Yellow
	  when "notice"
	    "alert-info"      # Blue
	  else
	    flash_type.to_s
	  end
	end

	def fading_flash_notice
	    # note: you must have a div with id='notices' or rename the div appended to below with your element which
	    # is the container for the flash messages
	    return '' if !flash[:notice]
	    notice_id = rand.to_s.gsub(/\./, '')
	    notice = <<-EOF
	      $('#notices').append("<div id='#{notice_id}' class='flash_notice'>#{flash[:notice]}</div>");
	      $("##{notice_id}").fadeOut(5000);
	    EOF
	    notice.html_safe
	end
end
