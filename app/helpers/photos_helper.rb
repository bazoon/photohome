module PhotosHelper

def post_image(post)
	if post.first_image_src
		post.first_image_src
	else
		"/assets/blank.png"
	end
end

end
