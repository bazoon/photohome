# encoding: utf-8

class AdminAdultImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :small do
    process :resize_to_limit => [100, 100]
  end


  version :thumb do
    process :resize_to_limit => [250, 250]
  end

  version :normal do
    process :resize_to_limit => [800, 600]
  end

end
