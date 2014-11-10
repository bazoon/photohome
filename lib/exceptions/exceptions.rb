module Exceptions


  class EmptyNomination < Exception

    def initialize(msg = I18n.t(:nomination_empty))
      super(msg)
    end

  end

  class NoPhotoAttached < Exception
    def initialize(msg = I18n.t(:photo_ids_empty))
      super(msg)
     end
  end

  class ClosedCompetition < Exception
     def initialize(msg = I18n.t(:competition_too_late))
      super(msg)
     end
  end

  class DuplicatePhoto < Exception

    def initialize(msg = I18n.t(:comp_photo_already_posted))
      super(msg)
    end

  end

  class MaxNominationCapacity < Exception
    def initialize(msg = I18n.t(:max_nomination_capacity_exceeded))
      super(msg)
    end
  end

    class ExceededPaidNominations < Exception
    def initialize(msg = I18n.t(:exceeded_paid_nominations))
      super(msg)
    end
  end



  class PhotoParicipateInCompetition < Exception
    def initialize(msg = I18n.t(:max_nomination_capacity_exceeded))
      super(msg)
    end
  end

  
  class ProfileEmpty < Exception    
    
    def initialize(msg = I18n.t(:profile_empty))
      super(msg)
    end
   
  end 


  class ParticipateInCompetition < Exception    
    
    def initialize(msg = I18n.t(:participate_in_competition))
      super(msg)
    end
   
  end 







end