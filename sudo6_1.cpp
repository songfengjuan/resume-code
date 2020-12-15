int k, flag;
bool tmp;              //暂存数独是否符合条件
int s_count;                       //产生题目数量
int dig_index;                     //确定挖洞数量
int dmin_count;                    //确定难度等级下限
int dmax_count;      //确定难度等级上限
int dt_count;
clock_t start;
clock_t finish;
int sudo_creating[9][9];
int sudo_result[9][9];                //结果数独
double r_count[2];                       //隐性推导
int t_count;                          //显性推导
double score;