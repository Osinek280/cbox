require 'sketchup.rb'

module Cbox
  def self.show_login
    dlg = UI::HtmlDialog.new(
      {
        :dialog_title => "Cbox Login",
        :preferences_key => "com.example.cbox.login",
        :scrollable => true,
        :resizable => true,
        :width => 600,
        :height => 400,
        :style => UI::HtmlDialog::STYLE_DIALOG
      }
    )
    
    html_file = File.join(__dir__, 'src', 'index.html')
    
    if File.exist?(html_file)
      dlg.set_file(html_file)
    else
      dlg.set_html("<html><body><h1>Error</h1><p>Nie znaleziono pliku index.html</p></body></html>")
    end

    # Callback z JS po udanym loginie
    dlg.add_action_callback("open_dashboard") do |dialog, params|
      dialog.close
      Cbox.show_dashboard
    end

    dlg.show
  end

  def self.show_dashboard
    dlg = UI::HtmlDialog.new(
      {
        :dialog_title => "Cbox Dashboard",
        :preferences_key => "com.example.cbox.dashboard",
        :scrollable => true,
        :resizable => true,
        :width => 800,
        :height => 600,
        :style => UI::HtmlDialog::STYLE_DIALOG
      }
    )
    
    html_file = File.join(__dir__, 'src', 'dashboard.html')
    
    if File.exist?(html_file)
      dlg.set_file(html_file)
    else
      dlg.set_html("<html><body><h1>Error</h1><p>Nie znaleziono pliku dashboard.html</p></body></html>")
    end

    dlg.show
  end

  # Dodajemy toolbar i komendę do wywołania loginu
  toolbar = UI::Toolbar.new("Cbox")

  cmd = UI::Command.new("Cbox Editor") do
    Cbox.show_login
  end

  toolbar.add_item(cmd)
  toolbar.show
end
