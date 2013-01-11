(function () {
  function slugify(heading) {
    heading = heading.replace(/[^\-a-zA-Z0-9,&\s]+/g, "");
    heading = heading.replace(/-/g, "_");
    heading = heading.replace(/\s/g, "-");
    return heading.toLowerCase();
  }

  $(document).ready(function() {
    var previous_ident = 0
      , stack          = []
      , slug_prefix    = ''
      , first          = true
      ;

    $("h1, h2, h3, h4, h5").each(function (i, h) {
      if(first) {
        first = false;
        return;
      }

      var heading = $(h)
        , slug    = slugify(heading.text())
        , ident   = +h.tagName.substring(1)
        ;

      if(slug === '') {
        return;
      }

      if(previous_ident > ident) {
        stack.pop();
      }
      else if(previous_ident === ident) {
        stack.pop();
        stack.push([ident, slug]);
      }
      else {
        stack.push([ident, slug]);
      }

      previous_slug = stack.slice(0, stack.length-1).map(function (elem) {
        return elem[1];
      }).join('-');

      if(previous_slug && previous_slug !== '') {
        slug = previous_slug + '-' + slug;
      }

      heading
        .attr('id', slug)
        .prepend("<a href='#" + slug + "' class='anchor'>&para;</a>&nbsp; ");

      previous_ident = ident;
    });
  });
})();
