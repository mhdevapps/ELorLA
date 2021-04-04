import colours from "../themes/colours";
import { getUserInfo } from "../db/services/userServices";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Text,
  Dimensions
} from "react-native";
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize
} from "@react-native-firebase/admob";

export const adTypesForPlayScene = [
  BannerAdSize.ADAPTIVE_BANNER,
  BannerAdSize.BANNER,
  BannerAdSize.LARGE_BANNER,
  BannerAdSize.MEDIUM_RECTANGLE,
  BannerAdSize.SMART_BANNER
];

export const adIds = {
  bannerTest: TestIds.BANNER,
  bannerPlay: "----",
  bannerEditWords: "----"
};

export const getAdTypeForPlayerScene = () => {
  const adType = parseInt(Math.random() * adTypesForPlayScene.length, 10);
  return adTypesForPlayScene[adType] || BannerAdSize.ADAPTIVE_BANNER;
};

export const renderRectangleBanner = () => {
  return React.useMemo(
    () => (
      <ScrollView>
        <View>
          <Text
            style={{ fontSize: 11, backgroundColor: colours.gray, textAlign: "center" }}
            numberOfLines={1}
          >
            Ad
          </Text>
        </View>
        <ScrollView style={{ borderWidth: 1, borderColor: colours.gray }}>
          <View style={{ alignItems: "center" }}>
            <BannerAd
              unitId={adIds.bannerEditWords}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{
                requestNonPersonalizedAdsOnly: getUserInfo().onlyNonPersonalisedAds
              }}
              onAdFailedToLoad={e => {
                console.log("Ad failed Edit", e, BannerAdSize.MEDIUM_RECTANGLE);
              }}
            />
          </View>
        </ScrollView>
      </ScrollView>
    ),
    []
  );
};

export const renderPlayAd = (colors, onlyNonPersonalisedAds) => {
  const [getAdType] = useState(getAdTypeForPlayerScene());
  const [getShowAds, setShowAds] = useState(true);

  // React.useMemo makes that it only re-renders when getShowAds changes
  return React.useMemo(() => {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: getAdType === BannerAdSize.MEDIUM_RECTANGLE ? 10 : 50
          }}
        >
          <View style={styles.playAd.view}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setShowAds(!getShowAds)}
            >
              <Text
                style={{
                  ...styles.playAd.text,
                  backgroundColor: colors.gray,
                  borderBottomLeftRadius: getShowAds ? 0 : 50,
                  color: colors.black
                }}
              >
                {getShowAds ? "Hide ad" : "Show ad"}
              </Text>
            </TouchableOpacity>
            {getShowAds ? (
              <ScrollView>
                <View
                  style={{
                    ...styles.playAd.scrollViewStyle,
                    borderColor: colors.gray,
                    backgroundColor: colors.backgroundShadow
                  }}
                >
                  <BannerAd
                    unitId={adIds.bannerPlay}
                    size={getAdType}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: onlyNonPersonalisedAds
                    }}
                    onAdFailedToLoad={e => {
                      console.log("Ad failed PLAY", e, getAdType);
                    }}
                  />
                </View>
              </ScrollView>
            ) : (
              <View style={{ flex: 1 }} />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }, [getShowAds]);
};

const styles = {
  playAd: {
    view: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    },
    text: { paddingLeft: 15, paddingRight: 10, borderTopLeftRadius: 50, fontSize: 12 },
    scrollViewStyle: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: Dimensions.get("window").width,
      borderWidth: 1,
      minHeight: 50
    }
  }
};
