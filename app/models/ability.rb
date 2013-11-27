class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    
    if user.has_role? :admin
      can :manage, :all
    end  
    
    if user.has_role? :moder
      can :manage, Novelty  
      can :manage, Admin::Album
      can :manage, Admin::SitePhoto  
      can :manage, Admin::Setting
      can :manage, Article
    end

    if user.in_jury?
      can :update, JuryRating, user_id: user.id
    end  

    if user.valid?
      can :read, Message
      can :manage, Comment,user_id: user.id
      can :manage, Photo, user_id: user.id
      can :read, :all    
      can :create, :Like
      can :manage, :Like, user_id: user.id
      can :read, Article
      cannot :read, Letter
      can :manage, Letter, user_id: user.id
     
      can :read, Letter do |letter|
        
        letter.letter_users.any? { |lu| lu.user.id == user.id }

      end

    end

    can :read, Photo

  

    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user permission to do.
    # If you pass :manage it will apply to every action. Other common actions here are
    # :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. If you pass
    # :all it will apply to every resource. Otherwise pass a Ruby class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details: https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end
