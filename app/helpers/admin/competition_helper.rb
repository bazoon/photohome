module Admin::CompetitionHelper


def competition_class(competition)
    
    if competition.open_date < Time.zone.now
      return "label label-info"
    elsif competition.open_date > Time.zone.now
      return "label label-default"
    else
      return "label label-success"
    end  
      

  end


end
