class SiteRule < ActiveRecord::Base
	validates :locale, presence: true


	def self.rules(locale)
		self.where(locale: locale).first.rules
	end

	def self.rules_digest(locale)
		self.where(locale: locale).first.rules_digest
	end

end
