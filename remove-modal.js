/**
 * Utility function to remove `overflow: hidden` on the <html> and
 * <body>. This is a common method used on most sites so we re-use it a
 * few places.
 */
function _clearOverflowHidden(elements) {
  let others = elements || []
  for (let item of [document.documentElement, document.body].concat(others)) {
    item.style.overflowY = 'auto'
  }
}

/**
 * Utility function to remove elements with the given `className`. If
 * `exact` is truth-y, the `className` must be exact, otherwise we use
 * partial matches.
 */
function _removeElementsByClassName(className, exact) {
  // empty to start
  let collection = []
  // query elements
  if (exact) {
    console.log('removing className: ' + className)
    collection = document.getElementsByClassName(className)
  } else {
    let selector = '[class*=' + className + ']'
    console.log('removing selector: ' + selector)
    collection = document.querySelectorAll(selector)
  }
  // remove matches
  for (let item of collection) {
    console.log('removing item: ' + item.toString())
    item.remove()
  }
}

function _removeElementById(id) {
  let element = document.getElementById(id)
  element.remove()
}

/**
 * This works for any tp-modal.
 *
 * Tested:
 * https://www.businessinsider.com
 * https://www.forbes.com
 * https://www.sltrib.com
 */
function tpModal() {
  _removeElementsByClassName('tp-modal', true)
  _removeElementsByClassName('tp-backdrop', true)
  // remove classes from body
  let bodyClassNames = ['adblock-on', 'tp-modal-open']
  for (let bodyClassName of bodyClassNames) {
    console.log('removing body class: ' + bodyClassName)
    document.body.classList.remove(bodyClassName)
  }
}

/**
 * Sourcepoint
 *
 * Tested:
 * https://www.usatoday.com
 */
function sourcepoint() {
  _removeElementsByClassName('sp_message_container')
  _removeElementsByClassName('sp_veil')
  _clearOverflowHidden()
}

/**
 * Custom Overlay
 *
 * Tested:
 * https://washingtonpost.com
 */
function customWashingtonPost() {
  _removeElementsByClassName('paywall-overlay')
  _clearOverflowHidden()
}

/**
 * Custom Overlay
 *
 * Tested:
 * https://www.kbb.com
 */
function customKelleyBlueBook() {
  _removeElementsByClassName('whitelist-overlay-modal-background')
  _clearOverflowHidden()
}

/**
 * Custom Overlay
 *
 * Tested:
 * https://www.nytimes.com
 */
function customNyTimes() {
  let overflowEl = document.getElementById('app').children[0].children[0]
  let shader = overflowEl.children[overflowEl.children.length-1]
  _removeElementById('gateway-content')
  _clearOverflowHidden([overflowEl])
  shader.remove()
}

// TODO: try invoking functions based on the host
tpModal()
sourcepoint()
customWashingtonPost()
customKelleyBlueBook()
customNyTimes()
