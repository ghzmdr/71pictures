<nav class="main-navigation js-main-navigation">
	<a class="main-navigation__logo" href="/">
		<?php include 'assets/img/logo.svg' ?>
	</a>
	
	<?php $nav_links = get_field('nav_links', 'option'); ?>
	<?php if($nav_links) { ?>
	<ul class="list list--horizontal main-navigation__items">
		<?php foreach ($nav_links as $nav_link) { 
			$slug = $nav_link['slug'];
			$label = $nav_link['label'];
		?>
		<li class="list-item main-navigation__item">
			<a class="main-navigation__link" href="/<?php echo $slug ?>"><?php echo $label ?></a>
		</li>
		<?php } ?>
	</ul>
	<?php } ?>
</nav>