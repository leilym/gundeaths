// Main function
async function manageVisualization() {
  const width = 1300;
  const height = 600;
  const margins = {left: 140, top: 0, right: 0, bottom: 100}

  // Read in 2017 "deaths to guns" data
  const data = await d3.csv("data/2017_gun_deaths.csv");

  // Create the svg
  const svg = d3
    .select("#vis")
    .append("svg")
    .attr("viewbox", [0, 0, width, height])
    .style("height", `${height}px`)
    .style("width", `${width}px`);

  // RELATIONSHIP LABELS 
  let xLabelFamily = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left + (width - margins.left - margins.right) / 5}, ${height - (margins.bottom / 2)})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Within Family")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let xLabelOutsideFamily = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left + 2 * (width - margins.left - margins.right) / 5}, ${height - (margins.bottom / 2)})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Outside Family \nBut Known to Victim")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let xLabelNotKnown = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left + 3 * (width - margins.left - margins.right) / 5}, ${height - (margins.bottom / 2)})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Offender Not Known \nto Victim")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let xLabelNA = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left + 4 * (width - margins.left - margins.right) / 5}, ${height - (margins.bottom / 2)})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Relationship Unknown")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  // WEAPON LABELS 
  let yLabelFirearm = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left / 2}, ${margins.top + (height - margins.top - margins.bottom) / 5})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Firearm")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let yLabelRifle = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left / 2}, ${margins.top + (2 * (height - margins.top - margins.bottom)) / 5})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Rifle")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let yLabelHandgun = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left / 2}, ${margins.top + (3 * (height - margins.top - margins.bottom)) / 5})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Handgun")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let yLabelShotgun = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left / 2}, ${margins.top + (4 * (height - margins.top - margins.bottom)) / 5})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Shotgun")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

  let yLabelNA = svg
    .append("g")
    .append("text")
    .attr("transform", `translate(${margins.left / 2}, ${margins.top + (5 * (height - margins.top - margins.bottom)) / 5})`)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "20px")
    .text("Unknown Gun")
    .style("fill", "white")
    .attr("opacity", 0)
    .style("white-space", "pre-line");

    //circle sizes based on age
    const size = d3
        .scaleSqrt()
        .domain([d3.extent(data, (d) => +d.victim_age)[0], d3.extent(data, (d) => +d.victim_age)[1]])
        .range([7, 1.4]);
  
    // //adding tooltip for circles
    const tooltip = d3.select("#vis")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border-radius", "5px")
      .style("padding", "8px")
      .style("color", "black")


    const showTooltip = function(event, d) {
      tooltip 
        .transition()
        .duration(200)
      tooltip 
        .style("opacity", 1)
        .style("padding-left", "80px")
        .style("margin", "auto")
        .style("width", "200%")
        .html("State: " + d.state + "<br>" + 
              "Age: " + d.victim_age + "<br>" + 
              "Sex: " + d.victim_sex + "<br>" + 
              "Race: " + d.victim_race_plus_hispanic + "<br>" +
              "Relationship to offender: " + d.offenders_relationship_to_victim)
        
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2+20 + "px")
    }

    const hideTooltip = function(event, d)
    {
      tooltip 
        .transition()
        .duration(200)
        .style("opacity", 0)
    }


  // Create circles
  const nodes = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("fill", "#7C3030")
      .attr("r", d => size(+d.victim_age))
      .style("stroke", "grey")
      .style("stroke-width", "1.3px")
      .on("mouseover", showTooltip)
      .on("mouseleave", hideTooltip)
        

  // Counter for the number of ticked boxes
  // Counter for the number of ticked boxes
  let checkedBoxes = 0;
  let currentStates = [];
  
  function positionX(d) {
    let xCluster;
    
    if (currentStates.includes("relationships")) { // just relationships
      switch (d.offenders_relationship_to_victim_grouping) {
        case "Within Family":
          xCluster = margins.left + (width - margins.left - margins.right) / 5;
          break;
        case "Outside Family But Known to Victim":
          xCluster = margins.left + (2 * (width - margins.left - margins.right)) / 5;
          break;
        case "Offender Not Known to Victim":
          xCluster = margins.left + (3 * (width - margins.left - margins.right)) / 5;
          break;
        case "Unknown Relationship":
          xCluster = margins.left + (4 * (width - margins.left - margins.right)) / 5;
          break;
      }
    } else { // empty array 
      xCluster = margins.left + (width - margins.left - margins.right) / 2;
    }

    return xCluster;
  }

  function positionY(d) {
    let yCluster;

    if(currentStates.includes("weapon")) { // just weapon
      switch (d.weapon_used) {
        case "firearm":
          yCluster = margins.top + (height - margins.top - margins.bottom) / 5;
          break;
        case "rifle":
          yCluster = margins.top + (2 * (height - margins.top - margins.bottom)) / 5;
          break;
        case "handgun":
          yCluster = margins.top + (3 * (height - margins.top - margins.bottom)) / 5;
          break;
        case "shotgun":
          yCluster = margins.top + (4 * (height - margins.top - margins.bottom)) / 5;
          break;
        case "unknown gun":
          yCluster = margins.top + (5 * (height - margins.top - margins.bottom)) / 5;
          break;
        }
    } else {
      yCluster = 2 * (height - margins.top - margins.bottom) / 3;
    }

    return yCluster;
  }

  function xStrengthRel() {
    if (currentStates.includes("weapon") && currentStates.length == 1) { // just weapon
      return 0.02;
    } else if (currentStates.length == 0) { // no elements
      return 1;
    } else if(currentStates.length == 2) { // both relationships & weapon
      return 1;
    } else { // just relationships
      return 1;
    }
  }

  function yStrengthRel() {
    if (currentStates.includes("weapon") && currentStates.length == 1) { // just weapon
      return 1;
    } else if (currentStates.length == 0) { // no elements
      return 1;
    } else if(currentStates.length == 2) { // both relationships & weapon
      return 1;
    } else { // just relationships
      return 0.05;
    }
  }

  function xStrengthW() {
    if (currentStates.includes("relationships") && currentStates.length == 1) { // just relationships
      return 1;
    } else if (currentStates.length == 0) { // no elements
      return 1;
    } else if(currentStates.length == 2) { // both relationships & weapon
      return 1;
    } else { // just weapon
      return 0.02;
    }
  }

  function yStrengthW() {
    if (currentStates.includes("relationships") && currentStates.length == 1) { // just relationships
      return 0.02;
    } else if (currentStates.length == 0) { // no elements
      return 1;
    } else if(currentStates.length == 2) { // both relationships & weapon
      return 1;
    } else { // just weapon
      return 1;
    }
  }


  // Make simulation
  const simulation = d3
    .forceSimulation(data)
    // .alpha(0.1)
    // .force("center", d3.forceCenter(width / 2, height / 2)) // forceCenter is proving troublesome...
    .force("collide", d3.forceCollide().radius(6)) // using the bubble's radius
    .force("manyBody", d3.forceManyBody().strength(0.3))
    .force("x force", d3.forceX(d => positionX(d)).strength(0))
    .force("y force", d3.forceY(d => positionY(d)).strength(0));

  simulation.on("tick", () => {
    nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });


  /* EVENT HANDLERS */

  // Relationship checkBox
  d3.select("#menu")
    .select("#relationship")
    .on("change", (evt, d) => {

      if (d3.select(evt.target).classed("checked")) {
        d3.select(evt.target).classed("checked", false);
        currentStates.splice(currentStates.indexOf("relationships"), 1);
        checkedBoxes--;
        
        // remove labels
        xLabelFamily.attr("opacity", 0);
        xLabelOutsideFamily.attr("opacity", 0);
        xLabelNotKnown.attr("opacity", 0);
        xLabelNA.attr("opacity", 0);
      
      } else {
        d3.select(evt.target).classed("checked", true);
        currentStates.push("relationships");
        checkedBoxes++;
        
        // show labels
        xLabelFamily.attr("opacity", 1);
        xLabelOutsideFamily.attr("opacity", 1);
        xLabelNotKnown.attr("opacity", 1);
        xLabelNA.attr("opacity", 1);
      }

      // move the bubbles
      simulation.force("x force").x((d) => positionX(d)).strength(xStrengthRel());
      simulation.force("y force").y((d) => positionY(d)).strength(yStrengthRel());
      simulation.alpha(0.3).restart(); // restart the simulation
    });

  // Sex checkBox
  d3.select("#menu")
    .select("#sex")
    .on("change", (evt, d) => {

      if (d3.select(evt.target).classed("checked")) {
        d3.select(evt.target).classed("checked", false);
        // currentStates.splice(currentStates.indexOf("sex"), 1);
        // checkedBoxes--;
        nodes.attr("fill", "#7C3030");
      } else {
        d3.select(evt.target).classed("checked", true);
        // currentStates.push("sex");
        // checkedBoxes++;
        nodes.attr("fill", d => d.victim_sex === "Male" ? "steelblue" : (d.victim_sex === "Female" ? "pink" : "gray" ))
      }
    });

  // Weapon checkBox
  d3.select("#menu")
    .select("#weapon")
    .on("change", (evt, d) => {

      if (d3.select(evt.target).classed("checked")) {
        d3.select(evt.target).classed("checked", false);
        currentStates.splice(currentStates.indexOf("weapon"), 1);
        checkedBoxes--;

        // remove labels
        yLabelFirearm.attr("opacity", 0);
        yLabelHandgun.attr("opacity", 0);
        yLabelNA.attr("opacity", 0);
        yLabelRifle.attr("opacity", 0);
        yLabelShotgun.attr("opacity", 0);

      } else {
        d3.select(evt.target).classed("checked", true);
        currentStates.push("weapon");
        checkedBoxes++;

        // show labels
        yLabelFirearm.attr("opacity", 1);
        yLabelHandgun.attr("opacity", 1);
        yLabelNA.attr("opacity", 1);
        yLabelRifle.attr("opacity", 1);
        yLabelShotgun.attr("opacity", 1);
      }

      // move the bubbles
      simulation.force("x force").x((d) => positionX(d)).strength(xStrengthW());
      simulation.force("y force").y((d) => positionY(d)).strength(yStrengthW());
      simulation.alpha(0.6).restart(); // restart the simulation
    });
}


// Forceably unckeck checkboxes (sometimes on page reload, they don't uncheck)
var inputs = document.getElementsByTagName('input');

for (var i=0; i<inputs.length; i++)  {
  if (inputs[i].type == 'checkbox')   {
    inputs[i].checked = false;
  }
}

manageVisualization()