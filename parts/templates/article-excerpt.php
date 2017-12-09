<% var coverImage = _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0].source_url %>

<div class="article-excerpt js-article-excerpt">
    <div class="article-excerpt__image-wrapper">
        <img src="<%= coverImage %>" alt="" class="article-excerpt__image js-image">
    </div>
    <div class="article-excerpt__panel js-panel"></div>
    <a href="<%= link %>" class="button article-excerpt__content js-link">
        <h2 class="article-excerpt__title"><%= title.rendered %></h2>
        <div class="article-excerpt__copy">
            <%= excerpt.rendered %>
        </div>
    </a>

    <a href="<%= link %>" class="button button-explore article-excerpt__button-explore js-button">

        <span class="button-explore__label js-label">
            Explore
        </span>

        <svg class="button-explore__arrow js-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.098 11.003h14.976l-4.66-4.66 1.414-1.414 7.07 7.07-7.07 7.07-1.414-1.413 4.66-4.66H3.098v-1.994z"/></svg>
    </a>
</div>
