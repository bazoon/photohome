class CloudsController < ApplicationController
  def show
  	@freqs = Photo.tag_counts_on(:themes).map {|t| [t.name,t.taggings_count]}
  end
end
