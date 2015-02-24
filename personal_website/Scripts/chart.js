

var width = 1680,
    height = 1280;

var maxNodes = 100;

var color = d3.scale.category20();

var sizeScale = d3.scale.linear()
    .domain([0, 1])
    .range([1, 100]);

var strokeWidthScale = d3.scale.linear()
    .domain([0, 1])
    .range([1, 50]);

var alphaScale = d3.scale.linear()
    .domain([0, 1])
    .range([.01, 1]);

var counter = 0;

var force = d3.layout.force()
    .size([width, height])
    .nodes([{}]) // initialize with a single node
    .linkDistance(30)
    .charge(-60)
    .gravity(0)
    .on("tick", tick);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedown);

var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node");

var pos;

restart();

function mousemove() {
    pos = d3.mouse(this);
}

function mousedown() {
    var point = d3.mouse(this),
        node = {x: point[0], y: point[1]},
        n = nodes.push(node);

    restart();
}

setInterval(function () {
    
    var node = {
        x: pos[0],
        y: pos[1],
        r: [sizeScale(Math.random())],
        alpha: [alphaScale(Math.random())],
        strokeWidth: [strokeWidthScale(Math.random())],
        strokeAlpha: [alphaScale(Math.random())]
    };
    nodes[counter % maxNodes] = node;

    counter = counter + 1;
    
    restart();
}, 50);

function tick() {

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function restart() {

    node = node.data(nodes);

    node.enter().insert("circle", ".cursor")
        .attr("class", "node")
        .attr("r", function (d, i) { return d.r; })
        .attr("fill", function (d, i) { return color(i); })
        .attr("stroke", function (d, i) { return color(i); })
        .attr("stroke-width", function (d, i) { return d.strokeWidth })
        .attr("stroke-opacity", function (d, i) { return d.strokeAlpha; })
        .attr("fill-opacity", function (d, i) { return d.alpha; })
        .call(force.drag);

    force.start();
}
