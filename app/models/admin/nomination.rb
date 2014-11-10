class Admin::Nomination < ActiveRecord::Base
  validates :title, :max_photo_count, presence: true


  def title_plus_count
    "#{title} / #{max_photo_count}"
  end

  #Кол-во номинаций в которые запостил фото пользователь
  def self.nominations_for(user, competition)
    
    r= find_by_sql %Q{
    select distinct nomination_id from competition_photos, photos, admin_nominations
      where
        competition_photos.photo_id = photos.id and
        competition_photos.nomination_id = admin_nominations.id and
        competition_photos.competition_id = #{competition.id} and
        user_id = #{user.id}
    }
    r.map(&:nomination_id)

     # r.empty? ? 0 : r.first.nomination_count
    
  end




end
