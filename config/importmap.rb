# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
# pin "jquery", preload: true # @3.7.1
pin "jcrop", to: "jquery.Jcrop.js"
# pin "users", to: "users.js"
# pin "items", to: "items.js"
# pin "pages", to: "pages.js"
pin "@rails/request.js", to: "@rails--request.js.js" # @0.0.12
pin "truecropper" # @1.0.3
pin "truecropper.css"
