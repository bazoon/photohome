class CloudController < ApplicationController

  def show
  	@tag_name = params[:id]
  	@photos = Photo.tagged_with(@tag_name, on: "themes").paginate(:page => params[:page],per_page: 12)
  end

  def index
  	@freqs = Photo.tag_counts_on(:themes).map {|t| [t.name,t.taggings_count]}
  end

end
