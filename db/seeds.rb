User.destroy_all

10.times do
    first_name = Faker::Name.first_name 
    last_name = Faker::Name.last_name 
    User.create(
        first_name: first_name,
        last_name: last_name,
        password: "password",
        password_confirmation: "password",
        email: "#{first_name}.#{last_name}@gmail.com"
    )
end

