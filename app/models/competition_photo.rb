class CompetitionPhoto < ActiveRecord::Base
  belongs_to :nomination,class_name: "Admin::Nomination"
  belongs_to :photo

  attr_reader :photo_ids

  delegate :image_url,:title,to: :photo






  def self.create_applied(ids_string,competition_id,nomination_id)
  
    begin
      ids = ids_string.split(",")
      
      ids.each do |id|
      
        CompetitionPhoto.create(photo_id: id,competition_id: competition_id,nomination_id: nomination_id)
      end  
    rescue Exception => e
      return false
    end  
    true
  end


end
