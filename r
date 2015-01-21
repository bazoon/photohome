                competitions_view_anonymou GET    /competitions/view_anonymous/:id(.:format)                                   competitions/view_anonymous#show
                    gallery_show_anonymous GET    (/:locale)/gallery/show_anonymous/:photo_id(.:format)                        gallery#show_anonymous {:locale=>/en|ru/}
