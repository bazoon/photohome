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
        can :manage, Admin::Setting
        can :manage, Article
        can :manage, Competition
        can :manage, Stats
      end

      if user.has_role? :writer
      
        can :create, Post
        can :read, Post
        
        can :manage, Post do |article|
          article.user_id == user.id    
        end


      end

    
    can :update, JuryRating, user_id: user.id if user.in_jury?
    

    can :jury, Competition do |competition|
      competition.jury.map(&:user).include?(user)
    end  

    can :jury, CompetitionPhoto do |cp|
      cp.photo.user != user
    end


    can :read, Message

    if user.has_role? :cluber
      can :read, Document 
    end

      

    can :manage, Comment, user_id: user.id
    can :write, Comment
    can :manage, Photo, user_id: user.id
    can :create, Photo

    can :view, Photo do |photo|
      user.age >= photo.age_policy_age
    end



    can :read, Article
    can :read, Novelty
   
    can :manage, Mailboxer::Conversation do |conversation|
      conversation.originator == user
    end

    can :read, Mailboxer::Conversation do |conversation|
      conversation.is_participant?(user)
    end

    can :request, Competition do |competition|
      competition.accepts_requests? && !competition.overdue?
    end

    can :like, Competition do |competition|
      (user.created_at < competition.created_at) && (competition.open_date > Time.zone.now)
    end

    can :create, Like

    can :manage, Like, user_id: user.id



    else    
      #Unregistered users
      can :read, [Photo, Novelty, Article, Comment]
      
      can :view, Photo do |photo|
        photo.age_policy_age <= 16 
      end  
      



    end
        
  
  end
end
