import React from 'react'
import 'url-search-params-polyfill';
import { Page, BackButton,  } from '@components'
import './style.less'



class CanvasTest extends React.Component {
  result = React.createRef()
  // btns = React.createRef()
  state = {
    showAfreshTestDialog: false, // 重新测评弹框状态
    showRedoQuizzePaperDialog: false, // 全部重做弹框状态
    loading: true,
    exerciseTipAudioFinished: false,
    newVersionDialogVisible: false
  }
  canvasRef = React.createRef()

  componentDidMount() {
    this.draw()
   
  }
  draw=()=>{
    let canvas = this.canvasRef.current;
    if (canvas.getContext){
      let ctx = canvas.getContext('2d');
      ctx.font = "20px serif";
      ctx.fillText("你我他", 100, 350);
      // 特殊字符
    
      // 音调
      ctx.fillText('ā,á,ǎ,à,ō,ó,ǒ,ò,ê,ē,é,ě,è,ī,í,ǐ,ì,ū,ú,ǔ,ù,ü,ǖ,ǘ,ǚ,ǜ,ń,ň,',100,400)
      ctx.fillText('Ā,Á,Ǎ,À,Ō,Ó,Ǒ,Ò,Ê,Ê̄,Ế,Ê̌,Ề,Ē,É,Ě,È,Ī,Í,Ǐ,Ì,Ū,Ú,Ǔ,Ù,Ü,Ǖ,Ǘ,Ǚ,Ǜ,M̄,Ḿ,M̀,Ń,Ň,Ǹ,Ẑ,Ĉ,Ŝ,Ŋ',100,450)
      
      // 偏旁部首
      ctx.fillText("丨 亅 丿 乛 一 乙 丶乚十厂匚刂卜冂亻八 人入勹 儿 匕 几亠冫丷冖讠凵卩阝刀 力 又 厶 廴", 100, 500);
      ctx.fillText("☚ ☛ ♩ ♕  ☄ :) ✧(≖ ◡ ≖✿)^ _ ^(o^^o)🙃😘😛", 100, 550);
    }
  }

  render() {

  


    return (
      <Page className="results">
        {/* 返回按钮 */}
        <div className="results-content">
          <BackButton />
          <canvas id="stockGraph" ref={this.canvasRef} width="1000" height="1000">
           current stock price: $3.15 +0.15
          </canvas>
        </div>
      </Page>
    )
  }
}

export default CanvasTest
