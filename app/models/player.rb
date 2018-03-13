class Player < ApplicationRecord


  validates_presence_of :first_name, :last_name, :avatar_url,
                        :age, :height, :weight, :position

end
