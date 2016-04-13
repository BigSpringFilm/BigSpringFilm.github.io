(function() {
  $(document).ready(function() {
    var $videoContainer, $videoLink, slideshow, video_default_height, video_default_width, video_ratio;
    slideshow = $('.photo-slideshow');
    slideshow.each(function() {
      var $photos, $thumbnails, bannerIncrement, changeSlide, current_slide, finishChangeslide, is_transitioning, max_slide, slideshow_auto_delay, start_autoplay, stop_autoplay;
      $photos = $(this).find('.photo');
      $thumbnails = $(this).find('.photo-navigation li');
      is_transitioning = false;
      current_slide = 1;
      slideshow_auto_delay = 3500;
      max_slide = $photos.length;
      start_autoplay = function() {
        return $.doTimeout('autoplay', slideshow_auto_delay, function() {
          var next_slide;
          next_slide = bannerIncrement(1);
          changeSlide(next_slide, true);
          return true;
        });
      };
      stop_autoplay = function() {
        $.doTimeout('autoplay');
        return $.doTimeout(1000, start_autoplay);
      };
      bannerIncrement = function(direction) {
        if (current_slide === 1 && direction === -1) {
          return max_slide;
        } else if (current_slide === max_slide && direction === 1) {
          return 1;
        } else {
          return current_slide + direction;
        }
      };
      changeSlide = function(slide, automatic) {
        var $new_photo, $previously_active;
        $new_photo = $("*[data-photo='" + slide + "']");
        $previously_active = $photos.filter('.active');
        if ($previously_active === $new_photo) {
          return false;
        }
        if (is_transitioning) {
          return false;
        }
        if (automatic !== true) {
          stop_autoplay();
        }
        is_transitioning = true;
        current_slide = Number(slide);
        $previously_active.removeClass('active');
        $new_photo.addClass('active');
        $thumbnails.filter('.active').removeClass('active');
        $thumbnails.filter("[data-thumbnail=" + slide + "]").addClass('active');
        return setTimeout(finishChangeslide, 1000);
      };
      finishChangeslide = function() {
        return is_transitioning = false;
      };
      $thumbnails.on('click', function() {
        var data_index;
        data_index = $(this).attr('data-thumbnail');
        return changeSlide(data_index, false);
      });
      if ($(this).attr('data-autoplay') === "true") {
        return start_autoplay();
      }
    });
    video_default_width = 700;
    video_default_height = 392;
    video_ratio = video_default_width / video_default_height;
    $videoContainer = $('#video-container');
    $videoLink = $('.video-link');
    return $videoLink.on("click", function() {
      var embedCode;
      embedCode = $($(this).data('embed'));
      embedCode.attr('height', video_default_height);
      embedCode.attr('width', video_default_width);
      return $.featherlight(embedCode, {
        closeOnClick: 'background'
      });
    });
  });

}).call(this);
