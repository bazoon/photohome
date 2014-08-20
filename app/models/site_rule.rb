class SiteRule < ActiveRecord::Base
	validates :locale, presence: true


	def self.rules(locale)
		rule = self.where(locale: locale).first
		rule && rule.rules
	end

	def self.rules_digest(locale)
		rule = self.where(locale: locale).first
		rule && rule.rules_digest
	end

end
