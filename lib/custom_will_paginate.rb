require 'will_paginate/view_helpers/link_renderer'

# class CustomWillPaginate < WillPaginate::ActionView::LinkRenderer
#   def link(text, target, attributes = {})
#     puts '*'*50
#     puts "HELLO FROM LINK WILL PAGINATE"
#     puts '*'*50
#     if target.is_a? Fixnum
#       attributes[:rel] = rel_value(target)
#       target = url(target)
#     end
#     attributes[:href] = target
#     tag(:a, text, attributes)
#   end
# end

# puts "----- LinkRenderer defined: #{Object.const_defined? 'WillPaginate::ActionView::LinkRenderer'}"

class CustomWillPaginate
end
