json.array!(@novelties) do |novelty|
  json.extract! novelty, :title, :content, :publish_date, :published, :user_id
  json.url novelty_url(novelty, format: :json)
end
