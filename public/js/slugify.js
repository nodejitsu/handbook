(function () {
  function slugify(heading) {
    heading = heading.replace(/[^-a-zA-Z0-9,&\s]+/g, "");
    heading = heading.replace(/-/g, "_");
    heading = heading.replace(/\s/g, "-");
    return heading.toLowerCase();
  }

  $('h1, h2, h3, h4').forEach(function (h) {
    heading = $(h);
    anchor = slugify(heading.text());
    heading
      .attr('id', anchor)
      .prepend("<a href='##{archor}' class='anchor'>&para;</a>");
  });
})();