class UserSubscription < ActiveRecord::Base
    belongs_to :user

    ON_NEWS = 0
    ON_SITE_PHOTOS = 1
    ON_USER_PHOTOS = 2


 KINDS = [
    { label: I18n.t("on_news"), value: ON_NEWS },
    { label: I18n.t("on_site_photos"), value: ON_SITE_PHOTOS }
    
  ]

  LABEL = -> (s){s[:label]}
  VALUE = -> (s){s[:value]}  

def kind_string
    KINDS.select { |r| r[:value] == self.kind }.first[:label]
end

end
