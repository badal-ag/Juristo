import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from './Loading'

let customFonts = {
  poppins_semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  Mova_regular: require("../assets/fonts/mova_regular.otf"),
};

let questions;
const Quiz = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([
    {
      question: "hello",
      options: ["hello", "hello", "hello", "hello"],
      answer: "hello",
    },
  ]);

  const [answerStatus, setAnswerStatus] = useState(
    Array(questions.length).fill(null)
  );

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (loading) return;

    setLoading(true);
    const getQuiz = async () => {
      const quizRef = collection(firestore, "quiz");
      const quizSnapshot = await getDocs(
        query(quizRef, orderBy("question"), limit(10))
      );
      const questionsData = quizSnapshot.docs.map((doc) => {
        const data = doc.data();
        const options = [
          data.option1,
          data.option2,
          data.option3,
          data.option4,
        ];
        return {
          question: data.question,
          options,
          answer: data.correctOption,
        };
      });
      setQuestions(questionsData.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };

    getQuiz();
  }, []);
  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  useEffect(() => {
    loadFontsAsync();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  const getUid = async () => {
    const uid = await AsyncStorage.getItem("uid");
    setUid(uid);
  };
  getUid();

  const handleAnswerSelected = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";
    setAnswerStatus(newAnswerStatus);
    setSelectedAnswer(selectedOption);
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const uploadQuiz = async () => {
    

    await addDoc(collection(firestore, "users", uid, "attended"), {
      question: questions,
      score: correctAnswers,
      timestamp: serverTimestamp(),
    });

   
    navigation.navigate("Summary", {
      score: correctAnswers,
      wrong: incorrectAnswers,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.profile}
        locations={[0, 1]}
        colors={["#30d5c8", "#043935"]}
      >
        {loading ? (
          <Loading/>
        ) : (
          <View>
            <View className="flex flex-row ml-8 mt-2">
              <Text
                style={{ fontFamily: "Mova_regular" }}
                className="text-5xl "
              >
                Juristo
              </Text>
            </View>
            <View className="bg-white rounded-lg shadow-md p-4 ml-5 mr-5 mt-5">
              <Text
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Question {currentQuestionIndex + 1}:
              </Text>
              <Text
                className="text-gray-700 mb-2 text-lg px-2 "
                style={{ fontFamily: "poppins_semibold" }}
              >
                {questions[currentQuestionIndex].question}
              </Text>
              <View className="flex flex-col space-y-2">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`bg-teal-200 text-gray-800 rounded-lg py-2 px-4 h-16 justify-center ${
                        answerStatus[currentQuestionIndex] === "correct" &&
                        questions[currentQuestionIndex].answer === option
                          ? "bg-green-400"
                          : answerStatus[currentQuestionIndex] ===
                              "incorrect" &&
                            questions[currentQuestionIndex].answer === option
                          ? "bg-green-400"
                          : answerStatus[currentQuestionIndex] ===
                              "incorrect" && selectedAnswer === option
                          ? "bg-red-300"
                          : ""
                      }`}
                      onPress={() => handleAnswerSelected(option)}
                    >
                      <Text style={{ fontFamily: "poppins_semibold" }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
              {}
              <View className="flex flex-row justify-between ">
                {!isLastQuestion && (
                  <TouchableOpacity
                    className={`bg-black rounded-lg py-2 px-4 mt-4 h-12 w-20 ${
                      currentQuestionIndex === 0
                        ? "opacity-50 cursor-default"
                        : ""
                    }`}
                    onPress={handleBack}
                    disabled={currentQuestionIndex === 0}
                  >
                    <Text
                      className="text-white text-lg"
                      style={{
                        fontFamily: "poppins_semibold",
                        textAlign: "center",
                      }}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
                )}
                {!isLastQuestion && (
                  <TouchableOpacity
                    className={`bg-black rounded-lg py-2 px-4 mt-4 h-12 w-20 ${
                      currentQuestionIndex === questions.length - 1
                        ? "opacity-50 cursor-default"
                        : ""
                    }`}
                    onPress={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    <Text
                      className="text-white text-lg"
                      style={{
                        fontFamily: "poppins_semibold",
                        textAlign: "center",
                      }}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                )}
                {isLastQuestion && (
                  <View>
                    <TouchableOpacity
                      onPress={() => uploadQuiz()}
                      className={`bg-black rounded-lg py-2 px-4 mt-6 ml-20 h-12 w-35  "
              `}
                    >
                      <Text
                        className="text-white text-lg"
                        style={{
                          fontFamily: "poppins_semibold",
                          textAlign: "center",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    height: 640,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});
