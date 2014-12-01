module CompetitionRequestHelper


  def current_tab(filter, search)
    return "filter" if filter
    return "search" if search
    "filter"
  end

end
