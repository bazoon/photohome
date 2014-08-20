class SiteRule < ActiveRecord::Base
	validates :locale, presence: true

	@@rules = {}
	@@rules_digest = {}

	def self.rules(locale)
		@@rules[locale] ||= self.where(locale: locale).first
	end

	def self.rules_digest(locale)
		@@rules[locale] ||= self.where(locale: locale).first.rules_digest
	end

end
