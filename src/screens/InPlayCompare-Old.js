import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import Confetti from './elements/Confetti'
import InPlayHeader from './elements/InPlayHeader'
import { useNavigate } from 'react-router-dom'

import './InPlay.css'
import './PlayResult.css'

function InPlayCompare() {
  const navigate = useNavigate()

  const [currentLink, setCurrentLink] = useState('')
  const [originalAnswer, setOriginalAnswer] = useState(document.location.href.split('/')[document.location.href.split('/').length - 1].split(''))
  const [ matchResult, setMatchResult] = useState([])
  // auto copy the link
  const [copied, setCopied] = useState(false)

  // random background color
  const bgPick = Math.round(Math.random() * 4)
  const bgColorList = ['#CBDFFF', '#FCEC77', '#CDEBE5', '#FFE2E2', '#ffffff']
  const [bgColor, setBgColor] = useState(bgColorList[bgPick])
  
  // slide count out of 10
  const [slideCount, setSlideCount] = useState(1)
  // question list
  const questionList = ['Who is your wanna-be Hollywood Couple?', 'Kendall Jenner vs. Gigi Hadid', 'Who would you date?', 'Outfit you would like to wear on Met Gala', 'Which album cover design worth to put on a wall?', 'Which sneakers should be more displayed in a museum?', 'If I have to pick one sports to be disappeared', 'Who deserves more fame?', 'Which one is closer to your dream car?', 'If I have to eat only one of these for a month']
  // image link for comparison
  const [imgOne, setImgOne] = useState('https://picsum.photos/800/600?random=1')
  const [imgTwo, setImgTwo] = useState('https://picsum.photos/800/600?random=2')

  // confetti state
  const [showConfetti, setShowConfetti] = useState(false)
  // timer state & function
  const [timeLeft, setTimeLeft] = useState(10)
  const [displayTimeLeft, setDisplayTimeLeft] = useState('10')
  // timer countdown function
  useEffect(() => {

    // exit early when we reach 0
    if (!timeLeft) selectChoice({3: ''});

    // if slideCount is less than 10, run the timer
    // otherwise, stop
    if(slideCount <= 10){
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        setDisplayTimeLeft( timeLeft < 11 ? `0${timeLeft - 1}` : `${timeLeft}`)
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    } else {
      clearInterval()
    }
    setCurrentLink(myChoiceList.map(choice => Object.keys(choice)[0]).join(''))


    // Create a random id as a current link to share
    // var result           = '';
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var charactersLength = characters.length;
    // for ( var i = 0; i < 7; i++ ) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    // setCurrentLink(result)

  }, [timeLeft]);



  const [myChoiceList, setMyChoiceList] = useState([])
  const selectChoice = (choice) => {
    if(slideCount <= 10){
      // show confetti
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 500)
      // add selected choice to the state
      setMyChoiceList([...myChoiceList, choice])
      // set new background color
      setBgColor(bgColorList[Math.round(Math.random() * 4)])
      // set timer back to 10
      setTimeLeft(10)
      setDisplayTimeLeft('10')
      // count deck
      setSlideCount(slideCount + 1)
      // generate new image
      setImgOne(`https://picsum.photos/800/600?random=${slideCount + 2}`)
      setImgTwo(`https://picsum.photos/800/600?random=${slideCount + 5}`)
    } else {
      clearInterval()
      setTimeLeft(0)
    }
  }

  
  const copyLinkClicked = () => {
    setCopied(true)
    fadeOutTextCopied()
  }
  const fadeOutTextCopied = () => {
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  

  return (
    <div className="inPlayApp" style={{backgroundColor: `${bgColor}`}}>
      {showConfetti ? <Confetti /> : ""}
      <InPlayHeader count={slideCount} timeLeft={displayTimeLeft} />
      {slideCount > 10 ? 
      <div className="playResult__hero">
        <h1>Yeahee!</h1>
        <p>asdf</p>
      </div>
      : null }
      {slideCount > 10 ? 
        <div className="playResult">

          <div className={`playResultCompare__yourChoices`}>
            <p>Your Choices</p>
            <div className="playResult__yourChoicesContentWrapper">
              {originalAnswer.map((choice, index) => {
                if (choice && choice == 1){
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"black"}}>
                      <img src="https://picsum.photos/800/600?random=1" alt="" />
                      <p>40%</p>
                    </div>
                  )
                } else if(choice && choice == 2) {
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"red"}}>
                      <img src="https://picsum.photos/800/600?random=2" alt="" />
                      <p>40%</p>
                    </div>
                  )
                } else if(choice && choice == 3){
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"blue"}}>
                      <div className="playResult__emptyImg"></div>
                      <p>40%</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>


          <div className={`playResult__matchChoices`}>
            <p>Your Choices VS Your Friend's Choices</p>
            <div className="playResult__yourChoicesContentWrapper">
              {myChoiceList.map((choice, index) => {
                if (choice && Object.keys(choice)[0] == originalAnswer[index]){
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"green"}}>
                      <img src={Object.values(choice)[0]} alt="" />
                      <p>Match</p>
                    </div>
                  )
                } else if(choice && Object.keys(choice)[0] !== originalAnswer[index]) {
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"red"}}>
                      <div className="playResult__emptyImg"></div>
                      <p>Unmatch</p>
                    </div>
                  )
                } 
              })}
            </div>
          </div>
          
          <div className={`playResult__friendsChoices`}>
            <p>Friend's Choices</p>
            <div className="playResult__yourChoicesContentWrapper">
              {myChoiceList.map((choice, index) => {
                if (choice && Object.keys(choice)[0] == 1){
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"black"}}>
                      <img src={Object.values(choice)[0]} alt="" />
                      <p>40%</p>
                    </div>
                  )
                } else if(choice && Object.keys(choice)[0] == 2) {
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"red"}}>
                      <img src={Object.values(choice)[0]} alt="" />
                      <p>40%</p>
                    </div>
                  )
                } else {
                  return(
                    <div className="playResult__yourChoice" style={{backgroundColor:"blue"}}>
                      <div className="playResult__emptyImg"></div>
                      <p>40%</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>

          <div className="playResult__share">
            <p>Share with your friends</p>

            <div className="playResult__social">
              
              <FacebookShareButton url={`https://foro.com/${currentLink}`} openShareDialogOnClick={true} hashtag={"#FORO"} quote={""}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <WhatsappShareButton url={`https://foro.com/${currentLink}`} openShareDialogOnClick={true} title={``}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <RedditShareButton url={`https://foro.com/${currentLink}`} openShareDialogOnClick={true} title={``}>
                <RedditIcon size={40} round />
              </RedditShareButton>

              <TelegramShareButton url={`https://foro.com/${currentLink}`} openShareDialogOnClick={true} title={``}>
                <TelegramIcon size={40} round />
              </TelegramShareButton>

              <TwitterShareButton url={`https://foro.com/${currentLink}`} openShareDialogOnClick={true} hashtag={"#FORO"} title={``}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
            </div>
            
            
          </div>
        </div>
      :
        <div className="inPlay">
          <div className="inPlay__question">
            <p>{questionList[slideCount - 1]}</p>
          </div>

          <div className="inPlay__imageWrapper">
            <div onClick={() => selectChoice({1: imgOne})} className="inPlay__image" style={{backgroundImage: `url(${imgOne})`}}>
            </div>
            <div className="inPlay__vsWrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144">
                <g id="Union_1" data-name="Union 1" transform="translate(-406 -680)" fill="#3190ef">
                  <path d="M 477.9999084472656 822.9966430664062 L 461.1047058105469 793.5861206054688 L 460.9127502441406 793.2518920898438 L 460.5407104492188 793.3524780273438 L 427.7984924316406 802.2018432617188 L 436.6478576660156 769.4595947265625 L 436.7484436035156 769.0875854492188 L 436.4142456054688 768.8956298828125 L 407.003662109375 752.0004272460938 L 436.4142456054688 735.1051635742188 L 436.7484436035156 734.9132080078125 L 436.6478881835938 734.5411987304688 L 427.7984924316406 701.798095703125 L 460.540771484375 710.6474609375 L 460.9127807617188 710.748046875 L 461.1047668457031 710.4138793945312 L 477.9999084472656 681.004150390625 L 494.8950805664062 710.4138793945312 L 495.0870361328125 710.748046875 L 495.4590759277344 710.6474609375 L 528.2022094726562 701.798095703125 L 519.3527221679688 734.5416870117188 L 519.2521362304688 734.9136962890625 L 519.5863647460938 735.1056518554688 L 548.9961547851562 752.0004272460938 L 519.5863647460938 768.8952026367188 L 519.252197265625 769.087158203125 L 519.352783203125 769.4591674804688 L 528.2022094726562 802.2018432617188 L 495.4591064453125 793.3524780273438 L 495.0870971679688 793.2518920898438 L 494.8951110839844 793.5861206054688 L 477.9999084472656 822.9966430664062 Z" stroke="none"/>
                  <path d="M 477.9999084472656 821.992919921875 L 494.8454895019531 792.668701171875 L 527.492431640625 801.4921264648438 L 518.6690063476562 768.8455810546875 L 547.9923706054688 752.0004272460938 L 518.6689453125 735.1553344726562 L 527.4924926757812 702.5078735351562 L 494.845458984375 711.3312377929688 L 477.9999084472656 682.0079345703125 L 461.1543579101562 711.3312377929688 L 428.5082397460938 702.5078735351562 L 437.3316650390625 735.15478515625 L 408.0074462890625 752.0004272460938 L 437.3316650390625 768.8460083007812 L 428.5082702636719 801.4920654296875 L 461.1543273925781 792.668701171875 L 477.9999084472656 821.992919921875 M 477.9999084472656 824.0004272460938 L 460.6711730957031 793.8351440429688 L 427.0887145996094 802.91162109375 L 436.1651916503906 769.3291625976562 L 405.9999084472656 752.0004272460938 L 436.1651916503906 734.671630859375 L 427.0887145996094 701.0883178710938 L 460.6712036132812 710.164794921875 L 477.9999084472656 680.0004272460938 L 495.32861328125 710.164794921875 L 528.9119873046875 701.0883178710938 L 519.8353881835938 734.672119140625 L 549.9999389648438 752.0004272460938 L 519.83544921875 769.3287353515625 L 528.9119873046875 802.91162109375 L 495.3286743164062 793.8351440429688 L 477.9999084472656 824.0004272460938 Z" stroke="none" fill="#000"/>
                </g>
              </svg>
              <p>VS</p>
            </div>
            <div onClick={() => selectChoice({2: imgTwo})} className="inPlay__image" style={{backgroundImage: `url(${imgTwo})`}}>
            </div>
          </div>
        </div>
      }
      

    </div>
  )
}

export default InPlayCompare