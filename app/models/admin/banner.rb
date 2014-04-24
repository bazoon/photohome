class Admin::Banner < ActiveRecord::Base
  mount_uploader :image, BannerUploader

  


end
