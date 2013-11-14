class Admin::Setting < ActiveRecord::Base

   belongs_to :album, class_name: "Admin::Album"
   belongs_to :novelty

end
