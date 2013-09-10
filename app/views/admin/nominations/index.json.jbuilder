json.array!(@admin_nominations) do |admin_nomination|
  json.extract! admin_nomination, :title, :description
  json.url admin_nomination_url(admin_nomination, format: :json)
end
