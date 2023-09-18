import { StyleSheet, Dimensions, StatusBar } from "react-native";

const globalStyles = StyleSheet.create({
  // MAIN STYLES
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    // backgroundColor: "#fff",
  },
  onBoardingContainer: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#fff",
  },
  body: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // used as an indicator, it can be deleted.
  },

  // SPLASH STYLES
  splashFooter: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  splashLogo: {
    width: 130,
    height: 130,
  },
  splashContainer: {
    height: "100%",
    width: "100%",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  appName2: {
    fontSize: 20,
    color: "#000",
  },
  wrongLogo: {
    width: 220,
    height: 200,
  },

  //SignUpScreen
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
    
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  imageBack: {
    height: Dimensions.get("window").height,
    top: StatusBar.currentHeight && StatusBar.currentHeight
  },
  gallery360logo: {
    height: 226,
    width: 166,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
  errors: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
    marginHorizontal: 35,
  },

  // ONBOARDING STYLES
  onboardingBody: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 25,
  },
  image1: {
    height: 180,
    width: 150,
    borderRadius: 20,
  },
  image2: {
    height: 90,
    width: 150,
    borderRadius: 20,
    marginVertical: 10,
  },
  image3: {
    height: 90,
    width: 150,
    borderRadius: 20,
  },
  image4: {
    height: 180,
    width: 150,
    borderRadius: 20,
    marginVertical: 10,
  },
  column1: {
    paddingTop: 20,
    right: 10,
  },
  column2: {
    left: 10,
  },
  onboardingFooter: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subject: {
    fontSize: 40,
    color: "#000",
    paddingLeft: 20,
    top: 5,
  },
  introduction: {
    color: "#000",
    fontSize: 16,
    left: 2,
  },
  signIn: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 50,
    width: 320,
    marginVertical: 15,
  },
  signInTxt: {
    textAlign: "center",
    fontSize: 22,
    color: "#000",
  },
  signUp: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    height: 50,
    width: 320,
  },
  signUpTxt: {
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },

  // MARKET & EXHIBITION STYLES
  homeBody: {
    flex: 6,
    //   top: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  homeBody1: {
    flex: 6,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  homeFooter: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    paddingLeft: 10,
  },
  artContainer: {
    width: "100%",
    height: "100%",
    marginTop: 8,
  },
  artImage: {
    width: 328,
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    //borderWidth: .5,
    borderColor: "gray",
    alignSelf: "center",
  },
  artistNameContainer: {
    backgroundColor: "#fff",
    marginVertical: -10,
    borderRadius: 8,
    alignSelf: "center",
    height: 20,
    width: "100%",
    bottom: 15,
    paddingHorizontal: 3,
  },
  ArtistName: {
    color: "gray",
    textAlign: "center",
    // fontWeight: "bold"
  },
  artTxtBg: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(16, 18, 27, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    height: 80,
    borderRadius: 20,
    bottom: 8,
    right: 8,
    left: 8,
  },
  artNameTxt: {
    fontSize: 23,
    //fontWeight: 'bold',
    color: "#000",
    paddingHorizontal: 20,
  },
  artTypeTxt: {
    color: "gray",
    paddingHorizontal: 20,
    bottom: 3,
  },
  artTypeTxt2: {
    position: "absolute",
    zIndex: 2,
    color: "#fff",
    left: 180,
    top: 45,
  },

  // TIKTOK SCREEN STYLES
  tikTokContainer: {
    width: "100%",
    height: Dimensions.get("window").height,

  },
  videPlayButton: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    // bottom: 0,
    // right: 0,
  },
  uiContainer: {
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 0
  },
  bottomContainer: {
    // bottom: 0,
    padding: 10,
    // height: '30%',
    minHeight: 240,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // borderColor: 'red',
    // borderWidth: 1,
    marginTop: 40
    // height: 300
  },
  bottomContainer1: {
    padding: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    top: "90%",
    marginVertical: "100%",
  },
  topLeftIcon: {
    alignSelf: "flex-start",
    borderWidth: 1,
    //
    borderRadius: 14,
    borderColor: "#FFFFFF",
    width: 45,
    height: 45,
    right: 20,
    marginHorizontal: -5,
  },
  handle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#4c4c4c",
  },

  //  right container
  rightContainer: {
    alignSelf: "flex-end",
    // height: 220,
    height: 165,
    justifyContent: "space-between",
    // marginVertical: "-20%",
    right: 10
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  iconContainer: {
    alignItems: "center",
  },
  statsLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  viewArtist: {
    // marginVertical: 10,
    flexDirection: "row",
    // marginHorizontal: 10,
    marginBottom: 10,
    // flex: 1,
    // maxHeight: 'auto',
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center'
  },
  viewMiddleIcon: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginHorizontal: 30,
    marginVertical: 60,
  },
  secondBottomContainer: {
    backgroundColor: 'blue',
    padding: 20,
    width: "100%",
    height: '100%',
    // height: "90%",
    marginVertical: "6%",
    alignSelf: "center",
    backgroundColor: "rgba(16,18,27,0.4)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    shadowOpacity: 20,
    //border: 1,
    borderRadius: 20,
    flexDirection: "column",
    // top: 50,
  },
  secondBottomContainer1: {
    width: "80%",
    height: "70%",
    marginVertical: "6%",
    alignSelf: "center",
    // backgroundColor: 'rgba(16,18,27,0.4)',
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    shadowOpacity: 20,
    //border: 1,
    borderRadius: 10,
    flexDirection: "column",
  },
  previewSecondBottomContainer: {
    alignSelf: "center",
    marginVertical: "90%",
    position: "absolute",
    alignSelf: "center",
    flexDirection: "column",
  },
  viewDescription: {
    alignSelf: "flex-start",
    // marginHorizontal: 15,
    width: "100%",
    flex: 2
    // top: 10
    // borderWidth: ''
  },
  artistName: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#F5F5F5",
    // borderColor: 'blue',
    // borderWidth: 1
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  button: {
    width: 10,
    height: 10,
    backgroundColor: "#347af0",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  price: {
    alignSelf: "flex-end",
    fontSize: 18,
    // fontWeight: 'bold',
    marginVertical: -45,
    color: "#F5F5F5",
    paddingBottom: 10,
  },
  cartIcon: {
    alignSelf: "flex-end",
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 1
  },
  artistImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    // marginVertical: 10,
    borderColor: "rgba(196, 196, 196, 0.51)",
    borderWidth: 4,
  },
  topIconView: {
    flexDirection: "row",
    marginVertical: 20,
    width: "80%",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  // CART STYLES
  flatlistView: {
    // borderRadius: 10,
    //    backgroundColor: 'red',
    marginVertical: -15,
  },
  cancelIcon: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: "#FF5353",
    position: "absolute",
    zIndex: 10,
    right: 18,
    top: 25,
    margin: 5
  },
  closeIconStyle: {
    textAlign: "center",
    top: 5,
    position: "relative",
  },
  cartImage: {
    width: "95%",
    height: 180,
    alignSelf: "center",
    borderRadius: 15,
    top: 20,
  },
  priceContainer: {
    flexDirection: "column",
    width: "90%",
    height: 70,
    borderRadius: 10,
    bottom: 57,
    backgroundColor: "rgba(16, 18, 27, 0.4)",
    alignSelf: "center",
  },
  artTxtName: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  priceTxt: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: -10,
  },
  Top: {
    flexDirection: "row",
    marginTop: "16%",
    justifyContent: "space-around",
    marginRight: 90,
    width: "30%",
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 30,
  },
  backButtonView: {
    justifyContent: "center",
    height: 70,
  },
  title: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    right: -100,
    // justifyContent: 'center'
  },

  // PAYMENT SUUCESS & FAILURE
  paymeyntFailure: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 70,
  },
  paymeyntSuccess: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    paddingTop: 70,
  },

  // CARD
  cardContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  cardBody: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFooter: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor: 'red',  // used as an indicator, it can be deleted.
    // padding: 20
  },

  // SHIPPING
  shippingFooter: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    bottom: 55,
  },

  //USER PROFILE SCREEN
  backgroundImg: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    borderColor: 'green',
    // borderWidth: 20,
  },

  profileImg: {
    // position: 'relative',
    // flex: 1,
    height: '100%',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    // aspectRatio: 1,
    // height: '90%',
    borderRadius: 300,
    // top: '-45%',
    // bottom: 150,
    // marginBottom: -150
  },
  profileImgContainer: {
    // top: 120,
    marginBottom: 20,
    width: "80%",
    height: '65%',
    
    borderRadius: 15,
    flexDirection: 'column',
    alignContent: 'flex-end',
    backgroundColor: "#E3E3E3",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'flex-end'
    // borderColor: 'red',
    // borderWidth: 1
    // top: 30,
  },

  topLeftIcon: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#F5F5F5",
    width: 45,
    height: 45,
    marginHorizontal: 5,
  },

  userNameText: {
    color: "#000",
    fontSize: 20,
    // bottom: 75,
    margin: 20
  },

  editBtn: {
    width: 120,
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // bottom: 70,
    // top: 20
  },

  btnText: {
    color: "white",
    fontSize: 16,
  },

  optionsContainer: {
    // top: 120,
    flex: 5,
    justifyContent: 'space-evenly',
    // borderColor: 'red',
    // borderWidth: 1
    // bottom: -110,
    // marginTop: 20
  },
  modalFullView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContainer: {
    width: "90%",
    height: 475,
    backgroundColor: "#E3E3E3",
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    // borderColor: 'red',
    // borderWidth: 1
  },

  editprofileImgContainer: {
    width: 200,
    height: 200,
    // borderRadius: 300,
    // backgroundColor: "gray",
    // justifyContent: "center",
    // alignItems: "center",
    // borderColor: 'red',
    // borderWidth: 3
    
  },

  editUserInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    width: "90%",
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 18,
    fontWeight: '600' ,
    marginTop: 65,
    marginBottom: 25,
    backgroundColor: "white",
  },

  updateBtn: {
    width: "90%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    color: "white",
  },

  closeBtnContaainer: {
    width: 37,
    height: 37,
    backgroundColor: "#FF5353",
    borderRadius: 18.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    // right: 20,
  },

  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 300,
  },
  imgAddIcon: {
    position: "absolute",
    top: 82.5,
    left: 82.5,
    color: '#E3E3E3',
    zIndex: 10
  },

  flatlist: {
    height: 280,
  },

  //SHIPPING ADDRESS
  textField: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#22180E",
    height: 47,
    width: "80%",
    alignSelf: "center",
    color: "#000",
    paddingLeft: 15,
    // top: 160
  },
  backButton: {
    flexDirection: "row",
    marginVertical: 30,
    width: 50,
    height: 50,
    borderRadius: 20,
    borderColor: "#1B1811",
    borderWidth: 1,
    marginHorizontal: 30,
  },
  shippingFooter: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginVertical: 20,
  },
  body: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    top: 88,
  },
});

export { globalStyles };
