/**
 * Cover-page chrome pinning: the site avatar and the hero action pills
 * (photo gallery, translation) stay fixed near the top of the viewport
 * while the cover scrolls by, then release and scroll out with it just
 * before reaching the article title.
 *
 * Both elements are moved onto the body element so real position: fixed
 * works: the page wrapper carries a transform, which would capture fixed,
 * and body's overflow-x rules disable position: sticky. A fixed element
 * costs nothing per frame; a scroll-follow transform lags a frame behind
 * the compositor and flickers the pills' backdrop blur.
 *
 * This is cover behavior, not gallery behavior: it applies to any article
 * with a cover image, with or without a photo gallery.
 */
(function() {
  'use strict'

  // Breathing room kept between the pinned chrome and the article title.
  var TITLE_CLEARANCE = 24

  var cover = document.querySelector('.c-post__cover_image')
  if (!cover) return

  var riders = []
  var actions = document.querySelector('.c-post__hero-actions')
  var avatarHeader = document.querySelector('.c-header--has-cover-image')
  if (actions) riders.push(actions)
  if (avatarHeader) riders.push(avatarHeader)
  if (!riders.length) return

  riders.forEach(function(rider) { document.body.appendChild(rider) })

  var pinned = null
  var releasePoint = 0

  window.addEventListener('scroll', place, { passive: true })
  window.addEventListener('resize', measureReleasePoint)
  measureReleasePoint()

  // The chrome releases just before its bottom edge would touch the title
  // (which sits at the cover's bottom), so the two never overlap. Covers
  // without a title block fall back to the cover's own bottom edge.
  function measureReleasePoint() {
    var title = document.querySelector('.c-post__header-text')
    var stopLine = title
      ? documentTop(title) - TITLE_CLEARANCE
      : documentTop(cover) + cover.offsetHeight
    releasePoint = Math.max(0, stopLine - pinnedBottom())
    pinned = null
    place()
  }

  function documentTop(element) {
    return element.getBoundingClientRect().top + window.scrollY
  }

  function pinnedBottom() {
    var bottom = 0
    riders.forEach(function(rider) {
      bottom = Math.max(bottom, cssTop(rider) + rider.offsetHeight)
    })
    return bottom
  }

  function place() {
    var shouldPin = window.scrollY < releasePoint
    if (shouldPin === pinned) return
    pinned = shouldPin
    riders.forEach(shouldPin ? pin : release)
  }

  function pin(rider) {
    rider.style.top = ''
    rider.classList.add('is-pinned')
  }

  function release(rider) {
    rider.classList.remove('is-pinned')
    rider.style.top = (cssTop(rider) + releasePoint) + 'px'
  }

  // The resting top lives in CSS (and differs by breakpoint), so read it
  // with any inline override lifted.
  function cssTop(rider) {
    var inline = rider.style.top
    rider.style.top = ''
    var top = parseFloat(getComputedStyle(rider).top) || 0
    rider.style.top = inline
    return top
  }
})()
