require 'open-uri'
require 'tmpdir'

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
    
    html_file = File.join(__dir__, 'dist', 'index.html')
    
    if File.exist?(html_file)
      puts "[DEBUG] Ładuję index.html: #{html_file}"
      dlg.set_file(html_file)
    else
      puts "[DEBUG] index.html NIE ZNALEZIONY: #{html_file}"
      dlg.set_html("<html><body><h1>Error</h1><p>Nie znaleziono pliku index.html</p></body></html>")
    end

    dlg.add_action_callback("open_dashboard") do |dialog, params|
      puts "[DEBUG] Callback open_dashboard odpalony z param: #{params.inspect}"
      dialog.close
      Cbox.show_dashboard
    end

    dlg.add_action_callback("import_file") do |action_context, file_path|
      begin
        puts "[DEBUG] Callback import_file ODPALONY!"
        puts "[DEBUG] file_path = #{file_path.inspect}"

        if file_path.nil? || file_path.strip.empty?
          UI.messagebox("Ścieżka pusta! WTF?")
          next
        end

        # Sprawdź czy to URL
        if file_path =~ /\Ahttps?:\/\//
          clean_url = file_path.split('?').first
          temp_file = File.join(Dir.tmpdir, File.basename(clean_url))
          puts "[DEBUG] To jest URL, pobieram do: #{temp_file}"

          begin
            URI.open(file_path) do |u|
              File.open(temp_file, 'wb') { |f| f.write(u.read) }
            end
            file_path = temp_file
            puts "[DEBUG] Pobieranie OK"
          rescue => download_error
            puts "[DEBUG] Błąd pobierania: #{download_error.full_message}"
            UI.messagebox("Nie udało się pobrać pliku: #{download_error.message}")
            next
          end
        end

        puts "[DEBUG] Finalny path do importu: #{file_path}"
        if File.exist?(file_path)
          begin
            status = Sketchup.active_model.import(file_path)
            puts "[DEBUG] Wynik importu: #{status.inspect}"
            if status
              # UI.messagebox("Plik zaimportowany: #{file_path}")
            else
              UI.messagebox("Import zwrócił false. Format nieobsługiwany?")
            end
          rescue => import_error
            puts "[DEBUG] Błąd przy imporcie: #{import_error.full_message}"
            UI.messagebox("Błąd podczas importu: #{import_error.message}")
          end
        else
          puts "[DEBUG] Plik nie istnieje: #{file_path}"
          UI.messagebox("Nie znaleziono pliku: #{file_path}")
        end
      rescue => e
        puts "[DEBUG] Totalny rozkurw: #{e.full_message}"
        UI.messagebox("Błąd podczas importu: #{e.message}")
      end
    end

    dlg.show
  end

  toolbar = UI::Toolbar.new("Cbox")
  cmd = UI::Command.new("Cbox Editor") { Cbox.show_login }
  toolbar.add_item(cmd)
  toolbar.show
end
