crumb :root do
  link I18n.t(:home), root_path
end

crumb :competitions do
  link I18n.t(:contests), competitions_path
end

crumb :competition do |competition|
  link competition.title, competition_path(competition)
  parent :competitions
end

crumb :view_competition_photos do |competition|
  link I18n.t(:photos_), view_photos_competition_path(competition)
  parent :competitions
end

crumb :competition_photos do |competition|
  link I18n.t(:sent_photos), competition_photos_path(competition)
  parent :competitions
end

crumb :aply_competition_photos do |competition|
  link I18n.t(:apply_), competition_path(competition)
  parent :competition_photos,competition
end

crumb :novelties do
  link I18n.t(:novelties_), list_novelties_path
end

crumb :novelty do |novelty|
  link novelty.title, novelty_path(novelty)
  parent :novelties
end

crumb :articles do
  link I18n.t(:articles_), list_articles_path
end


crumb :article do |article|
  link article.title, article_path(article)
  parent :articles
end

crumb :admin_novelties do
  link I18n.t(:novelties_), admin_novelties_path
end

crumb :admin_novelty do |novelty|
  link novelty.title, admin_novelty_path(novelty)
  parent :admin_novelties
end

crumb :admin_articles do
  link I18n.t(:articles_), admin_articles_path
end


crumb :admin_article do |article|
  link article.title, admin_article_path(article)
  parent :admin_articles
end

crumb :last_photos do
  link I18n.t(:last_photos), gallery_index_path
end

crumb :last_photo do |last_photo|
  link last_photo.title, gallery_show_path(last_photo)
  parent :last_photos
end

crumb :albums do
  link I18n.t(:albums), albums_path
end

crumb :album do |album|
  link album.title, album_path(album)
  parent :albums
end

crumb :authors do
  link I18n.t(:authors), author_index_path
end

crumb :user_profile do
  link I18n.t(:user_profile), user_profile_path
end

# crumb :project_issues do |project|
#   link "Issues", project_issues_path(project)
#   parent :project, project
# end

# crumb :issue do |issue|
#   link issue.title, issue_path(issue)
#   parent :project_issues, issue.project
# end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).