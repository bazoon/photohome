class Admin::BannerPlacement < ActiveRecord::Base
  belongs_to :banner

  TOP = 0
  BOTTOM = 1

  scope :top, -> { where("start_date < ? and end_date >= ? and place_id = ?", Time.now, Time.now, TOP) } 
  scope :bottom, -> { where("start_date < ? and end_date >= ? and place_id = ?", Time.now, Time.now, BOTTOM) } 
  scope :active, -> { where(active: true) } 
  scope :random, -> { where("id in (?)", all.map(&:id).to_a.sample)  }
  
  PLACES = [
    { label: I18n.t("top"),value: TOP },
    { label: I18n.t("bottom"),value: BOTTOM }
  ]  
  
  LABEL = -> (s) {s[:label]}
  VALUE = -> (s) {s[:value]}

  def place_label
    PLACES.select {|e| e[:value] == place_id }[0][:label]
  end


  def active?
    active ? I18n.t("yess"): I18n.t("nno")
  end
  
  def self.select_for_top
    active.top.random.first.banner
  end

  def self.select_for_bottom
    active.bottom.random.first.banner
  end
    
end
