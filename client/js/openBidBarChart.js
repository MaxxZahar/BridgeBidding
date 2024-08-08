const margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

const svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv(`/openBidLearn/data/openBidFrequency.csv`).then(function (data) {
    data = data.sort((a, b) => b.Value - a.Value);
    console.log(data);
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.Bid))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    const y = d3.scaleLinear()
        .domain([0, data[0].Value])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Bid))
        .attr("width", x.bandwidth())
        .attr("fill", "olivedrab")
        .attr("height", d => height - y(0))
        .attr("y", d => y(0))

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.Value))
        .attr("height", d => height - y(d.Value))
        .delay((d, i) => { console.log(i); return i * 100 });
});