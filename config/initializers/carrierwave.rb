CarrierWave.configure do |config|
    
  if Rails.env.development? || Rails.env.test?
    config.storage = :file
  else  
    config.fog_credentials = {
      :provider               => 'AWS',                        # required
      :aws_access_key_id      => ENV["AWS_ACCESSS"],                        # required
      :aws_secret_access_key  => ENV["AWS_SECRET"],                        # required
      :region                 => 'eu-west-1'                  # optional, defaults to 'us-east-1'
     
    }
    config.fog_directory  = 'photohome'                     # required
    config.fog_public     = false                                   # optional, defaults to true
    config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
  end  

end

