/**
 * Gallery mode: a full-screen, day-by-day view of a photo essay's images.
 *
 * The article's own <img> nodes are cloned into an overlay, so nothing
 * downloads twice and loading="lazy" keeps working inside it. H2s become
 * section dividers (with their `.subtitle` one-liner when present); photos
 * before the first H2 form an untitled opening group; H2s with no photos are
 * dropped. The hide-on-mobile/show-on-mobile classes stay on the clones so
 * the existing global media queries keep deciding which crop of each photo
 * is visible, live, at any viewport.
 *
 * Desktop lays each section out as justified rows: images keep their aspect
 * ratio and each row is scaled to fill the container edge to edge. Ratios
 * are read from naturalWidth as images decode, so rows refine as photos
 * arrive. Below 600px the grid is a single column and none of the row math
 * runs.
 *
 * The overlay is appended to document.body on purpose: the page wrapper
 * (.c-off-canvas-container) carries a transform, which would turn it into
 * the containing block for position: fixed and pin the overlay to the wrong
 * box.
 *
 * URL state: opening sets ?gallery=1 via pushState so Back closes the
 * overlay; a shared link with ?gallery=1 opens straight into the gallery.
 */
(function() {
  'use strict'

  var PARAM = 'gallery'
  var MOBILE_QUERY = '(max-width: 600px)'
  var TARGET_ROW_HEIGHT = 320
  var LAST_ROW_JUSTIFY_FILL = 0.75
  var FALLBACK_RATIO = 3 / 2

  var openButton = document.querySelector('.js-gallery-open')

  if (!openButton) {
    stripStaleParam()
    return
  }

  var labels = openButton.dataset
  var overlay = null
  var closeButton = null
  var zoomLayer = null
  var zoomImages = []
  var zoomIndex = -1
  var openedByPush = false
  var relayoutScheduled = false
  var lockedScrollY = 0

  try {
    overlay = buildOverlay(collectSections())
    document.body.appendChild(overlay)
  } catch (error) {
    stripStaleParam()
    return // leave the pill hidden; the article is unaffected
  }

  closeButton = overlay.querySelector('.c-gallery__close')
  openButton.hidden = false

  openButton.addEventListener('click', openFromPill)
  closeButton.addEventListener('click', leaveGallery)
  window.addEventListener('popstate', syncWithLocation)
  window.addEventListener('resize', scheduleRelayout)
  window.matchMedia(MOBILE_QUERY).addEventListener('change', scheduleRelayout)
  document.addEventListener('keydown', handleKeydown)

  if (hasParam()) openGallery()

  // ---- Sections model ----

  function collectSections() {
    var content = document.querySelector('.c-content')
    var sections = []
    var current = newSection(null, null)

    content.querySelectorAll('h2, img').forEach(function(element) {
      if (element.tagName === 'H2') {
        if (current.images.length) sections.push(current)
        current = newSection(element.textContent.trim(), subtitleAfter(element))
      } else {
        current.images.push({ img: element, caption: captionFor(element) })
      }
    })
    if (current.images.length) sections.push(current)

    return sections
  }

  function newSection(title, subtitle) {
    return { title: title, subtitle: subtitle, images: [] }
  }

  function subtitleAfter(heading) {
    var next = heading.nextElementSibling
    if (!next) return null
    var span = next.matches('.subtitle') ? next : next.querySelector('.subtitle')
    return span ? span.textContent.trim() : null
  }

  function captionFor(img) {
    var figure = img.closest('figure')
    var caption = figure && figure.querySelector('figcaption')
    return caption ? caption.textContent.trim() : null
  }

  // ---- Overlay construction ----

  function buildOverlay(sections) {
    var element = document.createElement('div')
    element.className = 'c-gallery'
    element.setAttribute('role', 'dialog')
    element.setAttribute('aria-modal', 'true')
    element.setAttribute('aria-label', labels.galleryLabel || 'Photo gallery')
    element.innerHTML =
      '<div class="c-gallery__scroll">' +
        '<div class="c-gallery__bar">' +
          '<p class="c-gallery__name"></p>' +
          '<button type="button" class="c-gallery__close">' + closeGlyph() + '</button>' +
        '</div>' +
        '<div class="c-gallery__inner"></div>' +
      '</div>'

    element.querySelector('.c-gallery__name').textContent = articleTitle()
    element.querySelector('.c-gallery__close')
      .setAttribute('aria-label', labels.closeLabel || 'Close gallery')

    var inner = element.querySelector('.c-gallery__inner')
    sections.forEach(function(section) {
      inner.appendChild(buildSection(section))
    })

    return element
  }

  function buildSection(section) {
    var element = document.createElement('section')
    element.className = 'c-gallery__section'

    if (section.title) {
      element.appendChild(buildDivider(section))
    }

    var grid = document.createElement('div')
    grid.className = 'c-gallery__grid'
    section.images.forEach(function(entry) {
      grid.appendChild(buildItem(entry))
    })
    element.appendChild(grid)

    return element
  }

  function buildDivider(section) {
    var divider = document.createElement('header')
    divider.className = 'c-gallery__divider'

    var title = document.createElement('h2')
    title.textContent = section.title
    divider.appendChild(title)

    if (section.subtitle) {
      var subtitle = document.createElement('p')
      subtitle.className = 'c-gallery__subtitle'
      subtitle.textContent = section.subtitle
      divider.appendChild(subtitle)
    }

    return divider
  }

  function buildItem(entry) {
    var item = document.createElement('figure')
    item.className = 'c-gallery__item'

    var img = entry.img.cloneNode(false)
    img.removeAttribute('style')
    img.removeAttribute('fetchpriority')
    img.alt = entry.img.getAttribute('alt') || ''
    item.appendChild(img)

    if (entry.caption) {
      var caption = document.createElement('figcaption')
      caption.className = 'c-gallery__caption'
      caption.textContent = entry.caption
      item.appendChild(caption)
    }

    img.addEventListener('load', function() {
      item.classList.add('is-loaded')
      scheduleRelayout()
    })
    img.addEventListener('error', function() {
      item.remove()
      scheduleRelayout()
    })
    img.addEventListener('click', function() { maybeZoom(img) })

    // A clone served straight from cache can be complete before the load
    // listener attaches, so it would keep the placeholder forever.
    if (img.complete && img.naturalWidth > 0) item.classList.add('is-loaded')

    return item
  }

  function articleTitle() {
    var title = document.querySelector('.c-post__title')
    return title ? title.textContent.trim() : document.title
  }

  function closeGlyph() {
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"' +
      ' stroke="currentColor" stroke-width="1.5" stroke-linecap="round"' +
      ' aria-hidden="true" focusable="false">' +
      '<path d="M6 6l12 12M18 6L6 18"/></svg>'
  }

  // ---- Open / close ----

  function openFromPill() {
    history.pushState({ gallery: true }, '', urlWith())
    openedByPush = true
    openGallery()
  }

  function openGallery() {
    if (isOpen()) return
    lockScroll()
    setPageInert(true)
    overlay.classList.add('is-open')
    closeButton.focus()
    scheduleRelayout()
  }

  function closeGallery() {
    if (!isOpen()) return
    closeZoom()
    overlay.classList.remove('is-open')
    unlockScroll()
    setPageInert(false)
    openedByPush = false
    openButton.focus()
  }

  // aria-modal covers modern screen readers; inert on the page wrapper closes
  // the gap for older ones and blocks tabbing into the covered article.
  function setPageInert(inert) {
    var page = document.querySelector('.c-off-canvas-container')
    if (page) page.inert = inert
  }

  // The UI-driven close: Esc or the close button. Unwinds the history entry
  // the pill pushed, so Back and the close button leave the same history
  // behind. A reader who landed directly on ?gallery has no entry of ours to
  // unwind; going back would leave the site, so rewrite the URL instead.
  // Closes eagerly before unwinding history: history.back() is async, and a
  // repeated Esc during the popstate round-trip would otherwise traverse
  // history twice and land the reader off the article entirely.
  function leaveGallery() {
    var pushed = openedByPush
    closeGallery()
    if (pushed) history.back()
    else history.replaceState(null, '', urlWithout())
  }

  function syncWithLocation() {
    if (hasParam()) openGallery()
    else closeGallery()
  }

  function isOpen() {
    return overlay.classList.contains('is-open')
  }

  // iOS-safe scroll lock: overflow: hidden on body does not stop touch
  // scrolling underneath a fixed overlay in Safari.
  function lockScroll() {
    lockedScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = -lockedScrollY + 'px'
    document.body.style.width = '100%'
  }

  function unlockScroll() {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, lockedScrollY)
  }

  function handleKeydown(event) {
    if (!isOpen()) return
    if (event.key === 'Escape') {
      if (zoomIndex >= 0) closeZoom()
      else leaveGallery()
    } else if (event.key === 'ArrowRight') {
      if (zoomIndex < 0) openZoomFromKeyboard()
      else stepZoom(1)
    } else if (event.key === 'ArrowLeft') {
      stepZoom(-1)
    } else if (event.key === 'Tab') {
      // The close button is the overlay's only focusable control.
      event.preventDefault()
      closeButton.focus()
    }
  }

  // ---- Layout ----

  function scheduleRelayout() {
    if (relayoutScheduled) return
    relayoutScheduled = true
    requestAnimationFrame(function() {
      relayoutScheduled = false
      if (isOpen()) layoutSections()
    })
  }

  function layoutSections() {
    var mobile = window.matchMedia(MOBILE_QUERY).matches
    overlay.querySelectorAll('.c-gallery__section').forEach(function(section) {
      var grid = section.querySelector('.c-gallery__grid')
      var visible = visibleItems(grid)
      section.style.display = visible.length ? '' : 'none'
      if (mobile) resetLayout(grid)
      else layoutGrid(grid, visible)
    })
  }

  // Which crop of each photo exists right now is the CSS's decision
  // (hide-on-mobile/show-on-mobile), so visibility is measured, not assumed.
  // Items must be unhidden before measuring: a display: none inherited from
  // a previous pass would otherwise hide them forever.
  function visibleItems(grid) {
    return Array.prototype.filter.call(grid.children, function(item) {
      item.style.display = ''
      var hidden = getComputedStyle(item.querySelector('img')).display === 'none'
      if (hidden) item.style.display = 'none'
      return !hidden
    })
  }

  function resetLayout(grid) {
    Array.prototype.forEach.call(grid.children, function(item) {
      item.style.width = ''
      item.querySelector('img').style.height = ''
    })
  }

  function layoutGrid(grid, visible) {
    var width = grid.clientWidth
    if (!width || !visible.length) return

    var gap = parseFloat(getComputedStyle(grid).columnGap) || 0
    var ratios = visible.map(function(item) {
      return ratioOf(item.querySelector('img'))
    })

    var index = 0
    computeRows(ratios, width, gap).forEach(function(row) {
      row.widths.forEach(function(itemWidth) {
        visible[index].style.width = itemWidth + 'px'
        visible[index].querySelector('img').style.height = row.height + 'px'
        index += 1
      })
    })
  }

  function ratioOf(img) {
    return img.naturalWidth > 0
      ? img.naturalWidth / img.naturalHeight
      : FALLBACK_RATIO
  }

  function computeRows(ratios, containerWidth, gap) {
    var rows = []
    var row = []
    ratios.forEach(function(ratio) {
      row.push(ratio)
      if (widthAtTarget(row, gap) >= containerWidth) {
        rows.push(fitRow(row, containerWidth, gap, false))
        row = []
      }
    })
    if (row.length) rows.push(fitRow(row, containerWidth, gap, true))
    return rows
  }

  function widthAtTarget(ratios, gap) {
    var width = gap * (ratios.length - 1)
    ratios.forEach(function(ratio) { width += ratio * TARGET_ROW_HEIGHT })
    return width
  }

  function fitRow(ratios, containerWidth, gap, isLast) {
    var ratioSum = 0
    ratios.forEach(function(ratio) { ratioSum += ratio })

    // One pixel short on purpose: a rounding fraction must never wrap a
    // packed row in the flex container.
    var height = (containerWidth - gap * (ratios.length - 1) - 1) / ratioSum
    // A final row that nearly fills the width stretches to justify like the
    // rest (its photos grow a little taller, which still reads natural); a
    // sparse one stays left-aligned at the target height, since inflating one
    // or two photos across the full width would look off.
    if (isLast && height > TARGET_ROW_HEIGHT / LAST_ROW_JUSTIFY_FILL) {
      height = TARGET_ROW_HEIGHT
    }
    // A row of one tall portrait would otherwise fill the width and blow
    // past the viewport.
    height = Math.min(height, window.innerHeight * 0.85)

    return {
      height: height,
      widths: ratios.map(function(ratio) { return ratio * height })
    }
  }

  // ---- Zoom (desktop only) ----

  // ArrowRight on the grid opens the first visible photo, so the full-size
  // view is reachable without a mouse.
  function openZoomFromKeyboard() {
    if (window.matchMedia(MOBILE_QUERY).matches) return
    openZoom(visibleImages(), 0)
  }

  function maybeZoom(img) {
    if (window.matchMedia(MOBILE_QUERY).matches) return
    var targets = visibleImages()
    openZoom(targets, targets.indexOf(img))
  }

  function visibleImages() {
    return Array.prototype.filter.call(
      overlay.querySelectorAll('.c-gallery__item img'),
      function(img) { return img.offsetParent !== null }
    )
  }

  function openZoom(images, index) {
    if (index < 0) return
    ensureZoomLayer()
    zoomImages = images
    zoomIndex = index
    showZoomed()
  }

  function ensureZoomLayer() {
    if (zoomLayer) return
    zoomLayer = document.createElement('figure')
    zoomLayer.className = 'c-gallery__zoom'
    zoomLayer.appendChild(document.createElement('img'))
    zoomLayer.appendChild(document.createElement('figcaption'))
    zoomLayer.addEventListener('click', closeZoom)
    overlay.appendChild(zoomLayer)
  }

  function showZoomed() {
    var source = zoomImages[zoomIndex]
    var img = zoomLayer.querySelector('img')
    img.src = source.currentSrc || source.src
    img.alt = source.alt

    var caption = source.parentElement.querySelector('figcaption')
    zoomLayer.querySelector('figcaption').textContent =
      caption ? caption.textContent : ''

    zoomLayer.classList.add('is-open')
  }

  function stepZoom(delta) {
    if (zoomIndex < 0) return
    var next = zoomIndex + delta
    if (next < 0 || next >= zoomImages.length) return
    zoomIndex = next
    showZoomed()
  }

  function closeZoom() {
    zoomIndex = -1
    if (zoomLayer) zoomLayer.classList.remove('is-open')
  }

  // ---- URL state ----

  function hasParam() {
    return new URL(location.href).searchParams.has(PARAM)
  }

  function urlWith() {
    var url = new URL(location.href)
    url.searchParams.set(PARAM, '1')
    return url.toString()
  }

  function urlWithout() {
    var url = new URL(location.href)
    url.searchParams.delete(PARAM)
    return url.toString()
  }

  // A shared ?gallery link can land on a post with no gallery (or with JS
  // that failed to find one). Leave the address bar clean.
  function stripStaleParam() {
    var url = new URL(location.href)
    if (!url.searchParams.has(PARAM)) return
    url.searchParams.delete(PARAM)
    history.replaceState(null, '', url.toString())
  }
})()
