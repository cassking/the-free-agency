require 'rails_helper'

feature 'user registers', %(
  As a visitor
  I want to register
  So that I can create an account
) do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * If I don't specify the required information, I am presented with
  #   an error message

  scenario 'provide valid registration information' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Username', with: 'joew'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    attach_file 'Avatar', "#{Rails.root}/app/assets/images/default.jpg"
    click_button 'Sign up'

    expect(User.last.avatar.present?).to be(true)
    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')
    expect(User.last.role).to eq('member')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign up'
    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Sign Out')
  end
end
