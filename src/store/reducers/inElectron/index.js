const currentUrl = new URL(window.location.href);

export default (state, action) => currentUrl.searchParams.has('inElectron');
