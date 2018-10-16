class Message < ActiveRecord::Base
  mount_uploader :picture, PictureUploader
end
