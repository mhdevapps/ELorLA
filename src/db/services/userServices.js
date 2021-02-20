import realm from "../index";

const userTableName = "UserInfo";

export const createUserInfo = () => {
  const userInfo = getUserInfo();
  console.log("uu", userInfo);
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
