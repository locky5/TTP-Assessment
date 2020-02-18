Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  
  get "/auto_login", to: "auth#auto_login"
  post "/signup", to: "users#create"
  post "/login", to: "auth#login"
end
