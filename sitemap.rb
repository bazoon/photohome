require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://example.com'
SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'daily', :priority => 0.9
  add '/albums', :changefreq => 'weekly'
  add '/gallery/index', :changefreq => 'weekly'
  add '/author', :changefreq => 'weekly'
  add '/competitions', :changefreq => 'weekly'
  add '/novelties/list', :changefreq => 'weekly'
  add '/articles/list', :changefreq => 'weekly'
end

SitemapGenerator::Sitemap.ping_search_engines # Not needed if you use the rake tasks