class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :username, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :avatar, AvatarUploader

  def admin?
    role == 'admin'
  end

end
