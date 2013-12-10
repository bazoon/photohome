class Admin::BannerPlacement < ActiveRecord::Base
  belongs_to :banner
  
  TOP = 0
  BOTTOM = 1

  PLACES = [
    {label: I18n.t("top"),value: TOP},
    {label: I18n.t("bottom"),value: BOTTOM}
  ]  
  
  LABEL = -> (s) {s[:label]}
  VALUE = -> (s) {s[:value]}

  def place_label
    PLACES.select {|e| e[:value] == place_id }[0][:label]
  end


def active?
  active ? I18n.t("yess"): I18n.t("nno")
end
  

    
end
