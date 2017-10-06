# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171005175756) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
  end

  create_table "articles", force: :cascade do |t|
    t.string   "web_url"
    t.string   "snippet"
    t.jsonb    "blog"
    t.string   "source"
    t.string   "multimedia",                    array: true
    t.jsonb    "headline"
    t.string   "keywords",                      array: true
    t.string   "pub_date"
    t.string   "document_type"
    t.string   "new_desk"
    t.string   "section_name"
    t.jsonb    "byline"
    t.string   "type_of_material"
    t.string   "_id"
    t.integer  "word_count"
    t.string   "score"
    t.string   "uri"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "print_page"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
    t.index ["updated_at"], name: "index_sessions_on_updated_at", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
  end

end
