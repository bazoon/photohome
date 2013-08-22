json.array!(@topics) do |topic|
  json.extract! topic, :name, :content
  json.url topic_url(topic, format: :json)
end
