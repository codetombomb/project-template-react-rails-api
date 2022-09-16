class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user
        else
            render json: { errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find(params[:id])
        if user
            user.destroy
            render json: user
        else
            render json: {errors: "User not found"}, status: :not_found
        end
            
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :password, :password_confirmation, :email)
    end
end
