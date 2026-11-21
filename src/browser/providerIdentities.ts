import type { ProviderIdentity } from "../ports/AnalysisProvider.js";

/** Identity available without loading the CdpBrowserProvider implementation. */
export const CDP_BROWSER_PROVIDER_IDENTITY: ProviderIdentity = Object.freeze({
  id: "tensor-cdp-browser",
  name: "Tensor Chrome DevTools Protocol observation provider",
  version: "2",
});

/** Identity available without loading the PlaywrightBrowserScenarioProvider implementation. */
export const PLAYWRIGHT_BROWSER_SCENARIO_PROVIDER_IDENTITY: ProviderIdentity =
  Object.freeze({
    id: "tensor-playwright-browser-scenario",
    name: "Tensor Playwright browser scenario capture provider",
    version: "1",
  });

/** Identity available without loading the CdpElectronProvider implementation. */
export const CDP_ELECTRON_PROVIDER_IDENTITY: ProviderIdentity = Object.freeze({
  id: "tensor-cdp-electron",
  name: "Tensor Electron file-page CDP observation provider",
  version: "1",
});

/** Identity available without loading the PlaywrightElectronActiveProvider implementation. */
export const PLAYWRIGHT_ELECTRON_ACTIVE_PROVIDER_IDENTITY: ProviderIdentity =
  Object.freeze({
    id: "tensor-playwright-electron-active",
    name: "Tensor Playwright active Electron observation provider",
    version: "1",
  });
