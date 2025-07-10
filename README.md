# Map The Net - Interactive Internet Map

A full-stack PHP + D3.js application for visualizing and exploring internet domain relationships as an interactive force-directed graph. Inspired by Internet Map, but with richer metadata, analytics, and filtering.

---

## Features
- Interactive force-directed graph (D3.js)
- Pan, zoom, and drag nodes
- Click nodes for rich domain metadata
- Node sizing by degree, edge styling by type
- Search and filter UI (extendable)
- PHP backend API (REST)
- Secure configuration via `.env`

---

## Project Structure
```
map-the-net-page/
  public/                # Web root (index.php, assets, API)
    index.php            # Main HTML entry
    assets/
      js/app.js          # D3.js frontend logic
      css/style.css      # Styles
    api/
      db.php             # DB connection (uses .env)
      graph.php          # API: graph data
      domain.php         # API: domain details
  ravenhub_ext_map-the-net.sql  # Database schema & data
  README.md              # This file
  .env                   # Your environment config (NOT in public/)
  .env.example           # Example config (optional)
```

---

## Setup Instructions

### 1. Requirements
- PHP 8+
- Composer
- MySQL/MariaDB
- Web server (Apache, Nginx, etc.)

### 2. Install PHP Dependencies
```
composer require vlucas/phpdotenv
```

### 3. Database Setup
- Import the provided SQL file:
  ```
  mysql -u <user> -p < database < ravenhub_ext_map-the-net.sql
  ```
- Or use phpMyAdmin to import `ravenhub_ext_map-the-net.sql`.

### 4. Configure Environment
- Copy `.env.example` to `.env` in the project root (not public!):
  ```
  cp .env.example .env
  ```
- Edit `.env` with your DB credentials:
  ```
  DB_HOST=localhost
  DB_NAME=ravenhub_ext_map-the-net
  DB_USER=root
  DB_PASS=
  DB_CHARSET=utf8mb4
  ```

### 5. Serve the App
- Set your web server's document root to the `public/` directory.
- Make sure PHP can read the `.env` file (should be outside public/).
- Visit `http://localhost/path-to-your-app/public/` in your browser.

---

## Usage
- The main page shows the interactive network graph.
- Drag nodes, zoom/pan, click nodes for details.
- Use the search/filter UI to find domains (extend as needed).

---

## Security Notes
- **Never put your `.env` file in the `public/` directory.**
- Add `.env` to your `.gitignore` to avoid committing secrets.

---

## Extending
- Add more API endpoints for analytics, filtering, or timeline features.
- Enhance the frontend with clustering, metrics, or export options.
- See the code comments for extension points.

---

## License
MIT (or specify your own) 
