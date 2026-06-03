const localMediaAssets = {
  "local:raptor-sea": require("../../assets/rockets/raptor-sea.jpg"),
  "local:raptor-vacuum": require("../../assets/rockets/raptor-vacuum.jpg"),
  "local:sls-side-booster": require("../../assets/rockets/sls-side-booster.jpg"),
  "local:sls-rocket-card": require("../../assets/rockets/sls-rocket-card.jpg"),
  "local:starship-rocket-card": require("../../assets/rockets/starship-rocket-card.jpg"),
  "local:new-glenn-rocket-card": require("../../assets/rockets/new-glenn-rocket-card.jpg")
} as const;

export type MediaAssetKey = keyof typeof localMediaAssets;

export const getMediaImageSource = (url?: string) => {
  if (!url) {
    return undefined;
  }

  return localMediaAssets[url as MediaAssetKey] ?? { uri: url };
};
