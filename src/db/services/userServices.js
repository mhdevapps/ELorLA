import realm from "../index";

const userTableName = "UserInfo";
const statsTableName = "Stats";

export const createUserInfo = () => {
  // eslint-disable-next-line no-console
  console.log(`Realm is located at: ${realm.path}`);

  const userInfo = getUserInfo();
  if (!userInfo || userInfo.length < 1) {
    realm.write(() => {
      realm.create(userTableName, {
        useWebView: true
      });
    });
  }
};

export const getUserInfo = () => realm.objects(userTableName)[0];

export const changeWebViewPreference = () => {
  const userInfo = getUserInfo();
  if (userInfo) {
    realm.write(() => {
      userInfo.useWebView = !userInfo.useWebView;
    });
  }
};

export const changeShowPersonalisedAds = () => {
  const userInfo = getUserInfo();
  if (userInfo) {
    realm.write(() => {
      userInfo.onlyNonPersonalisedAds = !userInfo.onlyNonPersonalisedAds;
    });
  }
};
