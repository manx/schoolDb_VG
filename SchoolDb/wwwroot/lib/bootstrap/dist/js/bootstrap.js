/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = app
    $(app).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return app
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(app)) return e.handleObj.handler.apply(app, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, app.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $app    = $(app)
    var selector = $app.attr('data-target')

    if (!selector) {
      selector = $app.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $app.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return app.each(function () {
      var $app = $(app)
      var data  = $app.data('bs.alert')

      if (!data) $app.data('bs.alert', (data = new Alert(app)))
      if (typeof option == 'string') data[option].call($app)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return app
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    app.$element  = $(element)
    app.options   = $.extend({}, Button.DEFAULTS, options)
    app.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = app.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? app.options[state] : data[state])

      if (state == 'loadingText') {
        app.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (app.isLoading) {
        app.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, app), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = app.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = app.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        app.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== app.$element.hasClass('active')) changed = false
        app.$element.toggleClass('active')
      }
      $input.prop('checked', app.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      app.$element.attr('aria-pressed', !app.$element.hasClass('active'))
      app.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $app.data('bs.button', (data = new Button(app, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return app
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    app.$element    = $(element)
    app.$indicators = app.$element.find('.carousel-indicators')
    app.options     = options
    app.paused      = null
    app.sliding     = null
    app.interval    = null
    app.$active     = null
    app.$items      = null

    app.options.keyboard && app.$element.on('keydown.bs.carousel', $.proxy(app.keydown, app))

    app.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && app.$element
      .on('mouseenter.bs.carousel', $.proxy(app.pause, app))
      .on('mouseleave.bs.carousel', $.proxy(app.cycle, app))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: app.prev(); break
      case 39: app.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (app.paused = false)

    app.interval && clearInterval(app.interval)

    app.options.interval
      && !app.paused
      && (app.interval = setInterval($.proxy(app.next, app), app.options.interval))

    return app
  }

  Carousel.prototype.getItemIndex = function (item) {
    app.$items = item.parent().children('.item')
    return app.$items.index(item || app.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = app.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (app.$items.length - 1))
    if (willWrap && !app.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % app.$items.length
    return app.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = app
    var activeIndex = app.getItemIndex(app.$active = app.$element.find('.item.active'))

    if (pos > (app.$items.length - 1) || pos < 0) return

    if (app.sliding)       return app.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return app.pause().cycle()

    return app.slide(pos > activeIndex ? 'next' : 'prev', app.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (app.paused = true)

    if (app.$element.find('.next, .prev').length && $.support.transition) {
      app.$element.trigger($.support.transition.end)
      app.cycle(true)
    }

    app.interval = clearInterval(app.interval)

    return app
  }

  Carousel.prototype.next = function () {
    if (app.sliding) return
    return app.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (app.sliding) return
    return app.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = app.$element.find('.item.active')
    var $next     = next || app.getItemForDirection(type, $active)
    var isCycling = app.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = app

    if ($next.hasClass('active')) return (app.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    app.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    app.sliding = true

    isCycling && app.pause()

    if (app.$indicators.length) {
      app.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(app.$indicators.children()[app.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && app.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      app.sliding = false
      app.$element.trigger(slidEvent)
    }

    isCycling && app.cycle()

    return app
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $app.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $app.data('bs.carousel', (data = new Carousel(app, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return app
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $app   = $(app)
    var $target = $($app.attr('data-target') || (href = $app.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $app.data())
    var slideIndex = $app.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(app)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    app.$element      = $(element)
    app.options       = $.extend({}, Collapse.DEFAULTS, options)
    app.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    app.transitioning = null

    if (app.options.parent) {
      app.$parent = app.getParent()
    } else {
      app.addAriaAndCollapsedClass(app.$element, app.$trigger)
    }

    if (app.options.toggle) app.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = app.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (app.transitioning || app.$element.hasClass('in')) return

    var activesData
    var actives = app.$parent && app.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    app.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = app.dimension()

    app.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    app.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    app.transitioning = 1

    var complete = function () {
      app.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      app.transitioning = 0
      app.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(app)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    app.$element
      .one('bsTransitionEnd', $.proxy(complete, app))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](app.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (app.transitioning || !app.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    app.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = app.dimension()

    app.$element[dimension](app.$element[dimension]())[0].offsetHeight

    app.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    app.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    app.transitioning = 1

    var complete = function () {
      app.transitioning = 0
      app.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(app)

    app.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, app))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    app[app.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(app.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + app.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        app.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, app))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $app.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $app.data('bs.collapse', (data = new Collapse(app, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return app
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $app   = $(app)

    if (!$app.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($app)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $app.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', app.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($app) {
    var selector = $app.attr('data-target')

    if (!selector) {
      selector = $app.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $app.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $app         = $(app)
      var $parent       = getParent($app)
      var relatedTarget = { relatedTarget: app }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $app.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $app = $(app)

    if ($app.is('.disabled, :disabled')) return

    var $parent  = getParent($app)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(app))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: app }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $app
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $app = $(app)

    e.preventDefault()
    e.stopPropagation()

    if ($app.is('.disabled, :disabled')) return

    var $parent  = getParent($app)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $app.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return app.each(function () {
      var $app = $(app)
      var data  = $app.data('bs.dropdown')

      if (!data) $app.data('bs.dropdown', (data = new Dropdown(app)))
      if (typeof option == 'string') data[option].call($app)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return app
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    app.options             = options
    app.$body               = $(document.body)
    app.$element            = $(element)
    app.$dialog             = app.$element.find('.modal-dialog')
    app.$backdrop           = null
    app.isShown             = null
    app.originalBodyPad     = null
    app.scrollbarWidth      = 0
    app.ignoreBackdropClick = false

    if (app.options.remote) {
      app.$element
        .find('.modal-content')
        .load(app.options.remote, $.proxy(function () {
          app.$element.trigger('loaded.bs.modal')
        }, app))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return app.isShown ? app.hide() : app.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = app
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    app.$element.trigger(e)

    if (app.isShown || e.isDefaultPrevented()) return

    app.isShown = true

    app.checkScrollbar()
    app.setScrollbar()
    app.$body.addClass('modal-open')

    app.escape()
    app.resize()

    app.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(app.hide, app))

    app.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    app.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    app.$element.trigger(e)

    if (!app.isShown || e.isDefaultPrevented()) return

    app.isShown = false

    app.escape()
    app.resize()

    $(document).off('focusin.bs.modal')

    app.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    app.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && app.$element.hasClass('fade') ?
      app.$element
        .one('bsTransitionEnd', $.proxy(app.hideModal, app))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      app.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            app.$element[0] !== e.target &&
            !app.$element.has(e.target).length) {
          app.$element.trigger('focus')
        }
      }, app))
  }

  Modal.prototype.escape = function () {
    if (app.isShown && app.options.keyboard) {
      app.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && app.hide()
      }, app))
    } else if (!app.isShown) {
      app.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (app.isShown) {
      $(window).on('resize.bs.modal', $.proxy(app.handleUpdate, app))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = app
    app.$element.hide()
    app.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    app.$backdrop && app.$backdrop.remove()
    app.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = app
    var animate = app.$element.hasClass('fade') ? 'fade' : ''

    if (app.isShown && app.options.backdrop) {
      var doAnimate = $.support.transition && animate

      app.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(app.$body)

      app.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (app.ignoreBackdropClick) {
          app.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        app.options.backdrop == 'static'
          ? app.$element[0].focus()
          : app.hide()
      }, app))

      if (doAnimate) app.$backdrop[0].offsetWidth // force reflow

      app.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        app.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!app.isShown && app.$backdrop) {
      app.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && app.$element.hasClass('fade') ?
        app.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    app.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = app.$element[0].scrollHeight > document.documentElement.clientHeight

    app.$element.css({
      paddingLeft:  !app.bodyIsOverflowing && modalIsOverflowing ? app.scrollbarWidth : '',
      paddingRight: app.bodyIsOverflowing && !modalIsOverflowing ? app.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    app.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    app.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    app.scrollbarWidth = app.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((app.$body.css('padding-right') || 0), 10)
    app.originalBodyPad = document.body.style.paddingRight || ''
    if (app.bodyIsOverflowing) app.$body.css('padding-right', bodyPad + app.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    app.$body.css('padding-right', app.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    app.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    app.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $app.data(), typeof option == 'object' && option)

      if (!data) $app.data('bs.modal', (data = new Modal(app, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return app
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $app   = $(app)
    var href    = $app.attr('href')
    var $target = $($app.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $app.data())

    if ($app.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $app.is(':visible') && $app.trigger('focus')
      })
    })
    Plugin.call($target, option, app)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    app.type       = null
    app.options    = null
    app.enabled    = null
    app.timeout    = null
    app.hoverState = null
    app.$element   = null
    app.inState    = null

    app.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    app.enabled   = true
    app.type      = type
    app.$element  = $(element)
    app.options   = app.getOptions(options)
    app.$viewport = app.options.viewport && $($.isFunction(app.options.viewport) ? app.options.viewport.call(app, app.$element) : (app.options.viewport.selector || app.options.viewport))
    app.inState   = { click: false, hover: false, focus: false }

    if (app.$element[0] instanceof document.constructor && !app.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + app.type + ' on the window.document object!')
    }

    var triggers = app.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        app.$element.on('click.' + app.type, app.options.selector, $.proxy(app.toggle, app))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        app.$element.on(eventIn  + '.' + app.type, app.options.selector, $.proxy(app.enter, app))
        app.$element.on(eventOut + '.' + app.type, app.options.selector, $.proxy(app.leave, app))
      }
    }

    app.options.selector ?
      (app._options = $.extend({}, app.options, { trigger: 'manual', selector: '' })) :
      app.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, app.getDefaults(), app.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = app.getDefaults()

    app._options && $.each(app._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof app.constructor ?
      obj : $(obj.currentTarget).data('bs.' + app.type)

    if (!self) {
      self = new app.constructor(obj.currentTarget, app.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + app.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in app.inState) {
      if (app.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof app.constructor ?
      obj : $(obj.currentTarget).data('bs.' + app.type)

    if (!self) {
      self = new app.constructor(obj.currentTarget, app.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + app.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + app.type)

    if (app.hasContent() && app.enabled) {
      app.$element.trigger(e)

      var inDom = $.contains(app.$element[0].ownerDocument.documentElement, app.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = app

      var $tip = app.tip()

      var tipId = app.getUID(app.type)

      app.setContent()
      $tip.attr('id', tipId)
      app.$element.attr('aria-describedby', tipId)

      if (app.options.animation) $tip.addClass('fade')

      var placement = typeof app.options.placement == 'function' ?
        app.options.placement.call(app, $tip[0], app.$element[0]) :
        app.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + app.type, app)

      app.options.container ? $tip.appendTo(app.options.container) : $tip.insertAfter(app.$element)
      app.$element.trigger('inserted.bs.' + app.type)

      var pos          = app.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = app.getPosition(app.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = app.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      app.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && app.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = app.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = app.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    app.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    app.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = app.tip()
    var title = app.getTitle()

    $tip.find('.tooltip-inner')[app.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = app
    var $tip = $(app.$tip)
    var e    = $.Event('hide.bs.' + app.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding app code with app `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    app.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    app.hoverState = null

    return app
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = app.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return app.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || app.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!app.$viewport) return delta

    var viewportPadding = app.options.viewport && app.options.viewport.padding || 0
    var viewportDimensions = app.getPosition(app.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = app.$element
    var o  = app.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!app.$tip) {
      app.$tip = $(app.options.template)
      if (app.$tip.length != 1) {
        throw new Error(app.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return app.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (app.$arrow = app.$arrow || app.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    app.enabled = true
  }

  Tooltip.prototype.disable = function () {
    app.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    app.enabled = !app.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = app
    if (e) {
      self = $(e.currentTarget).data('bs.' + app.type)
      if (!self) {
        self = new app.constructor(e.currentTarget, app.getDelegateOptions())
        $(e.currentTarget).data('bs.' + app.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = app
    clearTimeout(app.timeout)
    app.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $app.data('bs.tooltip', (data = new Tooltip(app, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return app
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    app.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = app.tip()
    var title   = app.getTitle()
    var content = app.getContent()

    $tip.find('.popover-title')[app.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      app.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // app manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return app.getTitle() || app.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = app.$element
    var o  = app.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (app.$arrow = app.$arrow || app.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $app.data('bs.popover', (data = new Popover(app, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return app
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    app.$body          = $(document.body)
    app.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    app.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    app.selector       = (app.options.target || '') + ' .nav li > a'
    app.offsets        = []
    app.targets        = []
    app.activeTarget   = null
    app.scrollHeight   = 0

    app.$scrollElement.on('scroll.bs.scrollspy', $.proxy(app.process, app))
    app.refresh()
    app.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return app.$scrollElement[0].scrollHeight || Math.max(app.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = app
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    app.offsets      = []
    app.targets      = []
    app.scrollHeight = app.getScrollHeight()

    if (!$.isWindow(app.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = app.$scrollElement.scrollTop()
    }

    app.$body
      .find(app.selector)
      .map(function () {
        var $el   = $(app)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(app[0])
        that.targets.push(app[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = app.$scrollElement.scrollTop() + app.options.offset
    var scrollHeight = app.getScrollHeight()
    var maxScroll    = app.options.offset + scrollHeight - app.$scrollElement.height()
    var offsets      = app.offsets
    var targets      = app.targets
    var activeTarget = app.activeTarget
    var i

    if (app.scrollHeight != scrollHeight) {
      app.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && app.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      app.activeTarget = null
      return app.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && app.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    app.activeTarget = target

    app.clear()

    var selector = app.selector +
      '[data-target="' + target + '"],' +
      app.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(app.selector)
      .parentsUntil(app.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $app.data('bs.scrollspy', (data = new ScrollSpy(app, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return app
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(app)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    app.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $app    = app.element
    var $ul      = $app.closest('ul:not(.dropdown-menu)')
    var selector = $app.data('target')

    if (!selector) {
      selector = $app.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($app.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $app[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $app.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    app.activate($app.closest('li'), $ul)
    app.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $app[0]
      })
      $app.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return app.each(function () {
      var $app = $(app)
      var data  = $app.data('bs.tab')

      if (!data) $app.data('bs.tab', (data = new Tab(app)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return app
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(app), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    app.options = $.extend({}, Affix.DEFAULTS, options)

    app.$target = $(app.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(app.checkPosition, app))
      .on('click.bs.affix.data-api',  $.proxy(app.checkPositionWithEventLoop, app))

    app.$element     = $(element)
    app.affixed      = null
    app.unpin        = null
    app.pinnedOffset = null

    app.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = app.$target.scrollTop()
    var position     = app.$element.offset()
    var targetHeight = app.$target.height()

    if (offsetTop != null && app.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (app.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + app.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = app.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (app.pinnedOffset) return app.pinnedOffset
    app.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = app.$target.scrollTop()
    var position  = app.$element.offset()
    return (app.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(app.checkPosition, app), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!app.$element.is(':visible')) return

    var height       = app.$element.height()
    var offset       = app.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(app.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(app.$element)

    var affix = app.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (app.affixed != affix) {
      if (app.unpin != null) app.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      app.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      app.affixed = affix
      app.unpin = affix == 'bottom' ? app.getPinnedOffset() : null

      app.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      app.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return app.each(function () {
      var $app   = $(app)
      var data    = $app.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $app.data('bs.affix', (data = new Affix(app, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return app
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(app)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
