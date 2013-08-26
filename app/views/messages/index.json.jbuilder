json.array!(@messages) do |message|
  json.extract! message, :title, :content, :user_id, :status, :message_reason_id
  json.url message_url(message, format: :json)
end
