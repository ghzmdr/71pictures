
<a class="button article-excerpt" href="<%= link %>" data-id="<%= id %>">
    <div class="article-excerpt__image">
        <img src="<%= _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0].source_url %>" alt="">
    </div>
    <header class="article-excerpt__header">
        <h3 class="article-excerpt__title"><%= title.rendered %></h2>
        <div class="article-excerpt__subtitle"><%= excerpt.rendered %></div>
    </header>
</a>
