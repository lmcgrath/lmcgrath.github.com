var github = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><br/>'+escapeHtml(repos[i].description||'')+'</li>';
    }
    t.innerHTML = fragment;
  }

  function renderLimit(target) {
    // var t = $(target)[0];
    // t.innerHTML = "<li>Repository list unavailable</li>"
  }
  return {
    showRepos: function(options){
      $.ajax({
          url: "https://api.github.com/users/"+options.user+"/repos?sort=pushed&callback=?"
        , dataType: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          if (data && data.meta && data.meta.status == 403) {
            renderLimit(options.target);
          } else {
            var repos = [];
            if (!data || !data.data) { return; }
            for (var i = 0; i < data.data.length; i++) {
              if (options.skip_forks && data.data[i].fork) { continue; }
              repos.push(data.data[i]);
            }
            if (options.count) { repos.splice(options.count); }
            render(options.target, repos);
          }
        }
      });
    }
  };
})();
