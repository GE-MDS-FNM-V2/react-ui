const currentUrl = new URL(window.location.href);

export default {
  result: null,
  fetchingResult: false,
  error: null,
  inElectron: currentUrl.searchParams.has('inElectron')
};
