CarrierWave.configure do |config|

  if Rails.env.development? || Rails.env.test?
    config.storage = :file
  else
    config.storage = :fog
    config.fog_credentials = {
      :provider               => 'AWS',                        # required
      :aws_access_key_id      => ENV["AWS_ACCESSS"],                        # required
      :aws_secret_access_key  => ENV["AWS_SECRET"],                        # required
      :region                 => 'eu-west-1'                  # optional, defaults to 'us-east-1'

    }
    config.asset_host = "http://dxmbwukubv76f.cloudfront.net"
    config.fog_directory  = 'photohome'                     # required
    config.fog_public     = true                                   # optional, defaults to true
    config.fog_attributes = {'Cache-Control'=>'max-age=315576000','Expires' => 1.week.from_now.httpdate}  # optional, defaults to {}
  end

end

