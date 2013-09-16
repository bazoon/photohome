class CompetitionPhoto < ActiveRecord::Base
  belongs_to :nomination,class_name: "Admin::Nomination"
  belongs_to :photo

  attr_reader :photo_ids

  delegate :image_url,:title,to: :photo


  def self.create_applied(ids_string,competition_id,nomination_id)
  
    begin
      ids = ids_string.split(",")
      ids.each do |id|
      
      if not_found_duplicatate?(id,competition_id)
        CompetitionPhoto.create(photo_id: id,competition_id: competition_id,nomination_id: nomination_id)
      else   
        return false
      end

    end  
    rescue Exception => e
      return false
    end  
    
    true
  end



  def self.not_found_duplicatate?(id,competition_id)
    CompetitionPhoto.where(photo_id: id,competition_id: competition_id).empty?    
  end  
    


end
