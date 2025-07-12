# Load the Rails application.
require_relative "application"

FALAE_IMAGES_PATH = if ENV['FALAE_IMAGES_PATH']
    if !Dir.exist?(ENV['FALAE_IMAGES_PATH'])
      raise "Directoy path set by FALAE_IMAGES_PATH env var (#{ENV['FALAE_IMAGES_PATH']}) does not exist."
    else
      ENV['FALAE_IMAGES_PATH']
    end
  else
    Rails.root.join('storage')
  end

# Initialize the Rails application.
Rails.application.initialize!

# transform key to camel case for json responses
Jbuilder.key_format camelize: :lower

Dir.mkdir "#{FALAE_IMAGES_PATH}/public" unless Dir.exist? "#{FALAE_IMAGES_PATH}/public"
Dir.mkdir "#{FALAE_IMAGES_PATH}/private" unless Dir.exist? "#{FALAE_IMAGES_PATH}/private"
