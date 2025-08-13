# require 'will_paginate/view_helpers/link_renderer'

module RemoteLinkRendererHelper
  class RemoteLinkRenderer
#   class RemoteLinkRenderer < WillPaginate::ActionView::LinkRenderer
#     def prepare(collection, options, template)
#       super(collection, options, template)
#       @template = template
#       @container_attributes = @base_url_params = nil
#     end

#     def link(text, target, attributes = {})
#       stimulus_params = @options.fetch(:link_options, {}).fetch(:stimulus, nil)
#       if stimulus_params
#         attributes['data-action'] =
#           "#{stimulus_params[:controller]}##{stimulus_params[:action]}"
#       end
#       if target.is_a?(Integer)
#         if stimulus_params
#           attributes["data-#{stimulus_params[:param_name]}"] = target
#         end
#         attributes[:rel] = rel_value(target)
#         target = url(target)
#       end
#       # attributes[:href] = link_options_data_action ? '#' : target
#       attributes[:href] = target
#       tag(:a, text, attributes)
#     end
  end
end
