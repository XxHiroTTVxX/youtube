// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Menu, MenuItem, Submenu};



fn main() {
  tauri::Builder::default()
    .menu(create_app_menu())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn create_app_menu() -> Menu {
  return Menu::new()
    .add_submenu(Submenu::new(
      "App",
      Menu::new()
        .add_native_item(MenuItem::Quit),
    ))
}
  
