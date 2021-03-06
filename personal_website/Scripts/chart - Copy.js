﻿

var width = 1680,
    height = 1280;

var fill = d3.scale.category20();

var force = d3.layout.force()
    .size([width, height])
    .nodes([{}]) // initialize with a single node
    .linkDistance(30)
    .charge(-60)
    .gravity(-.1)
    .on("tick", tick);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemove)
    .on("mousedown", mousedown);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

var cursor = svg.append("circle")
    .attr("r", 30)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

var pos;

restart();

function mousemove() {
    cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
    pos = d3.mouse(this);
}

function mousedown() {
    var point = d3.mouse(this),
        node = {x: point[0], y: point[1]},
        n = nodes.push(node);

    // add links to any nearby nodes
    //nodes.forEach(function(target) {
    //    var x = target.x - node.x,
    //        y = target.y - node.y;
    //    if (Math.sqrt(x * x + y * y) < 30) {
    //        links.push({source: node, target: target});
    //    }
    //});

    restart();
}

setInterval(function () {

    console.log(pos);

    var node = {x: pos[0], y: pos[1]},
            n = nodes.push(node);

    
    restart();
}, 2000);

function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function restart() {
    link = link.data(links);

    link.enter().insert("line", ".node")
        .attr("class", "link");

    node = node.data(nodes);

    node.enter().insert("circle", ".cursor")
        .attr("class", "node")
        .attr("r", 5)
        .call(force.drag);

    force.start();
}
