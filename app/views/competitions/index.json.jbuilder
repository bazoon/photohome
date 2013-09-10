json.array!(@competitions) do |competition|
  json.extract! competition, :title, :description, :last_date
  json.url competition_url(competition, format: :json)
end
