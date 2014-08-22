class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index,:test]

  def index

    setting = Admin::Setting.first
    @setting_decorator = Admin::SettingDecorator.new(setting) 

    # @last_photos = Photo.where(published: true).last(4)
    @last_photos = Photo.last_published(4)
    # fresh_when(setting)

  end


  def test
    # @photos = Photo.all
    # expire_fragment(AlbumHelper::cache_key_album_last_photos)

    # Photo.all.each do |p|
    #   p.theme_list = p.themes.map(&:name).uniq.join(",")
    #   p.save
    # end

    ActsAsTaggableOn::Tag.all.each do |tag|

      count=ActsAsTaggableOn::Tagging.all.select {|t| t.tag_id == tag.id }.count
      # tag.taggings_count = count
      # tag.save
      
      
      ActsAsTaggableOn::Tag.reset_counters(tag.id, :taggings)      



    end


    render text: "OK"
  end


end
