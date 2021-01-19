/**
 * Utility function to remove `overflow: hidden` on the <html> and
 * <body>. This is a common method used on most sites so we re-use it a
 * few places.
 */
function _clearOverflowHidden() {
  for (let item of [document.documentElement, document.body]) {
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

/**
 * This works for any tp-modal.
 *
 * Tested:
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

// TODO: try invoking functions based on the host
tpModal()
sourcepoint()
customWashingtonPost()
