import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ProfileLanguage } from "../types/ProfileTypes";
import Achievement from "./Achievement";
import { useAuth } from "./contexts/username";
import { GameResult } from "../types/GameResusltsType";
import { ScreenContainer } from "./ScreenContainer";
import { colors, fonts, spacing } from "../theme";

const backgroundUI = {
  background: require("../assets/Background4.png"),
  moutain: require("../assets/Background2.png"),

  cloud1: require("../assets/Cloud1.png"),
  cloud2: require("../assets/Cloud2.png"),
  cloud3: require("../assets/Cloud3.png"),
  cloud4: require("../assets/Cloud4.png"),
};

//Want username, avatar url, and bio and also the data in the array below, for a specific user
const testLanguageData: Array<ProfileLanguage> = [
  {
    language: "French",
    numOfBeginnerWords: 0,
    numOfIntermediateWords: 0,
    numOfMasterWords: 0,
  },
  {
    language: "German",
    numOfBeginnerWords: 5,
    numOfIntermediateWords: 3,
    numOfMasterWords: 7,
  },
  {
    language: "Spanish",
    numOfBeginnerWords: 0,
    numOfIntermediateWords: 0,
    numOfMasterWords: 0,
  },
];

const userProfile = {
  name: "Put your name here",
  username: "Put your username here",
  bio: "Tell us about yourself, partner.",
  avatar_url: "Pick an avatar from below",
};

const image1 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1OS5wbmc=/794x1000/hnUX4e.png";
const image2 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1Ny5wbmc=/794x1000/VX87t1.png";
const image3 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ2Mi5wbmc=/794x1000/TvwatB.png";

function LanguageCard({
  language,
  numOfBeginnerWords,
  numOfIntermediateWords,
  numOfMasterWords,
}: ProfileLanguage) {
  const languageBackground = styles[`${language}`];
  return (
    <View style={[styles.card, languageBackground]}>
      <Text style={styles.textHeader}>{language}</Text>
      <Text style={styles.langText}>Beginner: {numOfBeginnerWords}</Text>
      <Text style={styles.langText}>
        Intermediate: {numOfIntermediateWords}
      </Text>
      <Text style={styles.langText}>Master: {numOfMasterWords}</Text>
    </View>
  );
}
function StatsCard({
  room_id,
  match_date,
  language,
  winner,
  loser,
  english_wordlist,
  non_english_wordlist,
  winner_correct_answers,
  loser_correct_answers,
}: GameResult) {
  return (
    <View style={styles.statsCard}>
      <Text style={styles.gameNo}>
        Game at {`${match_date.slice(0, 10)} ${match_date.slice(11, 16)}`}
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.statsText}>Language: {language}</Text>
        <Text style={styles.statsText}>Wins: {winner}</Text>
        <Text style={styles.statsText}>Losses: {loser}</Text>
        <Text style={styles.statsText}>
          English Words: {english_wordlist.join(", ")}
        </Text>
        <Text style={styles.statsText}>
          Non-English Words: {non_english_wordlist.join(", ")}
        </Text>
        <Text style={styles.statsText}>
          Correct Words: {winner_correct_answers.join(", ")}
        </Text>
        <Text style={styles.statsText}>
          Opponent's Correct Words: {loser_correct_answers.join(", ")}
        </Text>
      </View>
    </View>
  );
}
//Want the achievement data for a given user
const testAchievementData: [string, boolean][] = [
  ["5 words mastered!", true],
  ["10 words mastered!", false],
];

export default function Profile() {
  const { user } = useAuth();
  //   const getUserId = () => {
  //     return axios
  //       .get(
  //         `      https://wordslingerserver.onrender.com/api/users/${user}
  // `
  //       )
  //       .then(({ data }) => {
  //         return data.user[0];
  //       });
  //   };

  // const getUser = () => {
  //   const user_id = getUserId();
  //   console.log(user_id);
  //   return axios
  //     .get(`      https://wordslingerserver.onrender.com/api/users/${user_id}`)
  //     .then((result) => {
  //       return result;
  //     });
  // };

  // const userInfo = getUser();
  // console.log(userInfo);

  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchGameResults = () => {
      axios
        .get("https://wordslingerserver.onrender.com/api/games/1")
        .then((response) => {
          console.log(response);

          setGameResults(response.data.game);
          setIsLoading(false);
        });
    };

    fetchGameResults();
  }, []);
  const safeGameResults = Array.isArray(gameResults) ? gameResults : [];
  console.log(safeGameResults);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.avatarCard}>
          <Image
            style={styles.tinyProfilePic}
            source={{
              uri: "url",
            }}
            alt="Profile picture"
          />
          <Text>{userProfile.username}</Text>
        </View>
        <View style={styles.bioCard}>
          <Text>{userProfile.bio}</Text>
        </View>

        {testLanguageData.map(
          ({
            language,
            numOfBeginnerWords,
            numOfIntermediateWords,
            numOfMasterWords,
          }) => {
            return (
              <LanguageCard
                language={language}
                numOfBeginnerWords={numOfBeginnerWords}
                numOfIntermediateWords={numOfIntermediateWords}
                numOfMasterWords={numOfMasterWords}
                key={language}
              ></LanguageCard>
            );
          }
        )}
        <View style={styles.achievementsCard}>
          <Text style={styles.textHeader}>Achievements</Text>

          <View style={styles.achievementsContainer}>
            {testAchievementData.map(([achievementName, isUnlocked]) => {
              return (
                <Achievement
                  achievementName={achievementName}
                  isUnlocked={isUnlocked}
                ></Achievement>
              );
            })}
          </View>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>Game History</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            safeGameResults.map(
              ({
                room_id,
                match_date,
                language,
                winner,
                loser,
                english_wordlist,
                non_english_wordlist,
                winner_correct_answers,
                loser_correct_answers,
              }) => (
                <StatsCard
                  room_id={room_id.slice(10)}
                  match_date={match_date}
                  language={language}
                  winner={winner}
                  loser={loser}
                  english_wordlist={english_wordlist}
                  non_english_wordlist={non_english_wordlist}
                  winner_correct_answers={winner_correct_answers}
                  loser_correct_answers={loser_correct_answers}
                  key={room_id}
                ></StatsCard>
              )
            )
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    margin: spacing.lg,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
    // backgroundColor: "rgba(245, 222, 179, 0.85)",
  },

  scrollViewContainer: {
    backgroundColor: "transparent",
  },

  avatarCard: {
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
    width: "100%",
  },
  bioCard: {
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.lg,
    width: "100%",
  },
  card: {
    width: "100%",
    marginBottom: spacing.lg,
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.text,
    borderWidth: 3,
    padding: spacing.md,
  },
  French: {
    backgroundColor: colors.primary, // Saddle Brown
  },
  Spanish: {
    backgroundColor: colors.secondary, // Tan
  },
  German: {
    backgroundColor: colors.accent, // Firebrick Red
  },
  textHeader: {
    fontFamily: fonts.heading,
    color: colors.background,
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  langText: {
    fontFamily: fonts.body,
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    backgroundColor: colors.background,
    marginVertical: spacing.xs,
    textAlign: "center",
    borderRadius: 10,
    padding: spacing.sm,
  },
  tinyProfilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.sm,
  },
  stats: {
    width: "100%",
    marginBottom: spacing.lg,
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.text,
    borderWidth: 3,
    padding: spacing.md,
    backgroundColor: colors.secondary,
  },
  statsHeader: {
    fontFamily: fonts.heading,
    color: colors.text,
    fontSize: 24,
    marginBottom: spacing.md,
  },
  statsCard: {
    marginVertical: spacing.sm,
    alignItems: "center",
    width: "100%",
  },
  gameNo: {
    fontFamily: fonts.heading,
    color: colors.text,
    fontSize: 24,
  },
  statsText: {
    fontFamily: fonts.body,
    color: colors.text,
    fontSize: 20,
    marginVertical: spacing.xs,
    textAlign: "center",
  },
  textContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: spacing.md,
    width: "100%",
  },
  achievementsCard: {
    width: "100%",
    marginBottom: spacing.lg,
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.text,
    borderWidth: 3,
    padding: spacing.md,
    backgroundColor: colors.secondary,
  },
  achievementsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  errorText: {
    marginTop: spacing.md,
    color: colors.accent,
    fontFamily: fonts.body,
    fontWeight: "bold",
  },
  mountain: {
    position: "absolute",
    bottom: 0,
    width: "110%",
    height: "60%", // Adjust as needed
    left: "-5%",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "grey",
//     marginBlockEnd: 10,
//   },
//   avatarCard: { marginBlock: 8, alignItems: "center" },
//   bioCard: { marginBlock: 8, alignItems: "center" },
//   card: {
//     width: Dimensions.get("screen").width,
//     height: "auto",
//     marginBlockEnd: 10,
//     alignItems: "center",
//     borderRadius: 10,
//     borderColor: "black",
//     borderWidth: 2,
//   },
//   French: {
//     backgroundColor: "#000091",
//   },
//   Spanish: {
//     backgroundColor: "#FFCC00",
//   },
//   German: {
//     backgroundColor: "#AA151B",
//   },
//   textHeader: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   langText: {
//     color: "black",
//     fontSize: 20,
//     fontWeight: "bold",
//     width: Dimensions.get("screen").width - 50,
//     backgroundColor: "white",
//     marginBlock: 10,
//     textAlign: "center",
//     borderRadius: 10,
//     height: "20%",
//   },
//   tinyProfilePic: {
//     width: 100,
//     height: 100,
//     borderRadius: 50 / 2,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "black",
//   },
//   stats: {
//     width: Dimensions.get("screen").width,
//     height: "auto",
//     marginBlockEnd: 10,
//     alignItems: "center",
//     borderRadius: 10,
//     borderColor: "black",
//     borderWidth: 2,
//   },
//   statsHeader: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   statsCard: { marginBlock: 8, alignItems: "center" },
//   gameNo: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   statsText: {
//     color: "black",
//     fontSize: 20,
//     fontWeight: "bold",
//     width: Dimensions.get("screen").width - 50,
//     // backgroundColor: "white",
//     marginBlock: 10,
//     textAlign: "center",
//     // borderRadius: 10,
//     height: "20%",
//   },
//   textContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//   },
// });

//   {
//     userId: "1",
//     gameNumber: 1,
//     result: "Loss",
//     wordsCorrect: "apple, banana",
//     wordsWrong: "plum, pencil, bread",
//   },
//   {
//     userId: "1",
//     gameNumber: 2,
//     result: "Win",
//     wordsCorrect: "apple, banana, bread",
//     wordsWrong: "plum, pencil",
//   },
//   {
//     userId: "1",
//     gameNumber: 3,
//     result: "Win",
//     wordsCorrect: "raspberry, family, potato, pencil",
//     wordsWrong: "plum",
//   },
// ];

{
  /* <View>
<Image
  source={require("../assets/tumbleweedtransparent.gif")}
  style={{
    width: "1000%",
    height: "1000%",
    alignSelf: "center",
    resizeMode: "contain",
  }}
/>
<Text style={styles.loadingText}>Loading...</Text>
</View> */
}
