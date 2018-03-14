module ApplicationHelper
  def user_avatar(user)
    if user.avatar.present?
      image_tag user.image_url :thumbnail
    else
      image_tag 'default.jpg'
    end
  end
end