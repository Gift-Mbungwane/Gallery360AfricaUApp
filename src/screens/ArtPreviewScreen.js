import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { firestore, auth } from "../../Firebase";
import { doc, serverTimestamp } from 'firebase/firestore'
import { globalStyles } from "../assets/styles/GlobalStyles";
// import { AntDesign, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import CommentsModal from "../assets/components/CommentsModal";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import LoaderImage from "../assets/components/LoaderImage";
import { Alert } from "react-native";
import TransparentHeaderView from "../components/TransparentHeaderView";
import { ActionButton, ArtDetails, ArtInfoCard, ArtistArtworksCard, ArtworkImageSlider, UserActivityCard, ViewAll } from "../components";
import { Cart, Checkmark } from "../components/icons";
import { UserContext } from "../Context/UserContext";
import { ReviewSection } from "../components/sections";
import { UserDetails } from "../Context/UserDetailsContext";
import { formatDate, getDate } from "../utils/helper-functions";

// import Toast from "react-native-simple-toast";
// line 141 (image is a string) and 146 (catch block)
export default function ArtPreviewScreen({ route, navigation }) {
  console.log({ route, navigation });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([])
  const [likes, setLikes] = useState([])
  const [userLikes, setUserLikes] = useState(false)
  const [artworkLikes, setArtworkLikes] = useState([])
  const [userLikesArtwork, setUserLikesArtwork] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState("");
  const [image, setImage] = useState("");
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [artistDescription, setArtistDescription] = useState("");
  // const [artistName, setArtistName] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [artType, setArtType] = useState("");
  const [price, setPrice] = useState(0);
  const [displayContent, setDisplayContent] = useState(true);
  const [artName, setArtName] = useState("");
  const [artSize, setArtSize] = useState("");
  const [description, setDescription] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [itemOnCart, setItemOnCart] = useState(false)
  const [defaultImg] = useState('https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.comC/O%20https://placeholder.com/')
  const [artHeight, setArtHeight] = useState(400);
  const [artWidth, setArtWidth] = useState(400);

  // new design details
  const [artDetails, setArtDetails] = useState({ price: null, description: null, dimensions: null, artName: '', imgUrls: [] })
  const [artworks, setArtworks] = useState([])
  // console.log({ ...route.params });
  const { artistUid, imageUID, photoUrl, artistName } = route.params;

  const { user: { uid } } = useContext(UserContext)
  const { fullName } = useContext(UserDetails)
  // const [Data] = useState([{ photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }])
  useEffect(() => {
    console.log({ artistUid, imageUID, photoUrl });
    getArtDetails();
    getArt()
    getArtistData()
    getReviews()
    console.log({ fullName });
  }, [route])

  useEffect(() => {

  }, [])

  const getArt = async () => {
    // console.log(`artist ID : ${artistUid}s`);
    console.log('running art getter');
    firestore
      .collection("Market")
      .where("artistUid", "==", artistUid)
      .where("isEnabled", "==", true)
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let allArt = snapShot.docs.map((docSnap) => ({
            isArt: true,
            ...docSnap.data(),
            imageUid: docSnap.id,
            artUrl: docSnap.data().imgUrls[0].imgUrl,
            artName: docSnap.data().title
          }));
          // console.log('all art: ', allArt);
          // if (allArt.length > 0) {
          //   setArt([...allArt, { isArt: false, ImageUid: null }]);
          // }
          console.log({ allArt });
          setArtworks(allArt)
        }


      });
  };
  useEffect(() => {
    try {
      (async () => {
        await Image.getSize(artUrl, (width, height) => {
          // console.log({ width, height });
          const screenWidth = Dimensions.get('window').width;
          // const screenHeight = Dimensions.get('window').height;
          const scaleFactor = width / screenWidth;
          const imgHeight = height / scaleFactor;
          const imgWidth = width / scaleFactor;
          setArtHeight(imgHeight)
          setArtWidth(imgWidth)
        })
      })
    } catch (error) {
      setArtHeight(400);
      setArtWidth(Dimensions.get('window').width)
    }

  }, [artUrl])
  const getArtistDetailts = () => {
    firestore
      .collection("Artists")
      .doc(artistUid)
      .onSnapshot((snapShot) => {
        if (snapShot.exists) {
          const photo = snapShot.data().photoUrl;
          const name = snapShot.data().artistName;
          const descriptionOfArtist = snapShot.data().description;
          setArtistDescription(descriptionOfArtist);
          setArtistName(name);
          setArtistPhoto(photo);
          console.log({ descriptionOfArtist, name, photo });
        } else {
          console.log('no data found for artist ID: ', artistUid);
        }

      });
  };

  const getArtDetails = () => {
    if (!imageUID) return
    firestore
      .collection("Market")
      .doc(imageUID)
      .onSnapshot((snapShot) => {
        if (snapShot.exists) {
          console.log({ data: snapShot.data() });
          const data = snapShot.data()
          console.log({ data : data.ratings });
          // const hasReviewed = data.ratings.reviewers.includes(uid) 
          // console.log({ hasReviewedInGetter: hasReviewed });
          const likes = snapShot.data().likes ?? []
          setUserLikesArtwork(likes.includes(uid))
          setArtworkLikes(likes)
          setArtDetails({
            ...snapShot.data(),
            imageUid: snapShot.id,
            images: snapShot.data().imgUrls.map(item => item.imgUrl)
          })
          return
          const artTypes = snapShot.data().artType;
          setArtType(artTypes);
          const prices = snapShot.data().price;
          setPrice(prices);
          const artUrls = snapShot.data().artUrl;
          setArtUrl(artUrls);
          const artSizes = snapShot.data().artSize;
          setArtSize(artSizes);
          const artNames = snapShot.data().artName;
          setArtName(artNames);
          const descriptions = snapShot.data().description;
          setDescription(descriptions);
        }
      });
  };
  useEffect(() => {
    console.log({ artDetailsInPreview: artDetails });
    console.log({ artDetailsImages: artDetails.images });
  }, [artDetails])
  const addToCart = async () => {
    // console.log('adding to cart');
    // return
    // const uid = auth.currentUser.uid;
    console.log({ imageUID });
    // return
    if (!imageUID) return
    console.log({ artDetails });
    // return
    await firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .doc(imageUID)
      .set({
        artUrl: artDetails.images[0],
        artType: artDetails.artworkType,
        price: artDetails.price,
        uid: uid,
        artistUid: artistUid,
        imageUid: imageUID,
      })
      .then((snapShot) => {
        setItemOnCart(true)
        // Toast.show(
        //   "Your item has been added to cart",
        //   Toast.LONG,
        //   Toast.CENTER
        // );
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };
  const removeFromCart = async () => {
    // const uid = auth.currentUser.uid;
    try {
      console.log({ imageUID });
      // return
      if (!imageUID) return
      await firestore.collection('cartItem').doc(uid).collection('items').doc(imageUID).delete().then((res) => {
        // console.log(res);
        setItemOnCart(false)
      })
    } catch (error) {
      console.log();
    }

  }

  const getArtistData = () => {
    console.log('fetching user data');
    console.log('data: ', artistUid)
    firestore.collection('Artists').doc(artistUid).onSnapshot(doc => {
      console.log('data changed');
      if (doc.exists) {
        console.log({ artistData: doc.data() });
        // console.log('data exists')
        const artistLikes = doc.data().likes
        // setNumberOfLikes(artistLikes.length || 0)
        setLikes(artistLikes || [])
        if (artistLikes && artistLikes.length > 0) {
          const liked = artistLikes.includes(uid)
          setUserLikes(liked)
        } else {
          setUserLikes(false)
        }
        const followers = doc.data().followers
        console.log({ followers, uid });
        const likeArr = doc.data().user

        if (followers && followers.length > 0) {
          let isFollowing = followers.includes(uid)
          console.log({ isFollowing });
          setFollowers(followers)
          setIsFollowing(isFollowing)
        } else {
          console.log('artist has no followers');
          setIsFollowing(false)
          console.log({ follows: isFollowing });
        }
      } else {
        // console.log('data does not exist')
      }
      // console.log(doc.data())
    })
  }
  const updateArtist = (obj) => {
    try {
      firestore.collection('Artists').doc(artistUid.trim()).update(obj)
    } catch (error) {
      console.log({ error });
    }

  }
  const updateArtwork = (obj) => {
    try {
      firestore.collection('Market').doc(imageUID.trim()).update(obj)
    } catch (error) {
      console.log({ error });
    }

  }
  const updateLikes = () => {
    let likeArr = []
    if (userLikes) {
      console.log({ current: likes });
      likeArr = likes.filter(item => !item === uid)
    } else {
      if (likes.includes(uid)) {
        likeArr = likes
      } else {
        likeArr = [...likes, uid]
      }
    }
    console.log({ likeArr });
    setUserLikes(likeArr.includes(uid))
    updateArtist({ likes: likeArr })
  }
  const updateArtworkLikes = () => {
    // console.log('updating likes');
    // return
    let likeArr = []
    if (userLikesArtwork) {
      console.log({ current: artworkLikes });
      likeArr = artworkLikes.filter(item => !item === uid)
    } else {
      if (artworkLikes.includes(uid)) {
        likeArr = artworkLikes
      } else {
        likeArr = [...artworkLikes, uid]
      }
    }
    console.log({ likeArr });
    setUserLikesArtwork(likeArr.includes(uid))
    setArtworkLikes(likeArr.length)
    updateArtwork({ likes: likeArr })
  }
  const updateFollowing = () => {
    let followersArr = []
    console.log({ uidInUpdate: uid });
    if (isFollowing) {
      followersArr = followers.filter(item => !item === uid)
    } else {
      if (followers.includes(uid)) { // just in place to force consistency between the different states, it hasn't been consistent
        followersArr = followers
      } else {
        followersArr = [...followers, uid]
      }
    }
    console.log({ followersArr });
    console.log({ isFollowing: 'true' });
    setIsFollowing(followersArr.includes(uid))
    updateArtist({ followers: followersArr })
  }

  useEffect(() => {
    console.log({ isFollowing });
  }, [isFollowing])
  const disableObjects = async () => {
    setTimeout(() => {
      setDisplayContent(!displayContent);
    }, 250);
  };
  const updateState = async (item, imageUID) => {
    console.log({ item, imageUID });
    navigation.navigate('ArtPreview', { artistUid, imageUID: item.imageUid, photoUrl, artistName })
  }
  const getReviews = () => {
    if (!imageUID) return
    firestore
      .collection("Market")
      .doc(imageUID)
      .collection('reviews')
      .onSnapshot(async(snapShot) => {
        if(snapShot.size > 0) {
          let reviews = await Promise.all(
            snapShot.docs.map(async doc => {
              return {
                ...doc.data(),
                id: doc.id,
                date: formatDate(getDate(doc.data().timeStamp)), 
                ...await getUserData(doc.id)
              }
            })
          )
          console.log({ reviewsInMarket: reviews });
          setReviews(reviews)
        } else {
          console.log({ snapShot: snapShot.size, reviews: reviews});
          if(reviews.length > 0) {
            setReviews([])
          }
        }
      });
  }

  const getUserData = async(userUid) => {
    return firestore.collection('users').doc(userUid).get().then(doc => {
      console.log({ doc: doc.data() });
      return {
        ...doc.data(),
        username: doc.data().fullName
      }
    })
  }
  useEffect(() => {
    if (artworks.length > 0) {
      console.log({ art: artworks[0].imageUid });
    }
  }, [artworks])
  const handleReviewSubmit = (rating, review) => {
    setReviewSubmitLoading(true)
    console.log({ rating, review });
    console.log('in art preview');
    if (!imageUID) return
    firestore
      .collection("Market")
      .doc(imageUID)
      .collection('reviews')
      .doc(uid)
      .set({
        rating: Number(rating),
        review: review.trim(),
        timeStamp: serverTimestamp()
      }).then(res => {
        const sumOfRatings = artDetails.ratings?.sumOfRatings ?? 0
        const numOfReviews = artDetails.ratings?.total ?? 0
        const newSum = sumOfRatings + rating
        const newNumOfRatings = numOfReviews + 1
        const avg = Number(newSum) / Number(newNumOfRatings)
        let currentRatings = artDetails.ratings ? artDetails.ratings : ({
          stars: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
          }
        })
        // let reviewers = artDetails.reviews ? artDetails
        const newRatings = {
          averateRating: avg,
          ratings: {
            sumOfRatings: newSum,
            total: newNumOfRatings,
            reviewers: artDetails.ratings?.reviewers ? [...artDetails.ratings.reviewers, uid] : [uid], 
            stars: {
              ...currentRatings.stars,
              [rating] : currentRatings.stars[rating] + 1
            } 
          }
        }
        console.log({ newRatings });
        console.log({ stars: newRatings.ratings.stars });
        console.log({ reviewers: newRatings.ratings.reviewers });
        // return
        firestore
          .collection('Market')
          .doc(imageUID)
          .update({
            ...newRatings
          }).then(res => {
            setReviewSubmitLoading(false)
            setShowCommentInput(false)
          })
      })
  }
  // return null
  return (
    <TransparentHeaderView padding={0}>
      <ScrollView >
        <ArtworkImageSlider imagesArr={artDetails.images || null} />
        <View style={{ paddingHorizontal: 15, gap: 10 }}>
          <ArtDetails price={artDetails.price} description={artDetails.statement} artName={artDetails.title} />
          <ArtInfoCard condition={artDetails.condition} available={artDetails.isAvailable} dimensions={artDetails.dimensions} />
          <ActionButton
            icon={itemOnCart ? <Checkmark size={24} /> : <Cart size={24} />}
            text={itemOnCart ? 'Added to cart' : 'Add to Cart'}
            disabled={!!itemOnCart}
            onPress={() => { itemOnCart ? removeFromCart() : addToCart() }}
            style={{ marginBottom: 20 }}
          />
          <UserActivityCard
            updateFollowing={updateFollowing}
            artistName={artistName}
            isFollowing={isFollowing}
            updateLikes={updateArtworkLikes}
            likes={artworkLikes.length}
            userLikes={userLikesArtwork}
            messages={reviews.length}
            artistPhoto={photoUrl}
            toggleShowReviews={() => setShowReviews(showReviews => !showReviews)}
            viewArtist={() => navigation.navigate('ArtistProfile', { artistUid, photoUrl, artistName })}
          />
          <ReviewSection
            enabled={showReviews}
            ratings={artDetails.ratings ?? null}
            reviews={ reviews }
            fullName={fullName}
            uid={uid}
            showCommentInput={showCommentInput}
            setShowCommentInput={(bln) => setShowCommentInput(bln)}
            averateRating={artDetails.averateRating ?? 0.0}
            // reviews={art}
            onReviewSubmit={handleReviewSubmit}
            submitLoading={reviewSubmitLoading}
            hasReviewed={artDetails.ratings?.reviewers?.includes(uid) ? true : false }
          />
          <View style={{ padding: 0 }}>
            <View style={styles.moreArtHeader}>
              <Text style={styles.text}>
                More from {artistName}
              </Text>
              <ViewAll onPress={() => navigation.navigate('PreviewMore', { artistUid })} />
            </View>
            {
              artworks && artworks.length > 0 ? (
                <View
                  style={{ width: Dimensions.get('window').width, left: -15, paddingHorizontal: 20, overflow: 'visible' }}
                >
                  <FlatList
                    horizontal
                    style={{ width: '100%', paddingHorizontal: 0, paddingVertical: 10, gap: 8, overflow: 'visible' }}
                    // numColumns={2}
                    scrollEnabled
                    columnWrapperStyle={styles.columnWrapper}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    data={artworks}
                    renderItem={({ item }) => (
                      <ArtistArtworksCard
                        imageUID={item.imageUid}
                        onPress={(imageUID) => updateState(item, imageUID)}
                        showPrice={true}
                        artistName={artistName}
                        artName={item.title}
                        artUri={item.artUrl}
                        artistPic={photoUrl}
                        price={item.price}
                      />
                    )}
                    keyExtractor={item => item.imageUid}
                  />
                </View>

              ) : (
                <View>
                  <Text>No more artwork</Text>
                </View>
              )
            }
          </View>
        </View>

      </ScrollView>
    </TransparentHeaderView>
  )

}


const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 : 0
// const navBarHeight
const styles = StyleSheet.create({
  container: {
    width: "100%", height: Dimensions.get('window').height, overflow: 'hidden',
    // paddingTop: statusBarHeight,
    // top: statusBarHeight
    flex: 1,
    alignSelf: 'center',
    // backgroundColor: 'red'
  },
  tikTokView: {
    height: Dimensions.get('window').height
  },
  moreArtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingHori,
    // backgroundColor: 'blue'
  }

});
