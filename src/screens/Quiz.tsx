import { RouteProp } from "@react-navigation/native";
import { VStack, Text } from "native-base";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { RootScreenParamList } from "..";
import Masthead from "../components/masthead";
import Navbar from "../components/navbar";
import { useStateContext } from "../context";
import { fetchQuiz } from "../context/actions/quiz.actions";

type Props = {
  route?: RouteProp<RootScreenParamList, "Quiz">;
};

export default function Quiz(props: Props) {
  const section = props.route?.params?.section;
  const isAll = props.route?.params?.isAll;

  const offset = useRef(new Animated.Value(0)).current;
  const { dispatch } = useStateContext();

  useEffect(() => {
    if (section) dispatch(fetchQuiz({
      filter: {
        library_id: section,
      }
    }));
  }, [section]);

  return (
    <VStack>
      <Masthead
        image={require("../../assets/images/trajectory-education.png")}
        title="Quiz"
        animatedValue={offset}
      >
        <Navbar />
      </Masthead>
      <Text mt={320}>Quiz Section {section} {isAll ? "isAll" : "for section"}</Text>
    </VStack>
  );
};
