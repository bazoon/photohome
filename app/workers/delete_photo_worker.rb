class DeletePhotoWorker

include Sidekiq::Worker

    def perform(photo_id)
        photo = Photo.find(photo_id)
        photo.image && photo.remove_image!

        photo.destroy
    
    end


end