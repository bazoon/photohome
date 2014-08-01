# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140731142404) do

  create_table "admin_age_policies", force: true do |t|
    t.integer  "age"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "admin_albums", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  create_table "admin_articles", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.text     "digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "admin_banner_placements", force: true do |t|
    t.integer  "banner_id"
    t.integer  "place_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active"
  end

  create_table "admin_banners", force: true do |t|
    t.string   "image"
    t.string   "link"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "admin_competition_request_responses", force: true do |t|
    t.integer  "response_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "competition_request_id"
  end

  create_table "admin_juries", force: true do |t|
    t.integer  "competition_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "admin_nominations", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "competition_id"
    t.integer  "max_photo_count"
  end

  create_table "admin_settings", force: true do |t|
    t.integer  "album_id"
    t.integer  "novelty_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "article_count"
    t.string   "articles"
    t.integer  "article_id"
    t.text     "footer"
  end

  create_table "comments", force: true do |t|
    t.string   "title",            limit: 50, default: ""
    t.text     "comment"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.integer  "user_id"
    t.string   "role",                        default: "comments"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["commentable_type"], name: "index_comments_on_commentable_type", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "commontator_subscriptions", force: true do |t|
    t.integer  "subscriber_id"
    t.string   "subscriber_type"
    t.integer  "thread_id"
    t.integer  "unread",          default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "commontator_subscriptions", ["subscriber_id", "subscriber_type", "thread_id"], name: "index_c_s_on_s_id_and_s_type_and_t_id", unique: true, using: :btree
  add_index "commontator_subscriptions", ["thread_id"], name: "index_commontator_subscriptions_on_thread_id", using: :btree

  create_table "commontator_threads", force: true do |t|
    t.integer  "commontable_id"
    t.string   "commontable_type"
    t.datetime "closed_at"
    t.integer  "closer_id"
    t.string   "closer_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "commontator_threads", ["commontable_id", "commontable_type"], name: "index_commontator_threads_on_cotable_id_and_comm_type", using: :btree

  create_table "competition_photos", force: true do |t|
    t.integer  "photo_id"
    t.integer  "competition_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "nomination_id"
    t.integer  "place",          default: 0
    t.boolean  "banned",         default: false
  end

  create_table "competition_requests", force: true do |t|
    t.integer  "competition_id"
    t.integer  "user_id"
    t.boolean  "approved",       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "response_id",    default: 0
    t.text     "answer"
  end

  create_table "competitions", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.date     "last_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "status_id"
    t.integer  "type_id"
    t.date     "open_date"
    t.string   "slug"
  end

  create_table "delayed_jobs", force: true do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "friendly_id_slugs", force: true do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "jury_ratings", force: true do |t|
    t.integer  "user_id"
    t.integer  "competition_photo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "rating"
  end

  create_table "letter_users", force: true do |t|
    t.integer  "letter_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "letters", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "seen",           default: false
    t.integer  "comments_count"
  end

  create_table "likes", force: true do |t|
    t.integer  "user_id"
    t.integer  "competition_photo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "reason_id"
    t.integer  "status_id",  default: 0
  end

  create_table "photos", force: true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "topic_id"
    t.boolean  "published"
    t.integer  "destination_id"
    t.boolean  "seen",           default: false
    t.boolean  "deleted",        default: false
    t.integer  "delayed_job_id"
    t.integer  "age_policy_id"
  end

  create_table "pictures", force: true do |t|
    t.string   "title"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.boolean  "published"
    t.integer  "user_id"
    t.text     "digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
    t.integer  "age_policy_id"
    t.string   "slug"
  end

  create_table "redactor_assets", force: true do |t|
    t.integer  "user_id"
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.integer  "assetable_id"
    t.string   "assetable_type",    limit: 30
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "redactor_assets", ["assetable_type", "assetable_id"], name: "idx_redactor_assetable", using: :btree
  add_index "redactor_assets", ["assetable_type", "type", "assetable_id"], name: "idx_redactor_assetable_type", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "site_photos", force: true do |t|
    t.integer  "photo_id"
    t.string   "image"
    t.integer  "album_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.integer  "age_policy_id"
    t.string   "user_name"
    t.integer  "user_id"
  end

  create_table "taggings", force: true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: true do |t|
    t.string "name"
  end

  create_table "topics", force: true do |t|
    t.string   "name"
    t.string   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "avatar"
    t.string   "last_name"
    t.string   "zip"
    t.string   "adress"
    t.string   "zip_code"
    t.string   "city"
    t.string   "country"
    t.string   "phone"
    t.text     "about"
    t.string   "login"
    t.string   "slug"
    t.date     "birth_date"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

end
