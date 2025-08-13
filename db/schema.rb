# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2023_03_07_220354) do
  create_table "base_categories", force: :cascade do |t|
    t.string "name", null: false
    t.string "color", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "description"
    t.string "locale", default: "pt"
    t.integer "base_category_id"
    t.index ["base_category_id"], name: "index_categories_on_base_category_id"
  end

  create_table "csp_reports", force: :cascade do |t|
    t.string "user_agent"
    t.string "blocked_uri"
    t.string "document_uri"
    t.string "effective_directive"
    t.text "original_policy", limit: 1024
    t.string "referrer"
    t.string "script_sample"
    t.string "source_file"
    t.integer "status_code"
    t.string "violated_directive"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "type"
    t.string "image_file_name"
    t.string "image_content_type"
    t.bigint "image_file_size"
    t.datetime "image_updated_at", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.integer "user_id"
    t.string "locale"
    t.index ["image_file_name"], name: "index_images_on_image_file_name"
    t.index ["locale"], name: "index_images_on_locale"
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "item_pages", force: :cascade do |t|
    t.integer "item_id"
    t.integer "page_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "link_to"
    t.index ["item_id"], name: "index_item_pages_on_item_id"
    t.index ["page_id"], name: "index_item_pages_on_page_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name", null: false
    t.string "speech", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "image_type"
    t.integer "image_id"
    t.integer "user_id"
    t.integer "category_id"
    t.boolean "private", default: true
    t.index ["category_id"], name: "index_items_on_category_id"
    t.index ["image_type", "image_id"], name: "index_items_on_image_type_and_image_id"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "pages", force: :cascade do |t|
    t.string "name", null: false
    t.integer "columns"
    t.integer "rows"
    t.integer "spreadsheet_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["spreadsheet_id"], name: "index_pages_on_spreadsheet_id"
  end

  create_table "spreadsheets", force: :cascade do |t|
    t.string "name", null: false
    t.string "initial_page"
    t.integer "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["user_id"], name: "index_spreadsheets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "activation_digest"
    t.boolean "activated", default: false
    t.datetime "activated_at", precision: nil
    t.string "reset_digest"
    t.datetime "reset_sent_at", precision: nil
    t.text "profile"
    t.string "photo_file_name"
    t.string "photo_content_type"
    t.bigint "photo_file_size"
    t.datetime "photo_updated_at", precision: nil
    t.string "auth_token"
    t.datetime "auth_token_created_at", precision: nil
    t.string "locale", default: "pt"
    t.index ["auth_token", "auth_token_created_at"], name: "index_users_on_auth_token_and_auth_token_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "categories", "base_categories"
  add_foreign_key "images", "users"
  add_foreign_key "item_pages", "items"
  add_foreign_key "item_pages", "pages"
  add_foreign_key "items", "categories"
  add_foreign_key "items", "users"
  add_foreign_key "pages", "spreadsheets"
  add_foreign_key "spreadsheets", "users"
end
