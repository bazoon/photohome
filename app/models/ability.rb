class Ability
  include CanCan::Ability

  def initialize(user)
    # user ||= User.new # guest user (not logged in)
    
    #Registered users
    if user 

      if user.has_role? :admin
        can :manage, :all
      end  
      
      if user.has_role? :moder
        can :manage, Novelty  
        can :manage, Admin::Album
        can :manage, SitePhoto  
        can :manage, Admin::Setting
        can :manage, Article
      end

      if user.has_role? :writer
      
        can :create, Post
        can :read, Post
        
        can :manage, Post do |article|
            article.user_id == user.id    
        end


      end

      if user.in_jury?
        can :update, JuryRating, user_id: user.id
      end  


    can :read, Message
    can :manage, Comment, user_id: user.id
    can :write, Comment
    can :manage, Photo, user_id: user.id
    can :create, Photo

    can :create, :Like
    can :manage, :Like, user_id: user.id
    can :read, Article
    can :read, Novelty
    cannot :read, Letter
    can :manage, Letter, user_id: user.id
   
    can :read, Letter do |letter|
      letter.letter_users.any? { |lu| lu.user.id == user.id }
    end

    can :request, Competition 
    else    
      #Unregistered users
      can :read, [Photo, Novelty, Article, Comment]
    end
        
    

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
