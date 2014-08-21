class UserCloudController < ApplicationController
  layout "user_profile_layout"
  skip_before_filter :authenticate_user!

   def cloud
    @user = User.friendly.find(params[:user_id])    
    # @tag_ids = ActsAsTaggableOn::Tagging.where("tagger_id=?",[@user.id]).map(&:tag_id)
    # @id_hash = @tag_ids.inject(Hash.new(0)) {|h,e| h[e] += 1; h}
    # @freqs = @id_hash.map {|e| [ ActsAsTaggableOn::Tag.find(e[0]).name , e[1] ] }

    @freqs = @user.photos.tag_counts_on(:themes).map {|t| [t.name,t.taggings_count]}

  end


end
