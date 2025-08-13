# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

BASE_CATEGORIES = [
  { name: 'GREETINGS_SOCIAL_EXPRESSIONS', color: '#CC6699' },
  { name: 'SUBJECT', color: '#E6E600' },
  { name: 'VERB', color: '#009900' },
  { name: 'NOUN', color: '#FFA500' },
  { name: 'ADJECTIVE', color: '#0000FF' },
  { name: 'OTHER', color: '#FFFFFF' }
]

CATEGORIES = [
  {
    base_ctgy_name: 'GREETINGS_SOCIAL_EXPRESSIONS',
    description: 'Cumprimentos e expressões sociais',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'SUBJECT',
    description: 'Sujeitos',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'VERB',
    description: 'Verbos',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'NOUN',
    description: 'Substântivos',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'ADJECTIVE',
    description: 'Adjetivos',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'OTHER',
    description: 'Outros',
    locale: 'pt'
  },
  {
    base_ctgy_name: 'GREETINGS_SOCIAL_EXPRESSIONS',
    description: 'Greetings and social expressions',
    locale: 'en'
  },
  {
    base_ctgy_name: 'SUBJECT',
    description: 'Subjects',
    locale: 'en'
  },
  {
    base_ctgy_name: 'VERB',
    description: 'Verbs',
    locale: 'en'
  },
  {
    base_ctgy_name: 'NOUN',
    description: 'Nouns',
    locale: 'en'
  },
  {
    base_ctgy_name: 'ADJECTIVE',
    description: 'Adjectives',
    locale: 'en'
  },
  {
    base_ctgy_name: 'OTHER',
    description: 'Others',
    locale: 'en'
  }
]

BASE_CATEGORIES.each do |base_ctgy|
  BaseCategory.find_or_create_by!(base_ctgy)
end

CATEGORIES.each do |ctgy|
  base_ctgy = BaseCategory.find_by!(name: ctgy[:base_ctgy_name])
  attrs = ctgy.except(:base_ctgy_name)
  Category.create_with(base_category: base_ctgy).find_or_create_by!(attrs)
end
