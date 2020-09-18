import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

// Components
import {
  CourseSection,
  Courses,
  ActivityIndicatorLoading,
  TopicList,
  Loading,
  LoadingAnimation
} from '../../../Components'

// Actions
import * as topicsActions from '../../../Store/Actions/Topics'

// Functions
import {alertError} from '../../../Functions/alertFunction'

// Styles
import { Metrics, ImagesStudy as Images, ImagesGame } from '../../../Themes'
import * as coursesActions from '../../../Store/Actions/Course'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f5'
  }
})


const CourseScreen = (props) => {
  const topics = useSelector(state => state.topics.topics)
  const courses = useSelector(state => state.courses.courses)
  const { fetchingTopics, errorFetchingTopics} = useSelector(state => ({
    fetchingTopics: state.topics.fetchingTopics,
    errorFetchingTopics: state.topics.errorFetchingTopics
  }));
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(coursesActions.getCoursesLatest())
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    getCourses().then(() => {})

    const getTopics = async () => await dispatch(topicsActions.getTopics())
    getTopics().then(() => () => {})
  }, [])

  useEffect(() => {
    if (!fetchingTopics && errorFetchingTopics) {
      alertError(null, errorFetchingTopics)
    }
  }, [fetchingTopics, errorFetchingTopics])

    return (
      <View style={styles.container}>
        {
          (!isLoading && !fetchingTopics && topics)
            ? (
              <ScrollView>
                <Hero>
                  <Background source={Images.background12}/>
                  <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
                    style={{position: 'absolute', width: Metrics.screenWidth, height: 460}}
                  />
                  <Logo resizeMode={'contain'} source={Images.logoKanji}/>
                  <Caption>{topics.length} Topics</Caption>
                  <Title>{'ろしくお願いします'}</Title>
                  <Sections>
                    <SectionScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {sections.map((section, index) => (
                        <CourseSection
                          key={index}
                          title={section.title}
                          image={section.image}
                          progress={section.progress}
                        />
                      ))}
                    </SectionScrollView>
                  </Sections>
                  {/*<Author>*/}
                  {/*  <Avatar source={Images.avatar}/>*/}
                  {/*  <Name>Taught by Soren</Name>*/}
                  {/*</Author>*/}
                </Hero>
                <Subtitle>Latest Courses</Subtitle>
                <TopicList topics={topics} navigation={props.navigation}/>
                {/*<Courses />*/}
              </ScrollView>
            ) : <ActivityIndicatorLoading/>
        }
      </View>
    );
}

CourseScreen.navigationOptions = { title: "Courses", header: null };

export default CourseScreen;

const Container = styled.View`
  background: #f0f3f5;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Hero = styled.View`
  height: 460px;
  background: #3c4560;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Metrics.screenWidth};
  height: 460px;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 50px;
  margin-left: 20px;
  align-self: center;
`;

const Caption = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: #b8bece;
  margin-top: 20px;
  margin-left: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-left: 20px;
  width: 220px;
`;

const Sections = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const SectionScrollView = styled.ScrollView`
  padding: 10px 0;
`;

const Author = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  margin-left: 20px;
`;

const Avatar = styled.Image`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background: white;
`;

const Name = styled.Text`
  margin-left: 8px;
  color: #b8bece;
`;

const Subtitle = styled.Text`
  font-size: 15;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
  margin: 20px 0 0 20px;
`;

const sections = [
  {
    title: "はじめまして。私はアンナです。",
    progress: 0.2,
    image: require("../../../../assets/background1.jpg")
  },
  {
    title: "お母さん、ここにゴミを捨ててもいいですか",
    progress: 0.3,
    image: require("../../../../assets/background2.jpg")
  },
  {
    title: "めまして。私はアンナで",
    progress: 0.9,
    image: require("../../../../assets/background3.jpg")
  },
  {
    title: "にゴミを捨ててもいいで",
    progress: 0.5,
    image: require("../../../../assets/background4.jpg")
  },
  {
    title: "ここにゴミを捨ててもいいで",
    progress: 0.1,
    image: require("../../../../assets/background6.jpg")
  }
];
