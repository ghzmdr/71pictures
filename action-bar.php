<nav class="action-bar js-action-bar">
	<?php $trailer_link = get_field('trailer_link', 'option'); ?>
	<?php if ($trailer_link) { ?>
	<a href="<?php echo $trailer_link ?>" target="_blank" class="button button-trailer button-trailer--small action-bar__button-trailer js-button-trailer">
		<?php include 'assets/img/icons/play.svg' ?>				
	</a>
	<?php } ?>

	<?php $socials = get_field('socials', 'option'); ?>
	<?php if($socials) { ?>
		<ul class="action-bar__socials list list--horizontal">
			<?php foreach ($socials as $social) { 
				$link = $social['link'];
				$platform = $social['platform'];
			?>
			<li class="list-item">
				<a href="<?php echo $link; ?>" target="_blank" class="social-link js-social-link">
					<span class="social-link__icon">
						<?php include 'assets/img/icons/socials/'.$platform.'.svg' ?>
					</span>
				</a>
			</li>
			<?php } ?>
		</ul>
	<?php } ?>
</nav>