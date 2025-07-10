// Basic D3.js force-directed graph setup
const width = 1200, height = 800;
const svg = d3.select('#graph')
    .attr('width', width)
    .attr('height', height);

let simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2));

function fetchGraph() {
    fetch('api/graph.php')
        .then(res => res.json())
        .then(drawGraph);
}

function drawGraph(data) {
    svg.selectAll('*').remove();
    const link = svg.append('g')
        .attr('stroke', '#aaa')
        .selectAll('line')
        .data(data.links)
        .join('line')
        .attr('stroke-width', d => Math.sqrt(d.value || 1));

    const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(data.nodes)
        .join('circle')
        .attr('r', d => 10 + Math.log((d.degree || 1) + 1) * 5)
        .attr('fill', d => d.color || '#69b3a2')
        .call(drag(simulation))
        .on('click', showDetails);

    node.append('title').text(d => d.domain_name);

    simulation
        .nodes(data.nodes)
        .on('tick', ticked);
    simulation.force('link')
        .links(data.links);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }
}

function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

function showDetails(event, d) {
    fetch('api/domain.php?id=' + d.id)
        .then(res => res.json())
        .then(domain => {
            document.getElementById('details-content').innerHTML = `
                <h3>${domain.domain_name}</h3>
                <img src="${domain.favicon_url || ''}" alt="favicon" style="height:32px;vertical-align:middle;">
                <p>${domain.title || ''}</p>
                <p>${domain.description || ''}</p>
                <p><b>IP:</b> ${domain.ip_address || ''}</p>
                <p><b>Country:</b> ${domain.country || ''}</p>
                <p><b>Tags:</b> ${domain.tags || ''}</p>
                <p><b>Created:</b> ${domain.created_date || ''}</p>
                <p><b>Expires:</b> ${domain.expiry_date || ''}</p>
                <p><b>SSL Valid:</b> ${domain.ssl_valid ? 'Yes' : 'No'}</p>
                <p><b>Registrar:</b> ${domain.registrar || ''}</p>
            `;
        });
}

fetchGraph(); 