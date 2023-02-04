export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resole) {
    setTimeout(() => {
      return resole(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
