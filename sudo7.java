
    private void initData(char[] charArray) {
//新建各个节点对应步骤二
        soduNodes = new SoduNode[9][9];
        for (int i = 0; i < 9; i++) {
            for (int k = 0; k < 9; k++) {
                SoduNode soduNode = new SoduNode();
                soduNode.value=charArray[i*9+k]-'0';
                soduNode.xPosition=k;
                soduNode.yPosition=i;
                soduNodes[i][k]=soduNode;
            }
        }
//每个节点保存保存所在列的节点集合，所在行的节点集合，所在组的结合。对应步骤三
        for(int i=0 ;i<9;i++){
            SoduNode [] listNode=new SoduNode[9];
            for(int k=0;k<9;k++){
                listNode[k]=soduNodes[i][k];
                soduNodes[i][k].listNode=listNode;
            }
            System.out.println("listNode:"+SoduNode.getNodesValue(listNode));
        }
        for(int i=0 ;i<9;i++){
            SoduNode [] rowNode=new SoduNode[9];
            for(int k=0;k<9;k++){
                rowNode[k]=soduNodes[k][i];
                soduNodes[k][i].rowNode=rowNode;
            }
            System.out.println("rowNode:"+SoduNode.getNodesValue(rowNode));
        }
        for(int i=0;i<=2;i++){
            for(int k=0;k<=2;k++){
                SoduNode [] groupNode=new SoduNode[9];
                int index=0;
                int middlex=3*i+1;
                int middley=3*k+1;
                for(int j=-1;j<=1;j++){
                    for(int l=-1;l<=1;l++){
                        groupNode[index]=soduNodes[middlex+j][middley+l];
                        soduNodes[middlex+j][middley+l].groupNode=groupNode;
                        index++;
                    }
                }
                System.out.println("groupNode:"+SoduNode.getNodesValue(groupNode));
            }
        }
    
    }
    //对应步骤一
private boolean getNextNodeAndCheck() {
    SoduNode lastNullNode = getNextNullNode(); //步骤二
        if(lastNullNode==null){
            return true;
        }     //对应步骤七
        Integer[] suitValue = lastNullNode.getSuitValue();
        if(suitValue==null||suitValue.length==0){
            System.out.println("no have suitable value");
            return false;
        }//对应步骤六
        for(int i=0;i<suitValue.length;i++){
            lastNullNode.value=suitValue[I];//步骤三
                       //对应步骤一
            if(getNextNodeAndCheck()){
                return true;
            }
            
        }
        return false;//所有可能解都已经论证完，无需论证解，对应步骤四
}
Integer[] getSuitValue() {
        TreeSet<Integer> notSuits = new TreeSet<>();
        TreeSet<Integer> allValue=  new TreeSet();
        for (int i = 0; i <= 8; i++) {
            if (listNode[i].value != 0) {
                notSuits.add(listNode[i].value);
            }
            if (rowNode[i].value != 0) {
                notSuits.add(rowNode[i].value);
            }
            if (groupNode[i].value != 0) {
                notSuits.add(groupNode[i].value);
            }
            
            allValue.add(allChar[i]);
        }
        int notSuitSize = notSuits.size();
        if (notSuitSize == 9) {
            return null;
        }
        allValue.removeAll(notSuits);
        System.out.println("allValue :" + getTreeValue(allValue));
        Integer[]suitValue=new Integer[allValue.size()];
        Iterator<Integer> iterator = allValue.iterator();
        int suitValueIndex=0;
        while(iterator.hasNext()){
            suitValue[suitValueIndex]=iterator.next();
            suitValueIndex++;
        }
        System.out.println("suitValue size:"+suitValue.length+" value:"+getSuitsValue(suitValue));
        return suitValue;
    }