module HeadersHelper
  def home
    if current_user
      user_spreadsheets_path current_user
    else
      home_path
    end
  end

  def home?
    current_page? home
  end

  def about?
    current_page? about_path
  end

  def contact?
    current_page? contact_path
  end

  def privacy?
    current_page? privacy_path
  end

  def headers?
    home? || about? || contact? || privacy?
  end
end
