//代换推理
import React, { Component } from "react";
import { editable } from "../../component/EditorNode";
import { qs_play_audio } from "../../lib/qsutils";
import Background from "../../component/Background";
import Particle from "../../component/Particle";
import Keyboard from "../../component/Keyboard";
import Panel from "./component/Panel";
import Draft from "./component/Draft";
import QuesState from "./component/QuesState";
import NodeQuestionRoot from "../../component/NodeQuestionRoot";
import EquationHelp from "./component/EquationHelp";
import NodeFade from "../../component/NodeFade";
import FrameImage from "../../component/FrameImage";

const MAIN_CONTROLS = [
  {
    name: "panelPos",
    type: "vec2",
    title: "已知条件中心坐标",
    defaultValue: { x: 0, y: 318 },
  },
  {
    name: "rightPartScale",
    title: "位置半径",
    type: "number",
    defaultValue: 8,
  },
  {
    name: "help_tipColor",
    title: "帮助框的颜色",
    type: "string",
    defaultValue: "#47fffd",
  },
  {
    name: "color1",
    type: "string",
    title: "颜色",
    defaultValue: "#78b1ff",
  },
  {
    name: "color2",
    type: "string",
    title: "颜色",
    defaultValue: "#ff6633",
  },
  {
    name: "color3",
    type: "string",
    title: "颜色",
    defaultValue: "#9357ff",
  },
];

class BlankTestEquivalentSubstitutionQuestion extends Component {
  $refPanel = React.createRef();
  $refAnswer = React.createRef();
  $draftNode = React.createRef();
  $panel = React.createRef();
  $equationHelp = React.createRef();
  state = { isHideButtons: false, isHintPlaying: false };
  _highLightBlinkCreated = false;
  _helpEquationCreated = false;
  hintTime1 = null;
  getPosList = (startXPos, xgap, num, startYPos, col, ycap) => {
    // console.log('getPosList', startXPos, xgap, num, startYPos, col, ycap);
    let posList = [];
    let curY = startYPos;
    for (let n = 0; n < col; n++) {
      for (let i = 0; i < num; i++) {
        let x = startXPos + i * xgap;
        posList.push({ x, y: curY });
      }
      curY += ycap;
    }

    return posList;
  };
  componentWillUnmount() {
    if (this.hintTime1) {
      clearInterval(this.hintTime1);
      this.hintTime1 = null;
    }
    if (this.endShowHint) {
      clearInterval(this.endShowHint);
      this.endShowHint = null;
    }
  }

  onTouchStartUseCapture = (e) => {
    if (this.isJudged) {
      return;
    }
    this.$draftNode.current.onTouchStartUseCapture(e);
  };
  onTouchEnd = (e) => {
    this.$draftNode.current.onTouchEnd(e);
  };
  onTouchMove = (e) => {
    this.$draftNode.current.onTouchMove(e);
  };
  onTouchCancel = (e) => {
    this.$draftNode.current.onTouchEnd(e);
  };
  onNumKey = (index) => {
    if (this.$refAnswer) {
      this.$refAnswer.current.onNumKey(index);
    }
  };
  handleClearInput = (index) => {
    if (this.$refAnswer) {
      this.$refAnswer.current.handleClearInput(index);
    }
  };
  hanldleSubmit = (index) => {
    if (this.$refAnswer) {
      this.$refAnswer.current.hanldleSubmit(index);
    }
  };
  startAnswerHint = () => {
    if (this.$refAnswer && this.$refAnswer.current) {
      this.$refAnswer.current.startShowHint();
    }
  };
  getAllValidList = (list, itemList) => {
    let newList = [];
    let newItemList = [];
    list.forEach((item, index) => {
      if (item && item.length) {
        newList.push(item);
        newItemList.push(itemList[index]);
      }
    });
    return { newList, newItemList };
  };
  endHint = () => {
    clearTimeout(this.hintTime1);
    this.hintTime1 = null;
  };
  showHint = () => {
    let {
      questionConfig: { questionIndex },
      setQuestionState,
      questionState: { showHint, canShowHint = false },
      tipVoices = [],
    } = this.props;
    if (this.isJudged) {
      return;
    }
    if (showHint || canShowHint) {
      return;
    }
    setQuestionState({ showHint: true, canShowHint: true });
    switch (questionIndex) {
      case 1:
      case 5:
      case 6:
        this.setState({ isHideButtons: true });
        this.hintTime1 = setTimeout(() => {
          if (this.$equationHelp) {
            this.$equationHelp.current.startShowHint();
          }
        }, 5000);
        break;
      case 2:
      case 3:
      case 4:
      case 7:
        // this.hintTime1 = setTimeout(() => {
        //     if (this.$panel) {
        //         this.$panel.current.startShowHint(1);
        //     }
        // }, 4000);
        if (this.$panel) {
          this.$panel.current.startShowHint(1);
        }
        break;
      case 8:
      case 9:
      case 10:
        // console.log('startShowHint');
        // this.hintTime1 = setTimeout(() => {
        //     if (this.$panel) {
        //         this.$panel.current.startShowHint(2);
        //     }
        // }, 3500);
        if (this.$panel) {
          this.$panel.current.startShowHint(2);
        }
        break;

      default:
        break;
    }
    if (tipVoices[0]) {
      this._hintVoiceID = qs_play_audio(this.props, tipVoices[0]);
    }
  };
  onHintPlayEnd = () => {
    this.setState({ isHintPlaying: false });
    if (this.state.isHideButtons) {
      this.setState({ isHideButtons: false });
    }
    this.endShowHint();
  };
  endShowHint = () => {
    let { setQuestionState } = this.props;
    this.time2 = setTimeout(() => {
      setQuestionState({
        canShowHint: false,
      });
    }, 1000);
  };
  render() {
    const {
      nodeProps,
      questionState,
      setQuestionState,
      rightParticle,
      Apic,
      Bpic,
      Cpic,
      questionConfig,
      panelPos,
      symbolEqualBlue,
      symbolEqualYellow,
      numberList,
      runtime,
      rightPartScale,
      tipSymbolPlus,
      tipSymbolWenhao,
      symbolEqualWhite,
      tipBoard,
      tipFrameWhite,
      color1,
      color2,
      color3,
      tipFrameGray,
      onOperate,
      tipBoardBg,
    } = this.props;
    const { answerList, questionIndex } = questionConfig;
    const colorList = [color1, color2, color3];
    const {
      answers = [],
      currSelectedIndex = 0,
      allRight,
      rightParticlePlayCount = 0,
      showHint = false,
    } = questionState;
    const showEquation = [1, 5, 6].includes(questionIndex);

    let pics = { Apic, Bpic, Cpic };
    let isShowSubmitBtn;
    console.log("answerList", answerList);
    isShowSubmitBtn = answers.length === answerList.length ? true : false;
    if (isShowSubmitBtn) {
      for (let i = 0; i < answers.length; i++) {
        if (!answers[i]) {
          isShowSubmitBtn = false;
          break;
        }
      }
    }
    const isShowClearBtn = answers.length > 0 && answers[currSelectedIndex];
    const textZoomScale = allRight ? 1 : 0.8;
    let { isHideButtons = false } = this.state;
    return (
      <NodeQuestionRoot
        name={"root"}
        // onTouchMove={this.onTouchMove}
        // onTouchEnd={this.onTouchEnd}
        // onTouchCancel={this.onTouchCancel}
        // onTouchStartUseCapture={this.onTouchStartUseCapture}
        touchDisabled={allRight}
      >
        {/* <Background
                    name={'bg'}
                    displayName={'背景'}
                    nodeProps={{
                        position: {
                            x: 0,
                            y: 0,
                        },
                        size: nodeProps.size,
                    }}
                /> */}
        <node
          x={0}
          y={220}
          name="labelTest"
          color="#78b1ff"
          height={200}
          width={2000}
          components={[
            {
              type: cc.Label,
              props: {
                string: "你我他",

                fontSize: 40,
                height: 200,
                lineHeight: 120,
                verticalAlign: "center",
              },
            },
          ]}
        />
        <node
          x={0}
          y={60}
          name="labelTest"
          color="#78b1ff"
          height={200}
          width={2000}
          components={[
            {
              type: cc.Label,
              props: {
                string: "ā,á,ǎ,à,ō,ó,ǒ,ò,ê,ē,é,ě,è,ī,í,ǐ,ì,ū,ú,ǔ,ù,ü,ǖ,ǘ,ǚ,ǜ",

                fontSize: 40,
                height: 120,
                lineHeight: 120,
              },
            },
          ]}
        />
        <node
          x={0}
          y={-20}
          name="labelTest"
          color="#78b1ff"
          height={200}
          width={2000}
          components={[
            {
              type: cc.Label,
              props: {
                useSystemFont: true,
                string:
                  "Ā,Á,Ǎ,À,Ō,Ó,Ǒ,Ò,Ê,Ê̄,Ế,Ê̌,Ề,Ē,É,Ě,È,Ī,Í,Ǐ,Ì,Ū,Ú,Ǔ,Ù,Ü,Ǖ,Ǘ,Ǚ,Ǜ,M̄,Ḿ,M̀,Ń,Ň,Ǹ,Ẑ,Ĉ,Ŝ,Ŋ",

                fontSize: 40,
                height: 200,
                lineHeight: 140,
                verticalAlign: "center",
              },
            },
          ]}
        />
        <node
          x={0}
          y={-220}
          name="labelTest"
          color="#78b1ff"
          height={120}
          width={2000}
          components={[
            {
              type: cc.Label,
              props: {
                string:
                  "丨 亅 丿 乛 一 乙 丶乚十厂匚刂卜冂亻八 人入勹 儿 匕 几亠冫丷冖讠凵卩阝刀 力 又 厶 廴",

                fontSize: 40,
                height: 120,
                lineHeight: 120,
              },
            },
          ]}
        />
        <node
          x={0}
          y={-320}
          name="labelTest"
          color="#78b1ff"
          height={400}
          width={2000}
          components={[
            {
              type: cc.Label,
              props: {
                string: "☚ ☛ ♩ ♕  ☄ :) ✧(≖ ◡ ≖✿)^ _ ^(o^^o)🙃😘😛",

                fontSize: 40,
                height: 200,
                lineHeight: 160,
                verticalAlign: "center",
              },
            },
          ]}
        />
        {/* <Keyboard
                    displayName={'键盘'}
                    name={'keyboard'}
                    onInputNumber={this.onNumKey}
                    handleClearInput={this.handleClearInput}
                    hanldleSubmit={this.hanldleSubmit}
                    disabledSubmitBtn={!isShowSubmitBtn}
                    disabledClearBtn={!isShowClearBtn}
                    isTwoControl={true}
                    textZoomScale={textZoomScale}
                />
                <QuesState
                    ref={this.$refAnswer}
                    name={'answer'}
                    displayName={'作答区'}
                    questionState={questionState}
                    setQuestionState={setQuestionState}
                    pics={pics}
                    questionConfig={questionConfig}
                    symbolEqualYellow={symbolEqualYellow}
                    numberList={numberList}
                    getPosList={this.getPosList}
                    runtime={runtime}
                    getAllValidList={this.getAllValidList}
                    tipFrameWhite={tipFrameWhite}
                    colorList={colorList}
                    endHint={this.endHint}
                    onOperate={onOperate}
                    endShowHint={this.endShowHint}
                    nodeProps={{
                        position: {
                            x: 0,
                            y: -368,
                        },
                    }}
                />
                <Draft
                    ref={this.$draftNode}
                    name={'draft'}
                    displayName={'演草区'}
                    questionState={questionState}
                    setQuestionState={setQuestionState}
                    pics={pics}
                    questionConfig={questionConfig}
                    symbolEqualBlue={symbolEqualBlue}
                    numberList={numberList}
                    getPosList={this.getPosList}
                    parent={this}
                    isHideButtons={isHideButtons}
                    // nodeProps={{
                    //     position: panelPos,
                    // }}
                />

                <NodeFade active={isHideButtons && showHint} duration={0.5}>
                    <FrameImage
                        texture={tipBoardBg}
                        name={'cover'}
                        active={isHideButtons && showHint}
                        x={-100}
                        y={-50}
                    />
                    <FrameImage
                        texture={tipBoard}
                        active={isHideButtons && showHint}
                        name={'tipBoard'}
                        x={0}
                        y={318}
                    />
                </NodeFade>
                <Panel
                    ref={this.$panel}
                    name={'panel'}
                    displayName={'题干展示区'}
                    questionState={questionState}
                    setQuestionState={setQuestionState}
                    pics={pics}
                    questionConfig={questionConfig}
                    symbolEqualBlue={symbolEqualBlue}
                    getAllValidList={this.getAllValidList}
                    tipFrameWhite={tipFrameWhite}
                    colorList={colorList}
                    startAnswerHint={this.startAnswerHint}
                    tipFrameGray={tipFrameGray}
                    getPosList={this.getPosList}
                    nodeProps={{
                        position: panelPos,
                    }}
                />

                {showEquation ? (
                    <EquationHelp
                        name={'EquationHelp'}
                        displayName={'公式提示区'}
                        ref={this.$equationHelp}
                        questionState={questionState}
                        setQuestionState={setQuestionState}
                        pics={pics}
                        questionConfig={questionConfig}
                        symbolEqualWhite={symbolEqualWhite}
                        tipSymbolPlus={tipSymbolPlus}
                        tipSymbolWenhao={tipSymbolWenhao}
                        numberList={numberList}
                        getPosList={this.getPosList}
                        onHintPlayEnd={this.onHintPlayEnd}
                        nodeProps={{
                            position: {
                                x: -104,
                                y: -50,
                            },
                        }}
                    />
                ) : null}

                <Particle
                    name={'rightParticle'}
                    scaleX={rightPartScale}
                    scaleY={rightPartScale}
                    x={0}
                    y={138}
                    file={rightParticle}
                    playcount={rightParticlePlayCount || 0}
                /> */}
      </NodeQuestionRoot>
    );
  }
}
export default editable(MAIN_CONTROLS)(BlankTestEquivalentSubstitutionQuestion);
