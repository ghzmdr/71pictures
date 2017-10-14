<div class="project-article js-project-article">
	<?php $intro_video = get_field('intro_video'); ?>
	<?php $intro_text = get_field('intro_text'); ?>
	
	<?php if ($intro_video) { ?>
	<section class="project-article__section-video">
		<div class="project-article__video js-video">			
			<iframe width="1280" height="720" frameborder="0" 
					webkitallowfullscreen mozallowfullscreen allowfullscreen
					src=
						<?php if ($intro_video['type'] == 'vimeo') { ?>
							"https://player.vimeo.com/video/<?php echo $intro_video['id']; ?>""
						<?php } else {?>
							"https://www.youtube.com/embed/<?php echo $intro_video['id']; ?>"
						<?php } ?>
					>
			</iframe>
		</div>
	</section>
	<?php } ?>

	<section class="project-article__intro js-intro">
		<?php echo $intro_text; ?>
	</section>
</div>