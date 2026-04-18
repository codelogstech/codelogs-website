// Logo dot positions (normalized -1..1), radius normalized to half-dim
window.CODELOGS_DOTS = [
  {x:0.132,y:-0.945,r:0.057},{x:-0.209,y:-0.819,r:0.12},{x:0.472,y:-0.819,r:0.12},
  {x:0.135,y:-0.665,r:0.098},{x:-0.53,y:-0.668,r:0.056},{x:0.8,y:-0.668,r:0.056},
  {x:0.604,y:-0.473,r:0.101},{x:-0.331,y:-0.469,r:0.098},{x:-0.687,y:-0.347,r:0.12},
  {x:-0.527,y:-0.003,r:0.098},{x:-0.807,y:-0.007,r:0.056},{x:-0.688,y:0.334,r:0.12},
  {x:-0.331,y:0.463,r:0.097},{x:0.607,y:0.469,r:0.097},{x:0.135,y:0.658,r:0.097},
  {x:-0.53,y:0.661,r:0.057},{x:0.8,y:0.668,r:0.056},{x:-0.209,y:0.813,r:0.12},
  {x:0.472,y:0.819,r:0.12},{x:0.132,y:0.938,r:0.056}
];

// Render static dots into a <g> via SVG for small marks (nav, footer)
window.renderLogoSvg = function(group, opts = {}) {
  const { fill = 'currentColor', scale = 0.9 } = opts;
  group.innerHTML = '';
  window.CODELOGS_DOTS.forEach(d => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', d.x * scale);
    c.setAttribute('cy', d.y * scale);
    c.setAttribute('r', d.r * scale);
    c.setAttribute('fill', fill);
    group.appendChild(c);
  });
};
