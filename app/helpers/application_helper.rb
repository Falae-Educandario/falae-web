require File.join(Rails.root, "lib", "custom_will_paginate.rb")

module ApplicationHelper
  # change the default link renderer for will_paginate
  # def will_paginate(collection_or_options = nil, options = {})
  #   if collection_or_options.is_a? Hash
  #     options, collection_or_options = collection_or_options, nil
  #   end
  #   unless options[:renderer]
  #     options = options.merge :renderer => CustomWillPaginate
  #   end
  #   super *[collection_or_options, options].compact
  # end

  # def paginate(collection, params = {})
  #   will_paginate collection, params.merge(renderer: RemoteLinkRendererHelper::RemoteLinkRenderer)
  #   # will_paginate collection, params.merge(renderer: CustomWillPaginate)
  #   # will_paginate collection, params
  # end
end
