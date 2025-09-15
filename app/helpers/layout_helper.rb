module LayoutHelper
  def show_nav_menu?
    logged_in? && (home? || !headers?)
  end
end
