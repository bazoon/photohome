class AddIndexes2 < ActiveRecord::Migration
  def change
  # add_index :admin_banner_placements, :banner_id
  # add_index :admin_banner_placements, :place_id
  # add_index :admin_competition_request_responses, :response_id
  # add_index :admin_juries, :user_id
  # add_index :admin_nominations, :competition_id
  add_index :admin_settings, :album_id
  add_index :admin_settings, :novelty_id
  add_index :admin_settings, :article_id
  add_index :album_photos, :photo_id
  add_index :competition_photos, :photo_id
  add_index :competition_photos, :competition_id
  add_index :competition_photos, :nomination_id
  add_index :competition_requests, :competition_id
  add_index :competition_requests, :user_id
  add_index :jury_ratings, :user_id
  add_index :jury_ratings, :competition_photo_id
  add_index :letter_people, :letter_id
  add_index :letter_people, :user_id
  add_index :likes, :user_id
  add_index :likes, :competition_photo_id
  add_index :messages, :user_id

  add_index :photos, :topic_id
  add_index :photos, :destination_id
  add_index :photos, :age_policy_id
  add_index :posts, :user_id
  add_index :posts, :age_policy_id
  add_index :user_subscriptions, :user_id
  
  end
end
