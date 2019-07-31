import { MorseCharacters } from '../data/morse-characters';
import { MorseTimeRanges } from '../data/morse-time-ranges';
import { MorseTranslations } from '../data/morse-translations';

export function MorseService(){
    this.morseCharacters = MorseCharacters;
    this.morseTimeRanges = MorseTimeRanges;
    this.morseTranslations = MorseTranslations;

    this.tapStartTime = null;
    this.endTimer = null;
    this.currentMorseSymbol = "";

    this.startMorseRecognition = () => {
        //debugger;
        if(this.endTimer) {
            clearTimeout(this.endTimer);
        }
        this.tapStartTime = Date.now();
    }

    this.stopMorseRecognition = (callback) => {
        if(this.tapStartTime) {
            //debugger;
            var tapCode = this.getTapCode(this.tapStartTime, Date.now());
            this.currentMorseSymbol = this.currentMorseSymbol + tapCode;
            this.tapStartTime = null;
            this.endTimer = setTimeout(() => {
                //debugger;
                var alphaNum = this.translateMorseToAlphaNum(this.currentMorseSymbol);
                this.currentMorseSymbol = "";
                clearTimeout(this.endTimer);    
                callback(alphaNum);
            }, this.morseTimeRanges.maxPauseDuration);
        }
    }
   
    this.getTapCode = (tapStartTime, tapEndTime) => {
        var tapDuration = tapEndTime - tapStartTime;  
        return tapDuration > this.morseTimeRanges.shortMorse ? this.morseCharacters.longMorse : this.morseCharacters.shortMorse
    }

    this.translateMorseToAlphaNum = (morseSymbol) => {
        for (var i=0; i < this.morseTranslations.length; i++){
            //debugger;
            if (this.morseTranslations[i]["symbol"] == morseSymbol)
                return this.morseTranslations[i]["char"];
        }
    }
    
}
