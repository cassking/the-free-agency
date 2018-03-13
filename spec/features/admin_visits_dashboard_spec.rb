require 'rails_helper'

feature 'admin visits dashboard', %(
  As a signed up admin
  I want to see a list of non-admin users
  So that I can administer accounts
) do
  scenario 'users are present' do
    admin = FactoryBot.create(:user, role: 'admin')
    user = FactoryBot.create(:user)
    visit '/'
    click_on 'Sign In'
    fill_in "Email", with: admin.email
    fill_in "Password", with: admin.password
    click_on "Log in"
    visit dashboard_index_path
    expect(page).to have_content(user.username)
    expect(page).to have_content(user.email)
  end

  scenario 'admin deletes user' do
    admin = FactoryBot.create(:user, role: 'admin')
    user = FactoryBot.create(:user)
    visit '/'
    click_on 'Sign In'
    fill_in 'Email', with: admin.email
    fill_in 'Password', with: admin.password
    click_on 'Log in'
    visit dashboard_index_path
    click_on('Destroy')
    expect(page).to have_content('Admin Dashboard')
    expect(page).to have_content('User deleted')
  end
end
