module UsersHelper
  def is_number(str)
    true if Float(str) rescue false
  end

  module_function :is_number
end
