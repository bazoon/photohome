class CloudController < ApplicationController


  skip_before_filter :authenticate_user!

  def show
  	@tag_name = params[:id]
  	@photos = Photo.tagged_with(@tag_name, on: "themes").uniq.paginate(:page => params[:page],per_page: 12)
  end

  def index
  	# @freqs = Photo.tag_counts_on(:themes).map {|t| [t.name, t.taggings_count]}
    @freqs = Tag.select('name, sum(taggings_count) as tcount').group('name').map {|t| [t.name, t.tcount]}
    # binding.pry
  end

end
