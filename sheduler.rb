require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

# ...

scheduler.in '3s' do
  puts 'Hello... Rufus'
end


scheduler.in '1m' do
  # do something in 10 days
 puts "Hello"	
end



