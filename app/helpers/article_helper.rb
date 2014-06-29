module ArticleHelper

def article_image(article)
	if article.first_image_src
		article.first_image_src
	else
		"assets/blank.png"
	end
end

end
