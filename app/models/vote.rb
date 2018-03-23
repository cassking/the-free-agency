class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :comment

  validates :user_id, presence: true
  validates :comment_id, presence: true
  validates :up_or_down, inclusion: { in: -1..1}
end
