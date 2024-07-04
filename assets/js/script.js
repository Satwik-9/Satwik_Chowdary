(function($) {
  $.fn.timeline = function() {
    var selectors = {
      id: $(this),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      segmentClass: "timeline-segment",
      activeSegmentClass: "timeline-segment--active"
    };

    // Create timeline segments
    selectors.item.each(function(index) {
      var segment = $('<div>').addClass(selectors.segmentClass);
      selectors.id.append(segment);
    });

    var segments = selectors.id.find("." + selectors.segmentClass);

    // Function to update segment positions
    function updateSegments() {
      selectors.item.each(function(index) {
        var item = $(this);
        var segment = segments.eq(index);
        var itemHeight = item.outerHeight();
        var itemTop = item.position().top;
        var titleHeight = item.find('.timeline__content-title').outerHeight();
        
        segment.css({
          top: itemTop + (titleHeight / 2)+300, // Center the segment with the title
          height: 30 // Fixed height for inactive segments
        });
      });
    }

    // Initially activate the first item and update segments
    selectors.item.eq(0).addClass(selectors.activeClass);
    segments.eq(0).addClass(selectors.activeSegmentClass);
    updateSegments();

    // Function to check if element is in center of the viewport
    function isInViewportCenter(element) {
      var elementTop = element.offset().top;
      var elementHeight = element.outerHeight();
      var elementBottom = elementTop + elementHeight;
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      var viewportCenter = (viewportTop + viewportBottom) / 2;
      return elementTop < viewportCenter && elementBottom > viewportCenter;
    }

    // Scroll event to bulge text and activate segments when they are in the center of the viewport
    $(window).on('scroll', function() {
      selectors.item.each(function(index) {
        var that = $(this);
        var segment = segments.eq(index);
        if (isInViewportCenter(that)) {
          // Activate the current item and segment
          selectors.item.removeClass(selectors.activeClass);
          segments.removeClass(selectors.activeSegmentClass);
          that.addClass(selectors.activeClass);
          segment.addClass(selectors.activeSegmentClass);
          segment.css('height', '40px'); // Make active segment slightly longer
        } else {
          segment.css('height', '30px'); // Reset inactive segments to original size
        }
      });
    });

    // Update segments on window resize
    $(window).on('resize', updateSegments);
  };
})(jQuery);

$("#timeline-1").timeline();