//     SocialSharer.js 0.0.2
//     (c) 2017 Superhero Cheesecake, Rian Verhagen, Peter Coolen

export function sharePopup(platform, url) {
    debugger
    switch(platform) {
        case 'facebook':
            url = "https://www.facebook.com/sharer/sharer.php?u=" + url;
            break;

        case 'twitter':
            url = "https://twitter.com/intent/tweet?text=" + url;
            break;
    }

    const popup = window.open(url, 'Share', 'width=' + 460 + ', height=' + 380 + ', top=' + 200 + ', left=' + 200);

    if (popup.focus) {
        popup.focus();
    }

}
