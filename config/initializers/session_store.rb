# Be sure to restart your server when you modify this file.
# cookie_store replaced with active_record_store to increase the size of data that can be stored in session
Rails.application.config.session_store :active_record_store, key: '_ShahidRailsApp_session', expire_after: 15.minutes
