class EveryDayInfo

    attr_reader :novelties, :articles

    def initialize

        @novelties = Novelty.all
        @articles = Article.all

    end
    


end