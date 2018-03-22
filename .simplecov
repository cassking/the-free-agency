require 'simplecov'
require 'coveralls'

SimpleCov.formatter = Coveralls::SimpleCov::Formatter
SimpleCov.start do
add_filter 'app/channels/application_cable/channel.rb'
add_filter 'app/channels/application_cable/connection.rb'
add_filter 'app/jobs/application_job.rb'
add_filter 'app/mailers/application_mailer.rb'
add_filter 'config/initializers/wrap_parameters.rb'
add_filter 'app/controllers/users/sessions_controller.rb'
add_filter 'app/controllers/users/registrations_controller.rb'
add_filter 'app/controllers/users/omniauth_callbacks_controller.rb'
add_filter 'app/controllers/users/unlocks_controller.rb'
add_filter 'app/controllers/users/confirmations_controller.rb'
add_filter 'app/controllers/users/passwords_controller.rb'
add_filter 'app/helpers/application_helper.rb'
add_filter 'app/controllers/homes_controller.rb'
end
