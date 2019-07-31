import { Quiz } from '../data/quiz';
import { AsyncStorage } from 'react-native';

export function QuizService() {
    this.quiz = Quiz;

    this.getQuiz = (no) => {
        //debugger;
        for(i=0; i < this.quiz.length; i++){
            if(this.quiz[i]["no"] == no){
                return this.quiz[i];
            }
        }
        return null;
    }

    this.getNextQuiz = (callback) => {
        this.retrieveQuizNo((quizNo)=>{
            var quiz = this.getQuiz(quizNo);
            return callback(quiz);
        });
    }

    this.recordNextQuiz = (quizNo) => {
        var quizNoInt = parseInt(quizNo) + 1;
        this.storeQuizNo(quizNoInt.toString());
    }

    this.storeQuizNo = async (no) => {
        try {
            await AsyncStorage.setItem('quizNo', no);
        } catch (error) {
            console.log(error);
        }
    }

    this.retrieveQuizNo = async (callback) => {
        try {
            //debugger;
            var quizNo = await AsyncStorage.getItem('quizNo');
            if (quizNo === null) {
                quizNo = "1"
                this.storeQuizNo(quizNo);
            }
            console.log(quizNo);
            callback(quizNo);
        } catch (error) {
            console.log(error);
        }
    }
}