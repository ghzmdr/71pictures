<?php $trailer_link = get_field('trailer_link', 'option'); ?>
<?php if ($trailer_link) { ?>
<a class="button-trailer main-button-trailer" href="<?php echo $trailer_link ?>" target="_blank">
	Watch the trailer
</a>
<?php } ?>