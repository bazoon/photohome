class Admin::Album < ActiveRecord::Base
  has_many :site_photos
end
