class Admin::Banner < ActiveRecord::Base
  mount_uploader :image, BannerUploader


def active?
  active ? I18n.t("yess"): I18n.t("nno")
  
end

end
