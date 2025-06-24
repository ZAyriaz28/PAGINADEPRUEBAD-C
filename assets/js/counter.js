(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data("from") || 0,
        to: $(this).data("to") || 0,
        speed: $(this).data("speed") || 1000,
        refreshInterval: $(this).data("refresh-interval") || 50,
        decimals: $(this).data("decimals") || 0
      }, options);

      var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

      var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};

      $self.data("countTo", data);
      if (data.interval) clearInterval(data.interval);

      data.interval = setInterval(updateTimer, settings.refreshInterval);
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);
        if (typeof settings.onUpdate === "function") settings.onUpdate.call(self, value);
        if (loopCount >= loops) {
          clearInterval(data.interval);
          value = settings.to;
          render(value);
          if (typeof settings.onComplete === "function") settings.onComplete.call(self, value);
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1000,
    refreshInterval: 50,
    decimals: 0,
    formatter: function (value, settings) {
      return value.toFixed(settings.decimals);
    },
    onUpdate: null,
    onComplete: null
  };
})(jQuery);

jQuery(function ($) {
  // Opcional: agrega formato con coma de miles
  $(".count-number").data("countToOptions", {
    formatter: function (value, options) {
      return value
        .toFixed(options.decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });

  // IntersectionObserver para animar solo cuando el contador aparece en pantalla
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = $(entry.target);
        if (!el.hasClass("counted")) {
          el.addClass("counted"); // evitar repetir animación
          el.countTo(el.data("countToOptions") || {});
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });  // <--- Aquí cambié el umbral

  $(".timer").each(function () {
    observer.observe(this);
  });
});
