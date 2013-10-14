crumb :root do
  link I18n.t(:home), root_path
end

crumb :competitions do
  link I18n.t(:contests), competitions_path
end

crumb :view_competition_photos do |competition|
  link I18n.t(:photos_), view_photos_competition_path(competition)
  parent :competitions
end

crumb :competition_photos do |competition|
  link I18n.t(:sent_photos), competition_competition_photos_path(competition)
  parent :competitions
end

crumb :aply_competition_photos do |competition|
  link I18n.t(:apply_), competition_path(competition)
  parent :competition_photos,competition
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