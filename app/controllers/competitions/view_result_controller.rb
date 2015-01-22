class Competitions::ViewResultController < ApplicationController
  def show
    @competition_photo = CompetitionPhoto.find(params[:competition_photo_id])

    @next = CompetitionPhoto.not_banned
                            .with_nomination(@competition_photo.nomination_id)
                            .next(@competition_photo.id)
    @prev = CompetitionPhoto.not_banned
                            .with_nomination(@competition_photo.nomination_id)
                            .prev(@competition_photo.id)


  end
end
