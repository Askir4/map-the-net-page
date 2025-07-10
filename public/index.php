<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map The Net - Interactive Internet Map</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <header>
        <h1>Map The Net</h1>
        <input type="text" id="search" placeholder="Search domain...">
        <button id="filterBtn">Filter</button>
        <div id="filters"></div>
    </header>
    <main>
        <div id="graph-container">
            <svg id="graph" width="1200" height="800"></svg>
        </div>
        <aside id="domain-details">
            <h2>Domain Details</h2>
            <div id="details-content">Select a node to see details.</div>
        </aside>
    </main>
    <script src="assets/js/app.js"></script>
</body>
</html> 