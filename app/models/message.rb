class Message < ApplicationRecord
  belngs_to :user
  belngs_to :group
end
